require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const multer = require('multer');
const connectDB = require('./config/db');
require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const templateRoutes = require('./routes/templateRoutes');
const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const Image = require('./models/Image');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...')
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (req.file) {
    const image = new Image({
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    try {
      await image.save();
      res.status(200).json({ url: `/api/images/${image._id}` });
    } catch (error) {
      res.status(500).json({ error: 'File upload failed' });
    }
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// Serve uploaded images
app.get('/api/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found');
    }
    res.set('Content-Type', image.contentType);
    res.send(image.data);
  } catch (error) {
    res.status(500).send('Error retrieving image');
  }
});

// Use routes
app.use('/auth', authRoutes);
app.use('/api', templateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resume', resumeRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});