import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'

export {
  router
}

const router = Router()

router.get('/:id', isLoggedIn, moviesCtrl.show)
router.post('/search', isLoggedIn, moviesCtrl.search)
router.post("/:id/addToCollection", isLoggedIn, moviesCtrl.addToCollection)

router.delete("/:id/removeFromCollection", isLoggedIn, moviesCtrl.removeFromCollection)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}