const cookingStepsModel = require('../models/cookingStepsModel');

exports.getCookingSteps = function (req, res) {
  const { id } = req.user;

  cookingStepsModel.getCookingSteps(id).then((todos) => res.send({ data: todos }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.createCookingStep = function (req, res) {
  const { id } = req.user;
  const { label } = req.body;

  cookingStepsModel.createCookingStep({user_id: id, label}).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.updateCookingStep = function (req, res) {
  const { cookingStepId } = req.params;

  cookingStepsModel.updateCookingStep(cookingStepId, req.body).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.deleteCookingStep = function (req, res) {
  const { cookingStepId } = req.params;

  cookingStepsModel.deleteCookingStep(cookingStepId).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};
