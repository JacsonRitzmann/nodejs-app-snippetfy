const express = require('express')

const routes = express.Router()

const authMiddleware = require('./middlewares/auth')
const guestMiddleware = require('./middlewares/guest')

const authController = require('./controllers/authController')
const dashboardController = require('./controllers/dashboardController')
const categoryController = require('./controllers/categoryController')
const snippetController = require('./controllers/snippetController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  next()
})
/**
 * Rotas Autenticação
 */
routes.get('/', guestMiddleware, authController.signin)
routes.get('/signup', guestMiddleware, authController.signup)
routes.get('/signout', authController.signout)
/* Carrega a tela de reset */
routes.get('/reset', authController.reset)
/* Encaminha o token */
routes.post('/resetPassword', authController.resetPassword)
/* Tela Nova senha */
routes.get('/setNewPassword', authController.newPassword)
/* Grava Nova senha */
routes.post('/setNewPassword', authController.setNewPassword)
routes.post('/register', authController.register)
routes.post('/authenticate', authController.authenticate)

/**
 * Início Rotas Aplicaçào
 */
routes.use('/app', authMiddleware)

routes.get('/app/dashboard', dashboardController.index)
routes.post('/app/category/create', categoryController.store)
routes.get('/app/category/:id', categoryController.show)
routes.post('/app/category/:categoryId/snippet/create', snippetController.store)
routes.get('/app/category/:categoryId/snippet/:id', snippetController.show)
routes.put('/app/category/:categoryId/snippet/:id', snippetController.update)
routes.delete(
  '/app/category/:categoryId/snippet/:id',
  snippetController.destroy
)
routes.post('/app/category/:id/search', categoryController.search)

/**
 * Final Rotas Aplicaçào
 */
routes.use((req, res) => {
  return res.render('errors/404.njk')
})

routes.use((err, req, res, next) => {
  res.status(err.status || 500)

  return res.render('errors/index', {
    messge: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err
  })
})

module.exports = routes
