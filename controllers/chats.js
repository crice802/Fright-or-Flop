import { Profile } from "../models/profile.js";
import { Chat } from "../models/chat.js";

export {
  chatroom
}

function chatroom(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Chat.find({})
    .sort({ _id: -1 })
    .limit(150)
    .then((chats) => {
      res.render('chatroom', {
        title: "Chat Room",
        chats,
        profile
      })
    })
  })
}