const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require("../services/authenticateJWT");

// auth
router.get(`/api/cooking/user/`, authenticateJWT, userController.checkUser);
router.post(`/api/cooking/login/`, userController.login);
router.post(`/api/cooking/register/`, userController.register);

module.exports = router;
