import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'

export {
  router
}

const router = Router()

router.get('/reviews', function (req, res) {
  res.render('index', { title: 'Home Page', user: req.user ? req.user : null })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}