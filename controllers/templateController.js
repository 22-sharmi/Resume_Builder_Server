const fs = require('fs');
const path = require('path');
const Template = require('../models/Template');

// Get all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new template
exports.createTemplate = async (req, res) => {
  const { title, imageURL, tags, name } = req.body;
  try {
    const newTemplate = new Template({ title, imageURL, tags, name });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a template and its associated image
exports.deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findById(id);
    if (!template) return res.status(404).json({ error: 'Template not found' });

    // Delete the image file
    const imagePath = path.join(__dirname, '..', template.imageURL);
    fs.unlink(imagePath, (err) => {
      if (err) console.error(err);
    });

    await Template.findByIdAndDelete(id);
    res.status(200).json({ message: 'Template removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an image
// exports.deleteImage = async (req, res) => {
//   const { url } = req.body;
//   try {
//     await Template.findOneAndDelete({ imageURL: url });
//     res.status(200).json({ message: 'Image deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.deleteImage = async (req, res) => {
  const { url } = req.body;
  try {
    const imageId = url.split('/').pop(); // Extract image ID from URL
    const image = await Image.findByIdAndDelete(imageId);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get Template
exports.getTemplateDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.status(200).json(template);
  } catch (error) {
    console.error('Error in getTemplateDetails:', error);
    res.status(500).json({ error: error.message });
  }
};
