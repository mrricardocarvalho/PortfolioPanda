const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  portfolio: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio', required: true },
  assetSymbol: { type: String, required: true },
  type: { type: String, enum: ['Buy', 'Sell'], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  fees: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);