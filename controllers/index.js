export {
  index,
}

function index(req, res) {
  res.render('index', {
    title: 'Latest Activity',
    user: req.user ? req.user : null 
  })
} 