const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/categories/`, authenticateJWT, categoriesController.getCategories);
router.post(`/categories/`, authenticateJWT, categoriesController.createCategory);
router.put(`/categories/:categoryId`, authenticateJWT, categoriesController.updateCategory);
router.delete(`/categories/:categoryId`, authenticateJWT, categoriesController.deleteCategory);


module.exports = router;
