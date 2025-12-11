const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.put('/change-password', authController.changePassword);
router.post('/seed', authController.seedAdmin); // Keep enabled for now to easily set up

module.exports = router;
