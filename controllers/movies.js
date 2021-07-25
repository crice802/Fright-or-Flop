import { Movie } from "../models/movie.js";

import axios from "axios";
import { response } from "express";

export {
  search,
  show,

}

function show(req, res) {
  axios
  .get(`https://api.themoviedb.org/3/movie/${ req.params.id }?api_key=${ process.env.API_KEY }`)
  .then((response) => {
    Movie.findOne ({ movId: response.data.id})
    // this is where well populate colletedBy
    //this is where we will deep pop our reviews
    .then((movie) => {
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
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${ process.env.API_KEY }&query=${ req.body.search }&page=10&with_genres=27`)
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