// controllers/authController.js

const User = require('../models/User'); // Ensure this path is correct based on your project structure

// Update user profile
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  updateUser,
};
