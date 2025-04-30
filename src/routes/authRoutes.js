const express = require('express');
const authController = require('../controllers/authController');
const { ensureAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/auth/google', authController.login);
router.get('/auth/google/callback', authController.callback);
router.get('/profile', ensureAuth, authController.profile);
router.get('/logout', authController.logout);

module.exports = router;
