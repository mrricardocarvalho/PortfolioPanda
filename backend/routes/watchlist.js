const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
import authMiddleware from '../../middleware/auth.js';

router.get('/', authMiddleware, watchlistController.getAll); // Get all watchlist items
router.get('/:id', authMiddleware, watchlistController.getById); // Get watchlist item by ID
router.post('/', authMiddleware, watchlistController.create); // Create a new watchlist item
router.put('/:id', authMiddleware, watchlistController.update); // Update a watchlist item
router.delete('/:id', authMiddleware, watchlistController.delete); // Delete a watchlist item

module.exports = router;