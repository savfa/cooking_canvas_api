const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');

const CookingSteps = sequelize.define('CookingSteps', {
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
  sortId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '1',
  },
  title: {
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
  tableName: 'cooking_steps'
});

exports.CookingSteps = CookingSteps;


exports.getCookingSteps = function (userId) {
  return CookingSteps.findAll({ where: { user_id: userId }, raw: true })
    .then((recipes) => {
      return recipes;
    })
};

exports.createCookingStep = function (createObj) {
  return CookingSteps.create(createObj)
    .then((response) => {
      const { dataValues: todo } = response;
      return todo;
    })
};

exports.updateCookingStep = function (id, updateObj) {
  return CookingSteps.update({...updateObj},{ where: { id } })
    .then(([affectedCount, affectedRows]) => {
      return CookingSteps.findOne({ where: { id }, raw: true });
    })
};

exports.deleteCookingStep = function (id) {
  return CookingSteps.findOne({ where: { id }, raw: true })
    .then((todo) => {
      return CookingSteps.destroy({ where: { id }})
        .then(() => todo)
    })
};
