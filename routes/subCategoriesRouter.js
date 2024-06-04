const express = require('express');
const router = express.Router();
const subCategoriesController = require('../controllers/subCategoriesController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/api/cooking/subcategories/`, authenticateJWT, subCategoriesController.getSubCategories);
router.post(`/api/cooking/subcategories/`, authenticateJWT, subCategoriesController.createSubCategory);
router.put(`/api/cooking/subcategories/:subcategoryId`, authenticateJWT, subCategoriesController.updateSubCategory);
router.delete(`/api/cooking/subcategories/:subcategoryId`, authenticateJWT, subCategoriesController.deleteSubCategory);


module.exports = router;
