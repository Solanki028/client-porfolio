const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Testimonial = require('./models/Testimonial');
const connectDB = require('./config/db');

dotenv.config();

const testimonials = [
    {
        name: "Aarav Patel",
        role: "CEO, TechFlow India",
        quote: "The team delivered an exceptional website that perfectly captures our brand identity. Their attention to detail is unmatched.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Diya Sharma",
        role: "Marketing Director, Aura Trends",
        quote: "Working with them was a seamless experience. They understood our vision and translated it into a stunning digital reality.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Rohan Gupta",
        role: "Founder, GreenLeaf Startups",
        quote: "Professional, creative, and timely. I highly recommend their services for anyone looking to elevate their online presence.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/men/86.jpg"
    },
    {
        name: "Ananya Iyer",
        role: "Creative Lead, PixelArts",
        quote: "The design is bold, modern, and user-friendly. Our engagement metrics have skyrocketed since the launch.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        name: "Vikram Singh",
        role: "COO, Estate Ventures",
        quote: "They went above and beyond to ensure every feature worked perfectly. A truly dedicated team of professionals.",
        rating: 4,
        avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
        name: "Meera Reddy",
        role: "Product Manager, InnovateX",
        quote: "Visually stunning and highly functional. The cms they built makes managing our content a breeze.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/29.jpg"
    }
];

const seedTestimonials = async () => {
    try {
        await connectDB();

        await Testimonial.deleteMany({});
        console.log('Testimonials cleared');

        await Testimonial.insertMany(testimonials);
        console.log('Testimonials seeded successfully');

        process.exit();
    } catch (error) {
        console.error('Error seeding testimonials:', error);
        process.exit(1);
    }
};

seedTestimonials();
