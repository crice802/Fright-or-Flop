import { Movie } from "../models/movie.js";
import { Review } from "../models/review.js";

export {  create }

function create(req, res) {
  req.body.author = req.user.profile._id
  req.body.movie = req.params.id
  Review.create(req.body)
  .then((review) => {
    Movie.findById(req.params.id)
    .then ((movie) => {
      movie.reviews.push(review._id)
      movie.save()
      .then (()=> {
        res.resdirect(`/movies/${movie.movId}`)
      })
    })
  })
}