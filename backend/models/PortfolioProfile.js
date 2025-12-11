const mongoose = require('mongoose');

const PortfolioProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Designer Name'
    },
    role: {
        type: String,
        required: true,
        default: 'Senior Graphic Designer'
    },
    summaryHero: {
        type: String,
        required: true
    },
    experienceText: {
        type: String, // Rich text or long text
        required: true
    },
    philosophyText: {
        type: String, // Rich text or long text
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('PortfolioProfile', PortfolioProfileSchema);
