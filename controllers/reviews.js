import { Movie } from "../models/movie.js";
import { Review } from "../models/review.js";

export {  create }

function create(req, res) {
  // Add author/game info to req.body (for when we use model.create)
  req.body.author = req.user.profile._id
  req.body.game = req.params.id
  // Create the review
  Review.create(req.body)
  .then(review => {
    // Add the review reference to the Game
    Movie.findById(req.params.id)
    .then(movie => {
      movie.reviews.push(review._id)
      movie.save()
      .then(() => {
        res.redirect(`/movies/${movie.movId}`)
      })
    })
  })
}