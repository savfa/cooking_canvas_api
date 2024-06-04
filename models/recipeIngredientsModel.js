const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');

const RecipeIngredients = sequelize.define('RecipeIngredients', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  // связь с рецептом
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // связь с ингредиентом
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'recipe_ingredients'
});

exports.RecipeIngredients = RecipeIngredients;

exports.getRecipeIngredients = function (userId) {
  return RecipeIngredients.findAll({ where: { user_id: userId }, raw: true })
    .then((recipes) => {
      return recipes;
    })
};

exports.createRecipeIngredient = function (createObj) {
  return RecipeIngredients.create(createObj)
    .then((response) => {
      const { dataValues: todo } = response;
      return todo;
    })
};

exports.updateRecipeIngredient = function (id, updateObj) {
  return RecipeIngredients.update({...updateObj},{ where: { id } })
    .then(([affectedCount, affectedRows]) => {
      return RecipeIngredients.findOne({ where: { id }, raw: true });
    })
};

exports.deleteRecipeIngredient = function (id) {
  return RecipeIngredients.findOne({ where: { id }, raw: true })
    .then((todo) => {
      return RecipeIngredients.destroy({ where: { id }})
        .then(() => todo)
    })
};
