const mongoose = require('mongoose');

const ServiceItemSchema = new mongoose.Schema({
    categorySlug: {
        type: String,
        required: true,
        ref: 'ServiceCategory'
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: false
    },
    tools: {
        type: [String],
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('ServiceItem', ServiceItemSchema);
