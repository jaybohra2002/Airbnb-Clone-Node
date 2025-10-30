'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hotels', [
      {
        name: 'Taj Mahal Palace',
        address: 'Apollo Bandar, Colaba, Mumbai',
        location: 'Mumbai',
        rating: 4.9,
        rating_count: 1023,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Oberoi Hotel',
        address: 'Nariman Point, Mumbai',
        location: 'Mumbai',
        rating: 4.7,
        rating_count: 876,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hotels', null, {});
  }
};
