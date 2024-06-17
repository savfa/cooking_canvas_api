const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require("../services/authenticateJWT");
const { uploadMiddleware } = require("../services/uploadMiddleware");

// auth
router.get(`/user/`, authenticateJWT, userController.getUser);
router.post(`/user/upload_avatar/`, authenticateJWT, uploadMiddleware('./media/avatars'), userController.uploadAvatar);
router.post(`/login/`, userController.login);
router.post(`/register/`, userController.register);

module.exports = router;
