const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/api/cooking/`, authenticateJWT, recipesController.getRecipes);
router.post(`/api/cooking/`, authenticateJWT, recipesController.setRecipe);
router.put(`/api/cooking/:todoId`, authenticateJWT, recipesController.updateRecipe);
router.put(`/api/cooking/bulk/sort-todos/`, authenticateJWT, recipesController.sortTodos);
router.delete(`/api/cooking/:todoId`, authenticateJWT, recipesController.deleteRecipe);


module.exports = router;
