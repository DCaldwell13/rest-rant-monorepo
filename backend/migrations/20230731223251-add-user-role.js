'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(users, roles, {
      values: [
        'reviewer',
        'admin'
      ],
      default: 'reviewer'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users, roles')
  }
};
