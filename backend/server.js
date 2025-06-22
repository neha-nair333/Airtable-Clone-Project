const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));

// Connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
  console.log('MongoDB connected ✅');
  console.log('Connected to DB:', mongoose.connection.name);
  app.listen(5000, () => console.log('Server started on port 5000'));
})
    .catch(err => console.error(err));
