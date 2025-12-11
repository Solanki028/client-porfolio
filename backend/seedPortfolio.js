const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PortfolioProfile = require('./models/PortfolioProfile');
const PortfolioExpertise = require('./models/PortfolioExpertise');
const connectDB = require('./config/db');

dotenv.config();

const profileData = {
    name: "Designer Name", // Admin to update
    role: "Senior Graphic Designer",
    summaryHero: "I am a professional Graphic Designer with 15 years of industry experience. Over the years, I have worked with clients across almost every major sector — corporate brands, startups, publishers, FMCG, fashion, healthcare, political campaigns, education, e-commerce, and digital marketing agencies.",
    experienceText: "I am a professional Graphic Designer with 15 years of industry experience. Over the years, I have worked with clients across almost every major sector — corporate brands, startups, publishers, FMCG, fashion, healthcare, political campaigns, education, e-commerce, and digital marketing agencies.",
    philosophyText: "My design approach balances creativity with clarity and brand strategy. My goal is always to ensure that every client’s brand looks visually impressive and gains higher perceived value in the market.\n\nTo date, I have successfully completed hundreds of projects and consistently delivered beyond client expectations — this reliability has become my signature."
};

const expertiseData = [
    {
        title: "Logo & Brand Identity Design",
        description: "Creating unique visual identities that resonate with target audiences.",
        imageUrl: "", // Admin can update
        linkUrl: "#"
    },
    {
        title: "Book & Magazine Covers",
        description: "Eye-catching designs for print and digital publications.",
        imageUrl: "",
        linkUrl: "#"
    },
    {
        title: "Packaging & Label Design",
        description: "Functional and attractive packaging solutions for products.",
        imageUrl: "",
        linkUrl: "#"
    },
    {
        title: "Social Media Creative Campaigns",
        description: "Engaging visuals for Instagram, Facebook, and LinkedIn marketing.",
        imageUrl: "",
        linkUrl: "#"
    },
    {
        title: "Posters, Banners, Advertisements",
        description: "High-impact promotional materials for events and sales.",
        imageUrl: "",
        linkUrl: "#"
    },
    {
        title: "Photo Manipulation & Concept Art",
        description: "Advanced editing and creative composition for visual storytelling.",
        imageUrl: "",
        linkUrl: "#"
    },
    {
        title: "Print + Digital Branding Solutions",
        description: "Comprehensive branding strategies across all mediums.",
        imageUrl: "",
        linkUrl: "#"
    }
];

const seedPortfolio = async () => {
    try {
        await connectDB();

        // Seed Profile
        await PortfolioProfile.deleteMany({});
        await PortfolioProfile.create(profileData);
        console.log('Portfolio Profile seeded');

        // Seed Expertise
        await PortfolioExpertise.deleteMany({});
        await PortfolioExpertise.insertMany(expertiseData);
        console.log('Portfolio Expertise seeded');

        process.exit();
    } catch (error) {
        console.error('Error seeding portfolio:', error);
        process.exit(1);
    }
};

seedPortfolio();
