const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/api/cooking/categories/`, authenticateJWT, categoriesController.getCategories);
router.post(`/api/cooking/categories/`, authenticateJWT, categoriesController.createCategory);
router.put(`/api/cooking/categories/:categoryId`, authenticateJWT, categoriesController.updateCategory);
router.delete(`/api/cooking/categories/:categoryId`, authenticateJWT, categoriesController.deleteCategory);


module.exports = router;
