const recipesModel = require('../models/recipesModel');

exports.getRecipes = function (req, res) {
  const { id } = req.user;

  recipesModel.getRecipes(id).then((todos) => res.send({ data: todos }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.createRecipe = function (req, res) {
  const { id } = req.user;
  const { label } = req.body;

  recipesModel.createRecipe({user_id: id, label}).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.updateRecipe = function (req, res) {
  const { recipeId } = req.params;

  recipesModel.updateRecipe(recipeId, req.body).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.deleteRecipe = function (req, res) {
  const { recipeId } = req.params;

  recipesModel.deleteRecipe(recipeId).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};
