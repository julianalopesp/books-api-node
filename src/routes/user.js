const express = require('express');
const router = express.Router();
const { register, authenticate, getUser, forgotPassword, resetPassword } = require('../controllers/auth');

router.post('/register', register);
router.get('/:id', getUser);
router.post('/authenticate', authenticate);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);

module.exports = router;