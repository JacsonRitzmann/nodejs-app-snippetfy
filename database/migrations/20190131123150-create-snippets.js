module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Snippets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        references: { model: 'Categories', Key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Snippets')
  }
}
