import { Profile } from "../models/profile.js"
import { Movie } from "../models/movie.js"

export {
  index,
  show,
  edit,
  update,

}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((profile) => {
    res.redirect(`/profiles/${profile._id}`)
  })
  .catch((err) => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res){
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/edit', {
      title: `Editing ${profile.name}'s profile`,
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res){
  Profile.findById(req.params.id)
  .then((profile) => {
    Profile.findById(req.user.profile)
    .then(userProfile => {
      res.render("profiles/show", {
        profile,
        userProfile,
        title: `${profile.name}'s profile`,
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function index(req, res){
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      title: "FoF profiles",
      profiles
    })
  })
}