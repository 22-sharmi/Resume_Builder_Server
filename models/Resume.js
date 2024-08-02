const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    title: String,
    subtitle: String,
    description: String,
    photo: String,
  },
  Education: [{
    date: String,
    degree: String,
    university: String,
  }],
  Contact: [{
    label: String,
    value: String,
  }],
  Skills: [{
    category: String,
    skills: Array,
  }],
  Experience: [{
    date: String,
    company: String,
    position: String,
    description: String,
  }],
  Projects: [{
    name: String,
    description: String,
    link: String,
  }],
  styles: {
    type: Map,
    of: Object,
  },
});

module.exports = mongoose.model('Resume', ResumeSchema);