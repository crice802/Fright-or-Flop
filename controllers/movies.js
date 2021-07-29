import { Movie } from "../models/movie.js";
import { Review } from "../models/review.js";

import axios from "axios";
// import { response } from "express";

export {
  search,
  show,
  addToCollection,
  removeFromCollection,

}

function addToCollection(req, res) {
  // Add id of the logged in user to req.body for creating a movie for the first time (if it doesn't exist in the database)
  req.body.collectedBy = req.user.profile._id
    // Look to see if the movie already exists in the database
  Movie.findOne({ movId: req.params.id })
  .then((movie) => {
    // If it does, push the user's profile id to movie.collectedBy
    if (movie) {
      movie.collectedBy.push(req.user.profile._id)
      movie.save()
      .then(() => {
        res.redirect(`/movies/${req.params.id}`)
      })
    } else {
         // If it doesn't exist in the database, create it!
      Movie.create(req.body)
      .then(() => {
        res.redirect(`/movies/${req.params.id}`)
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
    Movie.findOne ({ movId: response.data.id })
    // this is where well populate colletedBy
    .populate('collectedBy')
    //this is where we will deep pop our reviews
    .populate({
      path: 'reviews',
      populate: {
        path: 'author'
      }
    })
    .then((movie) => {h
      res.render("movies/show", {
        title: "Movie Details",
        apiResult: response.data,
        movie
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function search(req, res){
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${ process.env.API_KEY }&query=${ req.body.search }&page=1`)
  .then(response =>{
    let filteredMovies = response.data.results.filter(movie => movie.genre_ids.includes(27))
    res.render('movies/new',{
      title: 'Search Results',
      results: filteredMovies
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}