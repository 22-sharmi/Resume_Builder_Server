const User = require('../models/userModel');

const addToCollection = async (req, res) => {
  const { userId, templateId } = req.body;
  
  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { collections: templateId }
    });
    res.status(200).json({ message: "Added to collection" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const removeFromCollection = async (req, res) => {
  const { userId, templateId } = req.body;
  
  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { collections: templateId }
    });
    res.status(200).json({ message: "Removed from collection" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  addToCollection,
  removeFromCollection
};
