// e-commerse-mini-project/backend/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch('/forgot-password', authController.forgotPassword);

module.exports = router;
