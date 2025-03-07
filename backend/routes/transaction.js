const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
import authMiddleware from '../../middleware/auth.js';

router.get('/', authMiddleware, transactionController.getAll); // Get all transactions
router.get('/:id', authMiddleware, transactionController.getById); // Get transaction by ID
router.post('/', authMiddleware, transactionController.create); // Create a new transaction
router.put('/:id', authMiddleware, transactionController.update); // Update a transaction
router.delete('/:id', authMiddleware, transactionController.delete); // Delete a transaction

module.exports = router;