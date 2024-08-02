// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add to collections
router.post('/:userId/collections', async (req, res) => {
  try {
    const { userId } = req.params;
    const { templateId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.collections.includes(templateId)) {
      user.collections.push(templateId);
      await user.save();
    }
    res.status(200).json({ message: 'Added to collections successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to collections', error: error.message });
  }
});

// Remove from collections
router.delete('/:userId/collections/:templateId', async (req, res) => {
  try {
    const { userId, templateId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.collections = user.collections.filter(id => id.toString() !== templateId);
    await user.save();
    res.status(200).json({ message: 'Removed from collections successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from collections', error: error.message });
  }
});

// Add to favorites
router.post('/:userId/favorites', async (req, res) => {
  try {
    const { userId } = req.params;
    const { templateId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.favorites.includes(templateId)) {
      user.favorites.push(templateId);
      await user.save();
    }
    res.status(200).json({ message: 'Added to favorites successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
});

// Remove from favorites
router.delete('/:userId/favorites/:templateId', async (req, res) => {
  try {
    const { userId, templateId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.favorites = user.favorites.filter(id => id.toString() !== templateId);
    await user.save();
    res.status(200).json({ message: 'Removed from favorites successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error: error.message });
  }
});

module.exports = router;