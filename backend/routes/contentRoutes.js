const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');

router.get('/:type', getContent);
router.put('/:type', updateContent);

module.exports = router;
