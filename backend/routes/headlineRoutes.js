const express = require('express');
const router = express.Router();
const headlineController = require('../controllers/headlineController');

// Generate headlines
router.post('/generate', headlineController.generateHeadlines);

// Get headline styles
router.get('/styles', headlineController.getStyles);

module.exports = router;
