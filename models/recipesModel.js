const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');

const Recipes = sequelize.define('Recipes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  // связь с юзером
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // связь с группой блюда
  food_group: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

exports.getRecipes = function (userId) {
  return Recipes.findAll({ where: { user_id: userId }, raw: true })
    .then((recipes) => {
      return recipes;
    })
};

exports.setRecipe = function (createObj) {
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
