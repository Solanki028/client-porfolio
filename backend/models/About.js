const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['about_us', 'about_experience', 'home_hero', 'footer_settings'],
        unique: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema);
