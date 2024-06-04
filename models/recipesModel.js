const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');
const { SubCategories } = require("./subCategoriesModel");
const { RecipeIngredients } = require("./recipeIngredientsModel");
const { CookingSteps } = require("./cookingStepsModel");

const Recipes = sequelize.define('Recipes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  // связь с юзером
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cooking_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  video: {
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
  tableName: 'recipes'
});

exports.Recipes = Recipes;

Recipes.hasMany(SubCategories, {
  foreignKey: 'recipe_id',
  allowNull: false
});
SubCategories.belongsTo(Recipes,
{
  foreignKey: 'recipe_id',
  allowNull: false,
});

Recipes.hasMany(RecipeIngredients, {
  foreignKey: 'recipe_id',
  allowNull: false,
});
RecipeIngredients.belongsTo(Recipes,
{
  foreignKey: 'recipe_id',
  allowNull: false,
});

Recipes.hasMany(CookingSteps, {
  foreignKey: 'recipe_id',
  allowNull: false,
});
CookingSteps.belongsTo(Recipes,
{
  foreignKey: 'recipe_id',
  allowNull: false,
});

exports.getRecipes = function (userId) {
  return Recipes.findAll({ where: { user_id: userId }, raw: true })
    .then((recipes) => {
      return recipes;
    })
};

exports.createRecipe = function (createObj) {
  return Recipes.create(createObj)
    .then((response) => {
      const { dataValues: todo } = response;
      return todo;
    })
};

exports.updateRecipe = function (id, updateObj) {
  return Recipes.update({...updateObj},{ where: { id } })
    .then(([affectedCount, affectedRows]) => {
      return Recipes.findOne({ where: { id }, raw: true });
    })
};

exports.deleteRecipe = function (id) {
  return Recipes.findOne({ where: { id }, raw: true })
    .then((todo) => {
      return Recipes.destroy({ where: { id }})
        .then(() => todo)
    })
};
