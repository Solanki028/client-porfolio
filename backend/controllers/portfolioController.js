const PortfolioProfile = require('../models/PortfolioProfile');
const PortfolioExpertise = require('../models/PortfolioExpertise');

// @desc    Get Portfolio Profile
// @route   GET /api/portfolio/profile
// @access  Public
exports.getProfile = async (req, res) => {
    try {
        let profile = await PortfolioProfile.findOne();
        if (!profile) {
            // Return defaults if not found, or empty object
            return res.json({});
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Portfolio Profile
// @route   PUT /api/portfolio/profile
// @access  Private (Admin)
exports.updateProfile = async (req, res) => {
    try {
        const profile = await PortfolioProfile.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true }
        );
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get All Expertise Items
// @route   GET /api/portfolio/expertise
// @access  Public
exports.getExpertise = async (req, res) => {
    try {
        const items = await PortfolioExpertise.find().sort('createdAt');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create Expertise Item
// @route   POST /api/portfolio/expertise
// @access  Private (Admin)
exports.createExpertise = async (req, res) => {
    try {
        const newItem = new PortfolioExpertise(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Expertise Item
// @route   PUT /api/portfolio/expertise/:id
// @access  Private (Admin)
exports.updateExpertise = async (req, res) => {
    try {
        const updatedItem = await PortfolioExpertise.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete Expertise Item
// @route   DELETE /api/portfolio/expertise/:id
// @access  Private (Admin)
exports.deleteExpertise = async (req, res) => {
    try {
        const deletedItem = await PortfolioExpertise.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
