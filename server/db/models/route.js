'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Route extends Model {
		static associate(models) {
			Route.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user',
			});
			Route.hasMany(models.Score, {
				foreignKey: 'routeId',
				as: 'score',
			});

			Route.hasMany(models.Review, {
				foreignKey: 'routeId',
				as: 'review',
			});
		}
	}
	Route.init(
		{
			name: DataTypes.STRING,
			info: DataTypes.STRING,
			coordinates: DataTypes.JSON,
			routeLength: DataTypes.FLOAT,
			locality: DataTypes.STRING,
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Route',
		}
	);
	return Route;
};
