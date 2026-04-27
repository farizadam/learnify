const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = 3000;
const mongoose = require('mongoose');
// Load environment variables
dotenv.config();
// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();
//routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');


// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);



app.get('/', (req, res) => {
  res.send('Welcome to Learnify API');
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
