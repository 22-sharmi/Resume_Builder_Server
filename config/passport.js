const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;  // Add this line
const User = require('../models/User');

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5555/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }
  const newUser = new User({
    googleId: profile.id,
    displayName: profile.displayName,
    email: profile.emails[0].value,
    avatar: profile.photos[0].value
  });
  await newUser.save();
  done(null, newUser);
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:5555/auth/github/callback'  // Ensure this matches the registered URI
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ githubId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }
  const newUser = new User({
    githubId: profile.id,
    displayName: profile.displayName,
    username: profile.username,
    avatar: profile.photos[0].value
  });
  await newUser.save();
  done(null, newUser);
}));
