const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/api/cooking/ingredients/filter/`, authenticateJWT, ingredientsController.getIngredients);
router.post(`/api/cooking/ingredients/`, authenticateJWT, ingredientsController.createIngredient);
router.put(`/api/cooking/ingredients/:ingredientId`, authenticateJWT, ingredientsController.updateIngredient);
router.delete(`/api/cooking/ingredients/:ingredientId`, authenticateJWT, ingredientsController.deleteIngredient);


module.exports = router;
