const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', async (req, res, next) => {
    try {
        await authController.index(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;