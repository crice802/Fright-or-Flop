export {
  index,
}

function index(req, res) {
  res.render('index', {
    title: 'Fright or Flop',
    user: req.user ? req.user : null 
  })
} 