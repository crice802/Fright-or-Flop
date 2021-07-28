import { Profile } from "../models/profile.js"
import { Movie } from "../models/movie.js"
import { Review } from '../models/review.js'
 
export {
  index,
}

function index(req, res) {
  Movie.find({})
  .sort({_id: -1})
  .limit(6)
  .populate('collectedBy')
  .then(movies => {
    Profile.find({})
    .sort({_id: -1})
    .limit(5)
    .then(profiles => {
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

