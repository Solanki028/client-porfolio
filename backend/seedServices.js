const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ServiceCategory = require('./models/ServiceCategory');
const connectDB = require('./config/db');

dotenv.config();

const services = [
    {
        title: 'Book Covers',
        slug: 'book-covers',
        description: 'Captivating book cover designs that tell a story.',
        heroImage: 'https://via.placeholder.com/800x600?text=Book+Covers'
    },
    {
        title: 'Posters',
        slug: 'posters',
        description: 'Eye-catching posters for events, movies, and promotions.',
        heroImage: 'https://via.placeholder.com/800x600?text=Posters'
    },
    {
        title: 'Events',
        slug: 'events',
        description: 'Complete branding and visual identity for your events.',
        heroImage: 'https://via.placeholder.com/800x600?text=Events'
    },
    {
        title: 'Social Media Posts',
        slug: 'social-media-posts',
        description: 'Engaging graphics to boost your social media presence.',
        heroImage: 'https://via.placeholder.com/800x600?text=Social+Media'
    },
    {
        title: 'Packaging',
        slug: 'packaging',
        description: 'Creative packaging solutions that stand out on the shelf.',
        heroImage: 'https://via.placeholder.com/800x600?text=Packaging'
    },
    {
        title: 'Logos',
        slug: 'logos',
        description: 'Memorable logos that define your brand identity.',
        heroImage: 'https://via.placeholder.com/800x600?text=Logos'
    }
];

const seedServices = async () => {
    try {
        await connectDB();

        for (const service of services) {
            await ServiceCategory.findOneAndUpdate(
                { slug: service.slug },
                service,
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${service.title}`);
        }

        console.log('Services seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
};

seedServices();
