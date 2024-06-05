const express = require('express');
const router = express.Router();
const cookingStepsController = require('../controllers/cookingStepsController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/cookingSteps/filter/`, authenticateJWT, cookingStepsController.getCookingSteps);
router.post(`/cookingSteps/`, authenticateJWT, cookingStepsController.createCookingStep);
router.put(`/cookingSteps/:cookingStepId`, authenticateJWT, cookingStepsController.updateCookingStep);
router.delete(`/cookingSteps/:cookingStepId`, authenticateJWT, cookingStepsController.deleteCookingStep);


module.exports = router;
