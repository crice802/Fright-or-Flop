import { Profile } from "../models/profile.js"
import { Movie } from "../models/movie.js"
import { Review } from '../models/review.js'
 
export {
  index,
}

function index(req, res) {
  //find all movies then sort them in reverse/limit results to display newest and populate who collectedBy and pass movies to view
  Movie.find({})
  .sort({_id: -1})
  .limit(6)
  .populate('collectedBy')
  .then(movies => {
    //find all profiles then sort/limit results to display newest users then pass profiles to index view
    Profile.find({})
    .sort({_id: -1})
    .limit(5)
    .then(profiles => {
      //find all reviews then sort/limit results to display newest users and populate movie/authors then pass Movie author to index view
      Review.find({})
      .sort({_id: -1})
      .limit(6)
      .populate('movie')
      .populate('author')
      .then(reviews => {
          res.render('index', {
            title: 'Latest Activity',
            movies,
            profiles,
            reviews,
          })
        })
      })
    })
  }

