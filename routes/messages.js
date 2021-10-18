import { Router } from "express";
import * as messageCtrl from '../controllers/messages.js'

export {
  router
}

const router = Router()

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) return next()
  res.redirect("/auth/google")
}