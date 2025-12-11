const Seo = require('../models/Seo');

// @desc    Get SEO metadata by page identifier
// @route   GET /api/seo/:page
// @access  Public
exports.getSeo = async (req, res) => {
    try {
        // Use regex to find case-insensitive match or exact match
        // The page param might be URL encoded, so decode it
        const pageIdentifier = decodeURIComponent(req.params.page);

        const seo = await Seo.findOne({ pageIdentifier });
        if (!seo) {
            // Return default or 404? 
            // Better to return 404 so frontend can handle fallback or just empty
            return res.status(404).json({ message: 'SEO data not found' });
        }
        res.json(seo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update SEO metadata
// @route   PUT /api/seo/:page
// @access  Private
exports.updateSeo = async (req, res) => {
    try {
        const pageIdentifier = decodeURIComponent(req.params.page);
        const { title, description, keywords } = req.body;

        const updatedSeo = await Seo.findOneAndUpdate(
            { pageIdentifier },
            { title, description, keywords },
            { new: true, upsert: true }
        );
        res.json(updatedSeo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
