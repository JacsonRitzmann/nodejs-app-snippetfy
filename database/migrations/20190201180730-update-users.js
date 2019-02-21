module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Users', 'status', {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Users', 'status')
  }
}
