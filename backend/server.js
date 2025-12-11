const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(bodyParser.json());

// Database Connection
const connectDB = require('./config/db');
connectDB();

// Routes
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/seo', require('./routes/seoRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
// Testimonials route (inline for now or create file)
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await require('./models/Testimonial').find().sort('-createdAt');
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.use('/api/portfolio', require('./routes/portfolioRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("MongoDB connected");
});
