const mongoose = require('mongoose');

const ServiceCategorySchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    heroImage: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);
