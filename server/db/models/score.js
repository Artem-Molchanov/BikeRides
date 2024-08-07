'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Score extends Model {
		static associate(models) {
			Score.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user',
			});
			Score.belongsTo(models.Route, {
				foreignKey: 'routeId',
				as: 'route',
			});
		}
	}
	Score.init(
		{
			userId: DataTypes.INTEGER,
			routeId: DataTypes.INTEGER,
			point: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Score',
		}
	);
	return Score;
};
