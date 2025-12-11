const About = require('../models/About');

// @desc    Get content by type
// @route   GET /api/content/:type
// @access  Public
exports.getContent = async (req, res) => {
    try {
        const content = await About.findOne({ type: req.params.type });
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update content by type
// @route   PUT /api/content/:type
// @access  Private (Admin)
exports.updateContent = async (req, res) => {
    try {
        const { content } = req.body;
        const updatedContent = await About.findOneAndUpdate(
            { type: req.params.type },
            { content },
            { new: true, upsert: true }
        );
        res.json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
