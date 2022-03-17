module.exports = app => {
  app.route('*').get(
    async (req, res) => {
      res.status(404).json('Não encontrado!')
    })
}
