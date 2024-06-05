const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/ingredients/filter/`, authenticateJWT, ingredientsController.getIngredients);
router.post(`/ingredients/`, authenticateJWT, ingredientsController.createIngredient);
router.put(`/ingredients/:ingredientId`, authenticateJWT, ingredientsController.updateIngredient);
router.delete(`/ingredients/:ingredientId`, authenticateJWT, ingredientsController.deleteIngredient);


module.exports = router;
