const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  tags: { type: [String], required: true },
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
