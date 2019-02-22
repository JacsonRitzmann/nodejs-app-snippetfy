const { Category, Snippet, Sequelize } = require('../models')
const Op = Sequelize.Op
module.exports = {
  async store (req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Categoria não informada!!')
        return res.redirect('/app/dashboard')
      }
      if (await Category.findOne({ where: { title: req.body.title } })) {
        req.flash('error', 'Categoria já cadastrada!!')
        return res.redirect('/app/dashboard')
      }
      const category = await Category.create({
        ...req.body,
        UserId: req.session.user.id
      })
      req.flash('success', 'Categoria cadastrada com sucesso!!')
      return res.redirect(`/app/category/${category.id}`)
    } catch (error) {
      return next(error)
    }
  },

  async update (req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Titulo da Categoria não foi informado!!')
        return res.redirect(`/app/category/${req.params.id}`)
      }

      if (await Category.findOne({ where: { title: req.body.title } })) {
        req.flash('error', 'Categoria já cadastrada!!')
        return res.redirect(`/app/category/${req.params.id}`)
      }
      const category = await Category.findById(req.params.id)
      await category.update(req.body)
      req.flash('success', 'Categoria alterada com sucesso!!')
      return res.redirect(`/app/category/${req.params.id}`)
    } catch (error) {
      return next(error)
    }
  },

  async show (req, res, next) {
    try {
      const categories = await Category.findAll({
        include: [Snippet],
        where: { UserId: req.session.user.id }
      })

      const snippets = await Snippet.findAll({
        where: { CategoryId: req.params.id }
      })

      return res.render('categories/show', {
        categories,
        snippets,
        ativeCategory: req.params.id
      })
    } catch (error) {
      return next(error)
    }
  },
  async search (req, res, next) {
    try {
      console.log(req.body.search)

      const categories = await Category.findAll({
        include: [Snippet],
        where: { UserId: req.session.user.id }
      })

      const snippets = await Snippet.findAll({
        where: {
          CategoryId: req.params.id,
          title: {
            [Op.like]: `%${req.body.search}%`
          }
        }
      })

      return res.render('categories/show', {
        categories,
        snippets,
        ativeCategory: req.params.id
      })
    } catch (error) {
      return next(error)
    }
  },
  async destroy (req, res, next) {
    try {
      const snippets = await Snippet.findAll({
        where: { CategoryId: req.params.id }
      })
      if (snippets.length) {
        req.flash('error', 'Categoria possue Snippets cadastrados!!')
        return res.redirect(`/app/category/${req.params.id}`)
      }
      await Category.destroy({ where: { id: req.params.id } })
      req.flash('success', 'Registro excluido com successo!!')
      return res.redirect('/app/dashboard')
    } catch (error) {
      return next(error)
    }
  }
}
