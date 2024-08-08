'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Route, {
				foreignKey: 'userId',
				as: 'route',
			});
			User.hasMany(models.Score, {
				foreignKey: 'userId',
				as: 'score',
			});
			User.hasMany(models.Review, {
				foreignKey: 'userId',
				as: 'review',
			});
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
