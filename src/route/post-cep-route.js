module.exports = app => {
  app.route('/api/v1/cep').post(
    (req, res) => res.status(200).json({_id: 2, cidade: 'Maringá', cep: '121212312'}))
}
