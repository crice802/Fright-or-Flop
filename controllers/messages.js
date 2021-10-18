import { Message } from "../models/message";

export { 
  index,
  create,
  show,
  reply
}

function reply(req, res) {
  Message.findById(req.params.id)
  .then((message)=> {
    req.body.author = req.user.profile._id
    message.replies.push(req.body)
    message.save()
    .then(()=> {
      res.redirect(`/messages/${req.params.id}`)
    })
  })
}

function show(req, res) {
  Message.findById(req.params.id)
  .populate('author')
  .populate({
    path: 'replies',
    populate: {
      path: 'author'
    }
  })
  .then((message)=> {
    res.render('messages/show', {
      title: 'Message Details',
      message
    })
  })
}

function create(req, res){
  req.body.author = req.user.profile._id
  Message.create()
}

function index(req, res) {
  Message.find({})
  .populate('author')
  .sort({ createdAt: "asc" })
  .then((messages) => {
    res.render('messages/index', {
      title: 'Message Board',
      messages: messages.reverse()
    })
  })
}