const recipesModel = require('../models/recipesModel');

exports.getRecipes = function (req, res) {
  const { id } = req.user;

  recipesModel.getRecipes(id).then((todos) => res.send({ data: todos }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.setRecipe = function (req, res) {
  const { id } = req.user;
  const { label } = req.body;

  recipesModel.setRecipe({user_id: id, label}).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.updateRecipe = function (req, res) {
  const { todoId } = req.params;

  recipesModel.updateRecipe(todoId, req.body).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.sortTodos = function (req, res) {
  const { id: userId } = req.user;
  const { sortTodos } = req.body;

  recipesModel.sortTodos(sortTodos, userId).then((todo) => res.send({ data: `success` }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.deleteRecipe = function (req, res) {
  const { todoId } = req.params;

  recipesModel.deleteRecipe(todoId).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};
