import { Movie } from "../models/movie.js";

import axios from "axios";
import { response } from "express";

export {
  search,

}

function search(req, res){
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${req.body.search}&page=10&with_genres=27`)
  .then(response =>{
    console.log(response)
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