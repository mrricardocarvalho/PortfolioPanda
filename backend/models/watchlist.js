const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Assuming you have a User model
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  // Add other fields as needed, e.g., companyName, addedDate, etc.
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);