const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Define routes here later

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});