module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT
  })

  return Sessions
}
