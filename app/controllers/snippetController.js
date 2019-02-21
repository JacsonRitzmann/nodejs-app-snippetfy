const { Snippet, Category } = require('../models')

module.exports = {
  async store (req, res, next) {
    try {
      if (await Snippet.findOne({ where: { title: req.body.title } })) {
        req.flash('error', 'Snippet já cadastrada!!')
        return res.redirect('app/dashboard')
      }
      const snippets = await Snippet.create({
        ...req.body,
        CategoryId: req.params.categoryId
      })
      req.flash('success', 'Snippet cadastrado com sucesso!!')
      res.redirect(
        `/app/category/${req.params.categoryId}/snippet/${snippets.id}`
      )
    } catch (error) {
      return next(error)
    }
  },
  async show (req, res, next) {
    try {
      const { categoryId, id } = req.params

      const categories = await Category.findAll({
        include: [Snippet],
        where: { UserId: req.session.user.id }
      })

      const snippets = await Snippet.findAll({
        where: { CategoryId: categoryId }
      })

      const snippet = await Snippet.findById(id)

      return res.render('snippets/show', {
        snippets,
        categories,
        currentSnippet: snippet,
        ativeCategory: categoryId
      })
    } catch (error) {
      return next(error)
    }
  },
  async update (req, res, next) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      await snippet.update(req.body)
      req.flash('success', 'Registro atualizado com successo!!')
      res.redirect(
        `/app/category/${req.params.categoryId}/snippet/${snippet.id}`
      )
    } catch (error) {
      return next(error)
    }
  },
  async destroy (req, res, next) {
    try {
      await Snippet.destroy({ where: { id: req.params.id } })
      req.flash('success', 'Registro excluido com successo!!')
      res.redirect(`/app/category/${req.params.categoryId}`)
    } catch (error) {
      return next(error)
    }
  }
}
