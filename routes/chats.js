import { Router } from 'express'
import * as chatsCtrl from '../controllers/chats.js'
export {
  router
}

const router = Router()

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}