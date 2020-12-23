module.exports = app => {
  app.route('/api/v1/cep').get(
    (req, res) => res.status(200).json([{_id: 1, cidade: 'Sarandi', cep: '1132132'}]))
}
