const expressApp = require('express');
const authController = require('../controllers/authController');
const { ensureAuth: authMiddlewareEnsureAuth } = require('../middlewares/authMiddleware');

const router = new expressApp.Router();

router.get('/auth/google', authController.login);
router.get('/auth/google/callback', authController.callback);
router.get('/profile', authMiddlewareEnsureAuth, authController.profile);
router.get('/logout', authController.logout);

module.exports = router;
