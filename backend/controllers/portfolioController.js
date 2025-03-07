const Portfolio = require('../models/portfolio');
import alphaVantageService from '../services/alphaVantageService.js';

module.exports = {
    getAll: async (req, res) => {
        try {
            const portfolios = await Portfolio.find();
            res.json(portfolios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const portfolio = await Portfolio.findById(req.params.id);
            if (!portfolio) {
                return res.status(404).json({ message: 'Portfolio not found' });
            }
            res.json(portfolio);
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

                // Add stock data to the portfolio object.  For simplicity, we'll just add the raw data.
                // In a real application, you'd likely want to extract specific data points.
                req.body.stockData = stockData;
              } catch (alphaVantageError) {
                // Handle errors specifically from Alpha Vantage (e.g., rate limit exceeded)
                return res.status(503).json({ error: `Error fetching stock data: ${alphaVantageError.message}` });
              }
            }

            const portfolio = new Portfolio(req.body);
            await portfolio.save();
            res.status(201).json(portfolio);
        } catch (error) {
            // Handle other errors (e.g., validation errors from Mongoose)
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!portfolio) {
                return res.status(404).json({ message: 'Portfolio not found' });
            }
            res.json(portfolio);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
            if (!portfolio) {
                return res.status(404).json({ message: 'Portfolio not found' });
            }
            res.json({ message: 'Portfolio deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

// Note: Alpha Vantage's free tier has rate limits (e.g., 5 requests per minute, 500 per day).
// Consider implementing rate limiting or caching to avoid exceeding these limits.

// For data validation, use Mongoose schema validation features.