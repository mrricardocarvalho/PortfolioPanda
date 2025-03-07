const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
import authMiddleware from '../../middleware/auth.js';

router.get('/', authMiddleware, portfolioController.getAll); // Get all portfolios
router.get('/:id', authMiddleware, portfolioController.getById); // Get portfolio by ID
router.post('/', authMiddleware, portfolioController.create); // Create a new portfolio
router.put('/:id', authMiddleware, portfolioController.update); // Update a portfolio
router.delete('/:id', authMiddleware, portfolioController.delete); // Delete a portfolio

module.exports = router;