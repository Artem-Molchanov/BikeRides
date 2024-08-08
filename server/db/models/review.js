'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		static associate(models) {
			Review.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user',
			});
			Review.belongsTo(models.Route, {
				foreignKey: 'routeId',
				as: 'route',
			});
		}
	}
	Review.init(
		{
			routeId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Review',
		}
	);
	return Review;
};
