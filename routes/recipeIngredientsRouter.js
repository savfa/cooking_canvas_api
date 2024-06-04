const express = require('express');
const router = express.Router();
const recipeIngredientsController = require('../controllers/recipeIngredientsController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/api/cooking/recipeIngredients/filter/`, authenticateJWT, recipeIngredientsController.getRecipeIngredients);
router.post(`/api/cooking/recipeIngredients/`, authenticateJWT, recipeIngredientsController.createRecipeIngredient);
router.put(`/api/cooking/recipeIngredients/:recipeIngredientId`, authenticateJWT, recipeIngredientsController.updateRecipeIngredient);
router.delete(`/api/cooking/recipeIngredients/:recipeIngredientId`, authenticateJWT, recipeIngredientsController.deleteRecipeIngredient);


module.exports = router;
