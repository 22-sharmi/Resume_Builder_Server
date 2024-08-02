const express = require('express');
const passport = require('passport');
const router = express.Router();
const { updateUser } = require('../controllers/authController.js');

const FRONTEND_URL = process.env.FRONTEND_URL;

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    res.redirect(FRONTEND_URL);
  }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    res.redirect(FRONTEND_URL);
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { 
      console.error('Logout error:', err);
      return next(err); 
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Add the PUT endpoint for updating user profile
router.put('/user/:id', updateUser);

module.exports = router;
