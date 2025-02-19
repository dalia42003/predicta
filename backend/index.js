const express = require('express');
const mongoose = require('mongoose');
const Users = require('./models/Users');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://mhamedeed63:12345@cluster0.scpy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected Successfully'))
  .catch(err => console.log('Not Connected:', err));

// Example endpoint to test the server
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Sign-up endpoint
app.post('/sign-up', async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: 'Name and password are required' });
    }

    const newUser = new Users({ name, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
