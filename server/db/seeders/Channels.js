'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Channels',
			[
				{
					name: 'National Geographic',
					price: '300',
					img: 'link',
					subscriberCount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Nat GEO Wild',
					price: '200',
					img: 'link',
					subscriberCount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'News',
					price: '100',
					img: 'link',
					subscriberCount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Channels', null, {});
  }
};
