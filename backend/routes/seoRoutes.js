const express = require('express');
const router = express.Router();
const { getSeo, updateSeo } = require('../controllers/seoController');

router.get('/:page', getSeo);
router.put('/:page', updateSeo);

module.exports = router;
