module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER
  })

  User.associate = models => {
    User.hasMany(models.Category)
  }

  return User
}
