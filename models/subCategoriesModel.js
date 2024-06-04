const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');

const SubCategories = sequelize.define('SubCategories', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  // связь с категорией
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  // связь с рецептом
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: 'sub_categories'
});

exports.SubCategories = SubCategories;

exports.getSubCategories = function (userId) {
  return SubCategories.findAll({ where: { user_id: userId }, raw: true })
    .then((recipes) => {
      return recipes;
    })
};

exports.createSubCategory = function (createObj) {
  return SubCategories.create(createObj)
    .then((response) => {
      const { dataValues: todo } = response;
      return todo;
    })
};

exports.updateSubCategory = function (id, updateObj) {
  return SubCategories.update({...updateObj},{ where: { id } })
    .then(([affectedCount, affectedRows]) => {
      return SubCategories.findOne({ where: { id }, raw: true });
    })
};

exports.deleteSubCategory = function (id) {
  return SubCategories.findOne({ where: { id }, raw: true })
    .then((todo) => {
      return SubCategories.destroy({ where: { id }})
        .then(() => todo)
    })
};
