# Fright or Flop: <br>Creepy Critiques

Search and review your favorite scary movies .  Follow other users and see what movies they have watched and reviewed

## why?
I have always loved spooky and scary movies.  Would love to have a place where fellow horror fans can rate and review thier favorite movies
# Getting Started
[Fright or Flop] (https://fright-or-flop.herokuapp.com/)<br>
[Trello Board] (https://trello.com/b/ZQETLkkC/frigh-or-flop-creepy-crtiques)

# Screenshots


# Technologies Used
TheMovieDatabaseAPI, Javascript, Node.js, Express, Mongoose, Mongo DB, Bootstrap, EJS

# Next steps: [icebox] 
- [x] show for loggin user recent updates in app.
- [ ] Movie Watch List
- [ ] Show overall score based on avg ratings
- [ ] 
# Code Sample:
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
# API Reference
[TheMovieDatabaseAPI] (https://developers.themoviedb.org/3/getting-started/introduction)

# Credits