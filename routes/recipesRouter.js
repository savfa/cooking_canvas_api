const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/api/cooking/recipes/filter/`, authenticateJWT, recipesController.getRecipes);
router.post(`/api/cooking/recipes`, authenticateJWT, recipesController.createRecipe);
router.put(`/api/cooking/recipes/:recipeId`, authenticateJWT, recipesController.updateRecipe);
router.delete(`/api/cooking/recipes/:recipeId`, authenticateJWT, recipesController.deleteRecipe);


module.exports = router;
