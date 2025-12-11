const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    getExpertise,
    createExpertise,
    updateExpertise,
    deleteExpertise
} = require('../controllers/portfolioController');

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

router.get('/expertise', getExpertise);
router.post('/expertise', createExpertise);
router.put('/expertise/:id', updateExpertise);
router.delete('/expertise/:id', deleteExpertise);

module.exports = router;
