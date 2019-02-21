const { User, Sequelize } = require('../models/')
const Op = Sequelize.Op
const bcrypt = require('bcryptjs')
const Mail = require('../services/Mail')
const random = require('random')

module.exports = {
  signin (req, res) {
    return res.render('auth/signin')
  },
  signup (req, res) {
    return res.render('auth/signup')
  },

  async register (req, res, next) {
    try {
      const { email } = req.body

      if (await User.findOne({ where: { email: email } })) {
        req.flash('error', 'E-mail já cadastrado!!')
        return res.redirect('back')
      }

      const password = await bcrypt.hash(req.body.password, 5)

      await User.create({ ...req.body, password })

      req.flash('success', 'Cadastro realizado com sucesso!!')
      return res.redirect('/')
    } catch (error) {
      return next(error)
    }
  },

  async authenticate (req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        req.flash('error', 'E-mail não encontrado!!')
        return res.redirect('/')
      }

      if (user.status > 1) {
        req.flash('error', 'Usuário não definiu sua senha de acesso!!')
        return res.redirect('/')
      }

      if (!(await bcrypt.compare(password, user.password))) {
        req.flash('error', 'Senha incorreta!!')
        return res.redirect('/')
      }

      req.session.user = user
      req.session.save(() => {
        res.redirect('/app/dashboard')
      })
    } catch (error) {
      return next(error)
    }
  },

  signout (req, res) {
    return req.session.destroy(() => {
      res.redirect('/')
    })
  },

  reset (req, res) {
    return res.render('auth/reset')
  },

  newPassword (req, res) {
    return res.render('auth/newsignup')
  },

  async resetPassword (req, res, next) {
    try {
      const { email } = req.body
      const user = await User.findOne({
        where: {
          email: email,
          status: {
            [Op.or]: [1, 2]
          }
        }
      })
      if (!user) {
        req.flash('error', 'E-mail não encontrado!!')
        return res.redirect('back')
      }

      const token = random.int(100000, 999999)

      await user.update({ status: 2, password: token })

      Mail.sendMail({
        from: '"Sistema" <contato@sistema.com.br>',
        to: user.email,
        subject: 'Reset de Senha',
        template: 'reset',
        context: { name: user.name, token }
      })

      return res.render('auth/newsignup')
    } catch (error) {
      return next(error)
    }
  },

  async setNewPassword (req, res, next) {
    try {
      const { email, token, password, passwordConfirm } = req.body

      const user = await User.findOne({
        where: {
          email: email,
          status: {
            [Op.or]: [1, 2]
          }
        }
      })
      if (!user) {
        req.flash('error', 'E-mail não encontrado!!')
        return res.redirect('/setNewPassword')
      }

      if (token !== user.password) {
        req.flash('error', 'Token não confere!!')
        return res.redirect('/setNewPassword')
      }

      if (password !== passwordConfirm) {
        req.flash('error', 'Senhas não conferem!!')
        return res.redirect('/setNewPassword')
      }

      const newPassword = await bcrypt.hash(password, 5)

      await user.update({ password: newPassword, status: 1 })

      return res.redirect('/')
    } catch (error) {
      return next(error)
    }
  }
}
