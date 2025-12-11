const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        default: 'Client'
    },
    quote: {
        type: String,
        required: true
    },
    avatar: {
        type: String, // URL to image
        default: ''
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
