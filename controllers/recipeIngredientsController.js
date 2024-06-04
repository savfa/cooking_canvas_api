const recipeIngredientsModel = require('../models/recipeIngredientsModel');

exports.getRecipeIngredients = function (req, res) {
  const { id } = req.user;

  recipeIngredientsModel.getRecipeIngredients(id).then((todos) => res.send({ data: todos }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.createRecipeIngredient = function (req, res) {
  const { id } = req.user;
  const { label } = req.body;

  recipeIngredientsModel.createRecipeIngredient({user_id: id, label}).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.updateRecipeIngredient = function (req, res) {
  const { recipeIngredientId } = req.params;

  recipeIngredientsModel.updateRecipeIngredient(recipeIngredientId, req.body).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.deleteRecipeIngredient = function (req, res) {
  const { recipeIngredientId } = req.params;

  recipeIngredientsModel.deleteRecipeIngredient(recipeIngredientId).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};
