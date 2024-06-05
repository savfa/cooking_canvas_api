const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require("../services/authenticateJWT");

// auth
router.get(`/user/`, authenticateJWT, userController.getUser);
router.post(`/login/`, userController.login);
router.post(`/register/`, userController.register);

module.exports = router;
