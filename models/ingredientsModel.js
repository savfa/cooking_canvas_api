const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');
const { RecipeIngredients } = require("./recipeIngredientsModel");

const Ingredients = sequelize.define('Ingredients', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: 'ingredients'
});

exports.Ingredients = Ingredients;

Ingredients.hasOne(RecipeIngredients, {
  foreignKey: 'ingredient_id',
  allowNull: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
RecipeIngredients.belongsTo(Ingredients,
{
  foreignKey: 'ingredient_id',
  allowNull: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

exports.getIngredients = function (userId) {
  return Ingredients.findAll({ where: { user_id: userId }, raw: true })
    .then((recipes) => {
      return recipes;
    })
};

exports.createIngredient = function (createObj) {
  return Ingredients.create(createObj)
    .then((response) => {
      const { dataValues: todo } = response;
      return todo;
    })
};

exports.updateIngredient = function (id, updateObj) {
  return Ingredients.update({...updateObj},{ where: { id } })
    .then(([affectedCount, affectedRows]) => {
      return Ingredients.findOne({ where: { id }, raw: true });
    })
};

exports.deleteIngredient = function (id) {
  return Ingredients.findOne({ where: { id }, raw: true })
    .then((todo) => {
      return Ingredients.destroy({ where: { id }})
        .then(() => todo)
    })
};
