const express = require('express');
const router = express.Router();
const сategoriesController = require('../controllers/сategoriesController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/api/cooking/categories/`, authenticateJWT, сategoriesController.getCategories);
router.post(`/api/cooking/categories/`, authenticateJWT, сategoriesController.createCategory);
router.put(`/api/cooking/categories/:categoryId`, authenticateJWT, сategoriesController.updateCategory);
router.delete(`/api/cooking/categories/:categoryId`, authenticateJWT, сategoriesController.deleteCategory);


module.exports = router;
