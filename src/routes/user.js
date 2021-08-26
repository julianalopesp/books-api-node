const express = require('express');
const router = express.Router();
const { register, authenticate, forgotPassword, resetPassword } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware);

router.post('/register', register);
router.post('/authenticate', authenticate);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);

module.exports = router;