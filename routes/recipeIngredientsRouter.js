const express = require('express');
const router = express.Router();
const recipeIngredientsController = require('../controllers/recipeIngredientsController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/recipeIngredients/filter/`, authenticateJWT, recipeIngredientsController.getRecipeIngredients);
router.post(`/recipeIngredients/`, authenticateJWT, recipeIngredientsController.createRecipeIngredient);
router.put(`/recipeIngredients/:recipeIngredientId`, authenticateJWT, recipeIngredientsController.updateRecipeIngredient);
router.delete(`/recipeIngredients/:recipeIngredientId`, authenticateJWT, recipeIngredientsController.deleteRecipeIngredient);


module.exports = router;
