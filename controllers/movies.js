import { Movie } from "../models/movie.js";
import { Review } from "../models/review.js";

import axios from "axios";
import { response } from "express";

export {
  search,
  show,
  addToCollection,
  removeFromCollection,

}

function addToCollection(req, res) {
  //searching if collected by has user profile
  req.body.collectedBy = req.user.profile._id
  //find the movie by id
  Movie.findOne({ movId: req.params.id })
  .then((movie) => {
    //if movie has been has been collected by user add user to info to collectedBy array 
    if (movie) {
      movie.collectedBy.push(req.use.profile._id)
      movie.save()
      .then(() => {
        res.redirect(`movies/${ req.params.id }`)
      })
    } else {
      //if movie isnt in database create it
      Movie.create(req.body)
      .then(() => {
        res.redirect(`/movies/${ req.params.id }`)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function removeFromCollection(req, res) {
  // Find the movie in the database
  Movie.findOne({ movId: req.params.id })
  .then(movie => {
    // Remove the user's profile id from collectedBy
    movie.collectedBy.remove({ _id: req.user.profile._id })
    movie.save()
    .then(() => {
      res.redirect(`/movies/${ req.params.id }`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  axios
  .get(`https://api.themoviedb.org/3/movie/${ req.params.id }?api_key=${ process.env.API_KEY }`)
  .then((response) => {
    Movie.findOne ({ movId: response.data.id})
    // this is where well populate colletedBy
    .populate('collectedBy')
    //this is where we will deep pop our reviews
    .populate({
      path: 'reviews',
      populate: {
        path: 'author'
      }
    })
    .then((movie) => {
      console.log(movie)
      res.render("movies/show", {
        title: "Movie Details",
        apiResult: response.data,
        movie: movie
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function search(req, res){
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${ process.env.API_KEY }&query=${ req.body.search }&page=1&with_genres=27`)
  .then(response =>{
    console.log(response.data.results)
    res.render('movies/new',{
      title: 'Search Results',
      results: response.data.results
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}