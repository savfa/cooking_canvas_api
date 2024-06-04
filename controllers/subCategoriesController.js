const subCategoriesModel = require('../models/subCategoriesModel');

exports.getSubCategories = function (req, res) {
  const { id } = req.user;

  subCategoriesModel.getSubCategories(id).then((todos) => res.send({ data: todos }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.createSubCategory = function (req, res) {
  const { id } = req.user;
  const { label } = req.body;

  subCategoriesModel.createSubCategory({user_id: id, label}).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.updateSubCategory = function (req, res) {
  const { subcategoryId } = req.params;

  subCategoriesModel.updateSubCategory(subcategoryId, req.body).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};

exports.deleteSubCategory = function (req, res) {
  const { subcategoryId } = req.params;

  subCategoriesModel.deleteSubCategory(subcategoryId).then((todo) => res.send({ data: todo }))
    .catch((err) => {
      res.status(400);
      res.json({ error: err.message });
    })
};
