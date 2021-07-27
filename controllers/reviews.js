import { Movie } from "../models/movie.js";
import { Review } from "../models/review.js";

export {  reviewCreate }

function reviewCreate(req, res) {
  // Add author/movie info to req.body (for when we use model.create)
  req.body.author = req.user.profile._id
  req.body.movie = req.params.id
 
  // Create the review
  Review.create(req.body)
  .then(review => {
    // Add the review reference to the movie
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