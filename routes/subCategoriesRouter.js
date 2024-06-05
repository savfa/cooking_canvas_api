const express = require('express');
const router = express.Router();
const subCategoriesController = require('../controllers/subCategoriesController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/subcategories/`, authenticateJWT, subCategoriesController.getSubCategories);
router.post(`/subcategories/`, authenticateJWT, subCategoriesController.createSubCategory);
router.put(`/subcategories/:subcategoryId`, authenticateJWT, subCategoriesController.updateSubCategory);
router.delete(`/subcategories/:subcategoryId`, authenticateJWT, subCategoriesController.deleteSubCategory);


module.exports = router;
