const mongoose = require('mongoose');

const PortfolioExpertiseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    linkUrl: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('PortfolioExpertise', PortfolioExpertiseSchema);
