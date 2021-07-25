import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'

export {
  router
}

const router = Router()

router.get('/:id', isLoggedIn, moviesCtrl.show)
router.post('/search', isLoggedIn, moviesCtrl.search)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}