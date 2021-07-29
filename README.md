# **Fright or Flop: <br>Creepy Critiques**

Search and review your favorite scary movies .  Follow other users and see what movies they have watched and reviewed

## why?
I have always loved spooky and scary movies. I grew up in Venice, CA. down the street from the [Roger Corman](https://en.wikipedia.org/wiki/Roger_Corman) Studios. I loved watching the old cheesy movies growing up. I Would love to have a place where fellow horror fans can rate and review thier favorite movies
# **Getting Started:**
[Fright or Flop] (https://fright-or-flop.herokuapp.com/)<br>
[Trello Board] (https://trello.com/b/ZQETLkkC/frigh-or-flop-creepy-crtiques)
![TB](public/images/Screen%20Shot%202021-07-29%20at%203.42.52%20PM.png)

# **Screenshots:**
**Desktop:**
![desktop](/public/images/desktop1.png)

![desktop](/public/images/desktop2.png)

![desktop](/public/images/desktop3.png)

**Mobile:**
![mobile](/public/images/mobile1.JPG)

![mobile](/public/images/mobile2.JPG)

![mobile](/public/images/mobile3.JPG)

# **Technologies Used:**
**TheMovieDatabaseAPI:**<br>![TMDB](public/images/Tmdblogo.png)<br>**Javascript:**<br>![JS](public/images/JSlogo.png)<br>**Node.js:**<br>![Node](/public/images/nodeLogo.png) <br>**Express:**<br>![Express](public/images/expresslogo.jpeg)<br>**Mongoose:**<br>![Mongoose](public/images/mongooseLogo.png)<br>**MongoDB:**<br>![mongooDB](public/images/mongoDBlogo.png)<br>**Bootstrap:**<br>![BootStrap](public/images/Bootstrap_logo.svg.png) <br>**EJS:**<br>![ejs](public/images/ejsLogo.png)<br>**Google Oauth:**<br>![google](public/images/GOauth.jpeg)<br>**Passport:**<br>![passport](public/images/passportLogo.png)<br>**Postman:**<br>![postman](public/images/postmanlogo.png)<br>**Trello Board**<br>![trello](public/images/trellologo.png)

# **Next steps:** [icebox] 
- [x] show for loggin user recent updates in app.
- [x] mobile responsive
- [ ] Movie Watch List
- [ ] Show overall score based on avg ratings

# **Code Sample:**
Controller Function:
```javascript
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
    .then((movie) => {
      console.log(movie)
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
```
Views:
```html
<%- include('../partials/html-head') %>
<%- include('../partials/nav') %>



<main>
  <section class="bg-dark text-secondary px-4">
    <h1 class="display-5 fw-bold text-white pt-2 text-center">
      <%= apiResult.title %>
    </h1>
    <div class="container py-4">
      <img 
        width="100%" 
        src="https://image.tmdb.org/t/p/w500/<%= apiResult.poster_path %>" 
        alt="<%= apiResult.title %>'s background image"
      >
      <div class="accordion" id="accordion">
        <div class="accordion-item bg-dark">
          <h2 class="accordion-header" id="headingOne">
            <button 
              class="accordion-button bg-dark text-light" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseOne" 
              aria-expanded="true" 
              aria-controls="collapseOne"
            >
              Movie Description
            </button>
          </h2>
          <div 
            id="collapseOne" 
            class="accordion-collapse collapse" 
            aria-labelledby="headingOne" 
            data-bs-parent="#accordion"
          >
            <div class="accordion-body">
              <p class="mt-4"><%= apiResult.overview %></p>
            </div>
          </div>
        </div>
      </div>
      <p class="mt-4 fs-4 text-light">Released: <%= apiResult.release_date %></p>
      <%# This is where we'll list the profiles who have collected the movie %> 
      <div class="accordion" id="accordion">
        <div class="accordion-item bg-dark">
          <h2 class="accordion-header" id="headingTwo">
            <button 
              class="accordion-button bg-dark text-light" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseTwo" 
              aria-expanded="true" 
              aria-controls="collapseTwo"
            >
            This movie appears in <%= movie?.collectedBy.length %> FoF user collections:
          </button>
        </h2>
        <div 
          id="collapseTwo" 
          class="accordion-collapse collapse" 
          aria-labelledby="headingTwo" 
          data-bs-parent="#accordion"
        >
          <div class="accordion-body">
            <% movie?.collectedBy.forEach(profile => { %>
              <a href="/profiles/<%= profile._id %>" class="text-white">
                <p>
                  <img 
                    src="<%= profile.avatar %>" 
                    alt="<%= profile.name %>'s avatar"
                    class="me-3 rounded-circle"
                    width="50px"
                    height="50px"
                  >
                  <%= profile.name %>
                </p>
              </a>
            <% }) %>
          </div>
        </div>
      </div>
    </div>
    </div>
    <%# This is where we'll display a button to add/remove the movie from your collection %> 
    <%# if movie isnt collected by anyone create it with a form and post %> 
    <% if (!movie?.collectedBy.some(profile => profile._id.equals(user.profile._id))) { %> 
      <form
        class="text-center"
        action="/movies/<%= apiResult.id %>/addToCollection"
        method="POST"
      >
        <input type="text" name="title" hidden value="<%= apiResult.title %>">  
        <input type="text" name="movId" hidden value="<%= apiResult.id %>">
        <input
          type="text"
          name="poster_path"
          hidden 
          value="https://image.tmdb.org/t/p/w500/<%= apiResult.poster_path %>"
        >
        <input
        type="text" 
        name="released" 
        hidden 
        value="<%= apiResult.release_date %>"
      >
      <button class="btn btn-primary">
        Add To Collection
      </button> 
    </form>
    <% } %> 
  <% if (movie?.collectedBy.some(profile => profile._id.equals(user.profile._id))) { %>
    <form 
      class="text-center" 
      action="/movies/<%= apiResult.id %>/removeFromCollection?_method=DELETE" 
      method="POST"
      >
      <button class="btn btn-danger">
        Remove From Collection
      </button>
    </form>
  <% } %>

    <div class="container">
      <%# This is where we'll display a form to add a review once the movie is added to your collection %> 
      <% if (!movie?.reviews.some(review => review.author.equals(user.profile._id)) && movie?.collectedBy.some(profile => profile._id.equals(user.profile._id))) { %> 
        <form action="/reviews/<%= movie._id %>" method="POST">
          <div class="mb-3 mt-4">
            <label 
              for="exampleFormControlTextarea1" 
              class="form-label text-light"
            >
              Leave a review:
            </label>
            <textarea 
              name="content" 
              class="form-control" 
              id="exampleFormControlTextarea1" 
              rows="3"
            ></textarea>
            <select 
              name="rating" 
              class="form-select" 
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>        
          </div>
          <button class="btn btn-warning"type="submit">Add Review</button>
        </form> 
      <% } %>
      <%# This is where we'll display all the reviews for a movies %> 
      <% if (movie?.reviews.length) { %> 
          <h2 class="text-light my-3">Reviews:</h2>
          <div 
            class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g1 px-4"
          >
          <% movie.reviews.forEach(review => { %>
            <div class="col">
              <div class="card mb-3 bg-secondary">
                <div class="row g-0">
  
                  <div class="col-3">
                    <img 
                      src="<%= review.author.avatar %>" 
                      class="img-fluid rounded-circle ms-2 mt-2" 
                      alt="<%= review.author.name %>'s avatar"
                    >
                  </div>
                  <div class="col-9">
                    <div class="card-body">
                      <h3 class="card-title text-dark">
                        <a 
                          class="text-dark text-decoration-none" 
                          href="/profiles/<%= review.author._id %>"
                        >
                          <%= review.author.name %>
                        </a>
                      </h3>
                      <p class="card-text text-dark">
                        <%= "🌟".repeat(review.rating) %>
                      </p>
                      <p class="card-text text-dark"><%= review.content %></p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          <% }) %>
          </div>
        <% } %>
    </div>
  </section>
</main>

<%- include('../partials/footer') %>
```
Router:
```javascript
import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'

export {
  router
}

const router = Router()

router.get('/:id', isLoggedIn, moviesCtrl.show)
router.post('/search', isLoggedIn, moviesCtrl.search)
router.post("/:id/addToCollection", isLoggedIn, moviesCtrl.addToCollection)
router.delete("/:id/removeFromCollection", isLoggedIn, moviesCtrl.removeFromCollection)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
```
Model:
```javascript
import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Movie,
}

const movieSchema = new Schema({
  title: String,
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
```
# **API Reference:**
[TheMovieDatabaseAPI] (https://developers.themoviedb.org/3/getting-started/introduction)

# **Credits:**
The Movie Database:<br> for the API<br>
![https://www.themoviedb.org/](public/images/Tmdblogo.png)

@Ben Manley instructor for GA:<br>Guidance support and mentoring
![GeneralAssembly](public/images/GA.png)

Aftin Combs:<br> for the loving support<br>
Ken from Sanctified:<br> for help on the great name.