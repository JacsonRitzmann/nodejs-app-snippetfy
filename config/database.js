module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_BASENAME,
  host: process.env.DB_HOST,
  dialect: 'mysql'
}
