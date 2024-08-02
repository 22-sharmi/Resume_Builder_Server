const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

router.get('/', async (req, res) => {
  try {
    let resume = await Resume.findOne();
    if (!resume) {
      resume = await Resume.create({
        personalInfo: {
          title: "Your Name",
          subtitle: "Your Job Title",
          // description: "A brief description about yourself.",
        },
        Education: [],
        Contact: [],
        Skills: [],
        Experience: [],
        Projects: [],
        styles: {},
      });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (resume) {
      Object.assign(resume, req.body);
      await resume.save();
    } else {
      await Resume.create(req.body);
    }
    res.json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;