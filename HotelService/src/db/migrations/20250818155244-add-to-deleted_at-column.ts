'use strict';

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.addColumn('Hotels', 'deleted_at', {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: null,
  });
},

  async down (queryInterface:QueryInterface) {
    await queryInterface.removeColumn('Hotels', 'deleted_at');
    
  }
};
