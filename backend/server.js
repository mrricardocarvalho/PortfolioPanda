const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolios', require('./routes/portfolio'));
app.use('/api/transactions', require('./routes/transaction'));
app.use('/api/watchlists', require('./routes/watchlist'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});