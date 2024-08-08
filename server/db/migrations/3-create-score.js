'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Scores', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,

				references: {
					model: {
						tableName: 'Users',
					},
					key: 'id',
				},
			},
			routeId: {
				type: Sequelize.INTEGER,

				references: {
					model: {
						tableName: 'Routes',
					},
					key: 'id',
				},
			},
			point: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Scores');
  }
};