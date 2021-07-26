import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Movie,
}

const movieSchema = new Schema({
  name: String,
  movId: Number,
  original_title: String,
  poster_path: String,
  backdrop_path: String || null,
  release_date: Date,
  production_companies: {
    name: String,
    logo_path: String || null,
    origin_country: String
  },
  collectedBy:[{ type: Schema.Types.ObjectId, ref: "Profile" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
}, {
  timestamps: true
})

const Movie = mongoose.model("Movie", movieSchema)