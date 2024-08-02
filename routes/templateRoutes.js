const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate, deleteTemplate, deleteImage, getTemplateDetails } = require('../controllers/templateController');

router.get('/templates/:id', getTemplateDetails);
router.get('/templates', getTemplates);
router.post('/templates', createTemplate);
router.delete('/templates/:id', deleteTemplate);

// Add the route for deleting images
router.delete('/delete-image', deleteImage);

module.exports = router;