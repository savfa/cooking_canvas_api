const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');
const { SubCategories } = require("./subCategoriesModel");

const Categories = sequelize.define('Categories', {
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
  tableName: 'categories'
});

Categories.hasMany(SubCategories, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
SubCategories.belongsTo(Categories,
{
  foreignKey: 'category_id',
});

exports.getCategories = function (userId) {
  return Categories.findAll({ where: { user_id: userId }, raw: true })
    .then((recipes) => {
      return recipes;
    })
};

exports.createCategory = function (createObj) {
  return Categories.create(createObj)
    .then((response) => {
      const { dataValues: todo } = response;
      return todo;
    })
};

exports.updateCategory = function (id, updateObj) {
  return Categories.update({...updateObj},{ where: { id } })
    .then(([affectedCount, affectedRows]) => {
      return Categories.findOne({ where: { id }, raw: true });
    })
};

exports.deleteCategory = function (id) {
  return Categories.findOne({ where: { id }, raw: true })
    .then((todo) => {
      return Categories.destroy({ where: { id }})
        .then(() => todo)
    })
};
