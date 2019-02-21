const { Category, Snippet, Sequelize } = require('../models')
const Op = Sequelize.Op
module.exports = {
  async store (req, res, next) {
    try {
      if (await Category.findOne({ where: { title: req.body.title } })) {
        req.flash('error', 'Categoria já cadastrada!!')
        return res.redirect('app/dashboard')
      }
      const category = await Category.create({
        ...req.body,
        UserId: req.session.user.id
      })
      req.flash('success', 'Categoria cadastrada com sucesso!!')
      return res.render(`app/category/${category.id}`)
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
  }
}
