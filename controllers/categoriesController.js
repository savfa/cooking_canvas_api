const categoriesModel = require('../models/categoriesModel');

exports.getCategories = function (req, res) {
  const { id } = req.user;

  categoriesModel.getCategories(id).then((todos) => res.send({ data: todos }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.createCategory = function (req, res) {
  const { id } = req.user;
  const { label } = req.body;

  categoriesModel.createCategory({user_id: id, label}).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.updateCategory = function (req, res) {
  const { categoryId } = req.params;

  categoriesModel.updateCategory(categoryId, req.body).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.deleteCategory = function (req, res) {
  const { categoryId } = req.params;

  categoriesModel.deleteCategory(categoryId).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};
