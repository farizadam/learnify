const express = require('express');
const app = express();
const PORT = 3000;
const quizRoutes = require('./routes/quiz.routes');

app.use(express.json());
app.use('/api/quizzes', quizRoutes);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Learnify Server' });
});

app.get('/api/courses', (req, res) => {
  res.json([
    { id: 1, title: 'JavaScript Basics', instructor: 'John Doe' },
    { id: 2, title: 'React Fundamentals', instructor: 'Jane Smith' },
    { id: 3, title: 'Node.js Advanced', instructor: 'Mike Johnson' }
  ]);
});

app.post('/api/courses', (req, res) => {
  const { title, instructor } = req.body;
  res.status(201).json({ id: 4, title, instructor });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
