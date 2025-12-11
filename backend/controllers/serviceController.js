const ServiceCategory = require('../models/ServiceCategory');
const ServiceItem = require('../models/ServiceItem');

// @desc    Get all service categories
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
    try {
        const services = await ServiceCategory.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single service category by slug with items
// @route   GET /api/services/:slug
// @access  Public
exports.getServiceBySlug = async (req, res) => {
    try {
        const service = await ServiceCategory.findOne({ slug: req.params.slug });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const items = await ServiceItem.find({ categorySlug: req.params.slug });
        res.json({ service, items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create or Update Service Category
// @route   PUT /api/services/:slug
// @access  Private
exports.updateServiceCategory = async (req, res) => {
    try {
        const { title, description, heroImage } = req.body;
        const service = await ServiceCategory.findOneAndUpdate(
            { slug: req.params.slug },
            { title, description, heroImage },
            { new: true, upsert: true }
        );
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add Service Item
// @route   POST /api/services/:slug/items
// @access  Private
exports.addServiceItem = async (req, res) => {
    try {
        const { title, description, imageUrl, year, tools } = req.body;
        const newItem = new ServiceItem({
            categorySlug: req.params.slug,
            title,
            description,
            imageUrl,
            year,
            tools
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Service Item
// @route   PUT /api/services/items/:id
// @access  Private
exports.updateServiceItem = async (req, res) => {
    try {
        const updatedItem = await ServiceItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create Service Category
// @route   POST /api/services
// @access  Private
exports.createServiceCategory = async (req, res) => {
    try {
        const { title, description, heroImage } = req.body;
        // Simple slug generation
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const newService = new ServiceCategory({
            slug,
            title,
            description,
            heroImage
        });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete Service Category
// @route   DELETE /api/services/:slug
// @access  Private
exports.deleteServiceCategory = async (req, res) => {
    try {
        const service = await ServiceCategory.findOneAndDelete({ slug: req.params.slug });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        // Also delete all items associated with this service
        await ServiceItem.deleteMany({ categorySlug: req.params.slug });
        res.json({ message: 'Service and associated items removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete Service Item
// @route   DELETE /api/services/items/:id
// @access  Private
exports.deleteServiceItem = async (req, res) => {
    try {
        await ServiceItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
