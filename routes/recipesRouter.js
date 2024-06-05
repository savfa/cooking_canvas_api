const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/recipes/filter/`, authenticateJWT, recipesController.getRecipes);
router.post(`/recipes/`, authenticateJWT, recipesController.createRecipe);
router.put(`/recipes/:recipeId`, authenticateJWT, recipesController.updateRecipe);
router.delete(`/recipes/:recipeId`, authenticateJWT, recipesController.deleteRecipe);


module.exports = router;
