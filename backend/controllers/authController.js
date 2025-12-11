const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Change Password
// @route   PUT /api/auth/change-password
// @access  Private (Protect middleware needed ideally, but strictly checking current password here)
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, email } = req.body; // Passing email from frontend for simplicity or fetch via ID if protected

    try {
        // Find admin (assuming single admin or passed email)
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (await admin.matchPassword(oldPassword)) {
            admin.password = newPassword;
            await admin.save();
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(401).json({ message: 'Invalid old password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Seed Initial Admin (Internal Use)
exports.seedAdmin = async (req, res) => {
    try {
        const adminExists = await Admin.findOne({ email: 'admin@example.com' });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const admin = await Admin.create({
            email: 'admin@example.com',
            password: 'admin123'
        });

        res.status(201).json({
            _id: admin._id,
            email: admin.email,
            token: generateToken(admin._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
