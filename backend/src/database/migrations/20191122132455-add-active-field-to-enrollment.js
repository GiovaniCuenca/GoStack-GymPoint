module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('enrollments', 'active', {
      type: Sequelize.BOOLEAN,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('enrollments', 'active');
  },
};
