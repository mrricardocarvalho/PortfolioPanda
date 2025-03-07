const Transaction = require('../models/transaction');
import alphaVantageService from '../services/alphaVantageService.js';

module.exports = {
    getAll: async (req, res) => {
        try {
            const transactions = await Transaction.find();
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.params.id);
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            // Assuming req.body contains a 'symbol' field for the stock
            if (req.body.symbol) {
              try {
                // Fetch stock data from Alpha Vantage
                const stockData = await alphaVantageService.getStockData(req.body.symbol);

                // Add stock data to the transaction object.
                req.body.stockData = stockData;
              } catch (alphaVantageError) {
                // Handle errors specifically from Alpha Vantage (e.g., rate limit exceeded)
                return res.status(503).json({ error: `Error fetching stock data: ${alphaVantageError.message}` });
              }
            }

            const transaction = new Transaction(req.body);
            await transaction.save();
            res.status(201).json(transaction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.json(transaction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const transaction = await Transaction.findByIdAndDelete(req.params.id);
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};