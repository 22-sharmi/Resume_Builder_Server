const express = require('express');
const passport = require('passport');
const cors = require('cors'); // Import cors package

const router = express.Router();

// Enable CORS for this router
router.use(cors());

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
router.get('/google/callback', 
  (req, res, next) => {
    console.log('Google callback reached');
    next();
  },
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('Google authentication successful');
    res.redirect('/');
  }
);
// GitHub Auth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
router.get('/github/callback', 
  (req, res, next) => {
    console.log('Github callback reached');
    next();
  },
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('Github authentication successful');
    res.redirect('/');
  }
);

// Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// User info
// router.get('/user', (req, res) => {
//   res.json(req.user);
// });
router.get('/user', (req, res) => {
  console.log('User info requested', req.user);
  res.json(req.user || { message: 'Not authenticated' });
});

module.exports = router;
