const { getPasswordHash } = require("../services/password");
const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');
const _ = require('lodash');
const path = require('path');

const { Recipes } = require('./recipesModel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  patronymic: {
    type: DataTypes.STRING,
    allowNull: true,
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

exports.register = function (firstName, email, password) {
  // todo перед регистрацией проверять email на уникальность (привести к нижнему регистру)
  return User.create({ firstName, email, password })
    .then((user) => { // .toJSON({ plain: true }) | .get({plain:true})
      const { password, ...userWithoutPassword } = user.toJSON({ plain: true });

      return userWithoutPassword
    })
};

exports.uploadAvatar = function (id, file) {
  return User.findByPk(id)
    .then((user) => {
      if (!user) throw new Error(`User not found`);
      user.avatar = path.posix.join('media', 'avatars', file.filename);
      return user.save().then((user) => {
        const { password, ...userWithoutPassword } = user.toJSON({ plain: true });

        return userWithoutPassword
      })
    })
};
