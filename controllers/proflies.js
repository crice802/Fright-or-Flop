import { Profile } from "../models/profile.js"
import { Movie } from "../models/movie.js"

export {
  index,
  show,
  edit,
  update,
  addFriend,
  unFriend,

}

function addFriend(req, res){
//find the logged in user profile and pass the profile then push the followers id into friends array
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params.id)
    profile.save()
      .then (() => {
        res.redirect(`/profiles/${req.params.id}`)
      })
  })
  .catch((err) => {
    console.log(err)
    res.redirct('/')
  })
}

function unFriend(req,res) {
  //find the logged in user profile and pass the profile then remove the followers id from the friends array
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  //search the users profile and set the forms info to the updated info
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
  //find logging in users profile then render the edit form
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

function show(req, res) {
  //find the "fiends" id and populate friends array then pass profile to the profile show view
  Profile.findById(req.params.id)
  .populate("friends")
  .then((profile) => {
    //find any movies collected by "freind" and pass movies to the  profile show view
    Movie.find({ collectedBy: profile._id })
    .then((movie) => {
      //find the logged in users profile and pass to the show view then render profile show view
      Profile.findById(req.user.profile)
      .then(userProfile => {
        res.render("profiles/show", {
          title: `${profile.name}'s profile`,
          profile,
          userProfile,
          movie
        })
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

function index(req, res){
  //find all profiles and pass them to profile show view
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      title: "FoF profiles",
      profiles
    })
  })
}