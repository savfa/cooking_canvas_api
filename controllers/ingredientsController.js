const ingredientsModel = require('../models/ingredientsModel');

exports.getIngredients = function (req, res) {
  const { id } = req.user;

  ingredientsModel.getIngredients(id).then((todos) => res.send({ data: todos }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.createIngredient = function (req, res) {
  const { id } = req.user;
  const { label } = req.body;

  ingredientsModel.createIngredient({user_id: id, label}).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.updateIngredient = function (req, res) {
  const { ingredientId } = req.params;

  ingredientsModel.updateIngredient(ingredientId, req.body).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.deleteIngredient = function (req, res) {
  const { ingredientId } = req.params;

  ingredientsModel.deleteIngredient(ingredientId).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};
