const express = require('express');
const router = express.Router();
const cookingStepsController = require('../controllers/cookingStepsController');
const { authenticateJWT } = require("../services/authenticateJWT");

router.get(`/api/cooking/cookingSteps/filter/`, authenticateJWT, cookingStepsController.getCookingSteps);
router.post(`/api/cooking/cookingSteps/`, authenticateJWT, cookingStepsController.createCookingStep);
router.put(`/api/cooking/cookingSteps/:cookingStepId`, authenticateJWT, cookingStepsController.updateCookingStep);
router.delete(`/api/cooking/cookingSteps/:cookingStepId`, authenticateJWT, cookingStepsController.deleteCookingStep);


module.exports = router;
