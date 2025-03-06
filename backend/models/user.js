const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  portfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' }],
  watchlist: [{ type: String }] // Array of asset symbols (e.g., 'AAPL', 'TSLA')
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

// Method to verify password
userSchema.methods.verifyPassword = async function(password) {
  return await argon2.verify(this.password, password);
};

module.exports = mongoose.model('User', userSchema);