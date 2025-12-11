const mongoose = require('mongoose');

const SeoSchema = new mongoose.Schema({
    pageIdentifier: {
        type: String,
        required: true,
        unique: true // e.g., 'home', 'about', 'services/book-covers'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Seo', SeoSchema);
