const { getPasswordHash } = require("../services/password");
const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');
const _ = require('lodash');

const { Recipes } = require('./recipesModel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
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
  tableName: 'users'
});

User.hasMany(Recipes, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Recipes.belongsTo(User,
{
  foreignKey: 'user_id',
});

exports.getUser = function (id, email) {
  return User.findOne({ where: { id, email }, raw: true })
    .then((user) => {
      if (!user) return Promise.reject(new Error(`User not found`));
      return _.omit(user, [`password`])
    })
};

exports.getLogin = function (email, password) {
  return User.findOne({ where: { email, password: getPasswordHash(password) }, raw: true })
    .then((user) => {
      if (!user) return Promise.reject(new Error(`User email or password incorrect`));
      return _.omit(user, [`password`])
    })
};

exports.register = function (login, email, password) {
  return User.create({ login, email, password })
    .then((user) => { // .toJSON({ plain: true }) | .get({plain:true})
      const { password, ...userWithoutPassword } = user.toJSON({ plain: true });

      return userWithoutPassword
    })
};
