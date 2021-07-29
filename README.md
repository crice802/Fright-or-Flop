# Fright or Flop: <br>Creepy Critiques

Search and review your favorite scary movies .  Follow other users and see what movies they have watched and reviewed

## why?
I have always loved spooky and scary movies. I grew up in venice beach, down the street from the Roger Corman Studios. I Would love to have a place where fellow horror fans can rate and review thier favorite movies
# Getting Started
[Fright or Flop] (https://fright-or-flop.herokuapp.com/)<br>
[Trello Board] (https://trello.com/b/ZQETLkkC/frigh-or-flop-creepy-crtiques)

# Screenshots
![desktop](/public/images/desktop1.png)

![desktop](/public/images/desktop2.png)

![desktop](/public/images/desktop3.png)

![mobile](/public/images/mobile1.JPG)

![mobile](/public/images/mobile2.JPG)

![mobile](/public/images/mobile3.JPG)

# Technologies Used
TheMovieDatabaseAPI:<br>![TMDB](public/images/tmdb.svg) Javascript:<br>![JS](public/images/JSlogo.png)<br> Node.js:<br>![Node](/public/images/nodeLogo.png) <br>Express:<br>![Express](public/images/expresslogo.jpeg)<br> Mongoose:<br>![Mongoose](public/images/mongooseLogo.png)<br> MongoDB:<br>![mongooDB](public/images/mongoDBlogo.png)<br> Bootstrap:<br>![BootStrap](public/images/Bootstrap_logo.svg.png) <br>EJS:<br>![ejs](public/images/ejsLogo.png)<br>Google Oauth:<br>![google](public/images/GOauth.jpeg)<br>Passport:<br>![passport](public/images/passportLogo.png)

# Next steps: [icebox] 
- [x] show for loggin user recent updates in app.
- [x] mobile responsive
- [ ] Movie Watch List
- [ ] Show overall score based on avg ratings

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
The Movie Database:<br> for the API
![https://www.themoviedb.org/](public/images/tmdb.svg)

@Ben Manley instructor for GA:<br>Guidance support and mentoring
![GeneralAssembly](public/images/GA.png)

Aftin Combs:<br> for the loving support<br>
Ken from Sanctified:<br> for help on the great name.