// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true
  },
  displayName: String,
  username: String,
  email: String,
  avatar: String,
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Template' }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Template' }]
});

module.exports = mongoose.model('User', UserSchema , 'authData');
