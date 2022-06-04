const router = require('express').Router();
const axios = require('axios');
const FilmReviews = require('../sequelize/index.js');
require('dotenv').config();
const { NYTAPI } = process.env;

//console.log(NYTAPI);



//CREATE ROUTE THAT ALLOWS USER TO SEE SOME AVALABLE REVIEWS ON THE PAGE. THE REVIEWS WILL BE PRESENT ON THE PAGE WHEN THE USER LOADS IT. 
//THEN I GUESS IT WILL JUST RENDER WHATEVER REVIEW THEY SEARCH FOR


//is this route supposed to be retrieving a specific article through the query?
router.get('/', (req, res) => {
  //console.log(req.body, 'body here');//{}
  //console.log(req, 'req on 15'); //params {}
  const title = req.query.title;
  //Don't use a database call yet because it's empty and doesn't know the information
  //console.log('squirrel', req.query);
  //axios.get('http://localhost:3000/')
  console.log('title')
  console.log(title)
  axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${title}&api-key=${NYTAPI}`)
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    }); 
});


//CREATE ROUTE THAT ALLOWS USER TO SAVE/BOOKMARK FILM REVIEWS (Remember to create button in the front end that will do this too);
//use findOrCreate
router.post('/', (req, res) => {
  // const title = req.query.title;
  // axios.get('/', (request, response) => {
  //   FilmReviews.findOrCreate({ where: {

  //   }
  //   }).then(()=> {

  //   }).catch(() => {

  //   });
  // })
  // // FilmReviews.findOrCreate({where: {
  // //   headline: req.something.headline
  // //  }
  // // })
  // .then(() => {

  // })
  // .catch(() => {

  // })
});
//CREATE ROUTE THAT ALLOWS USER TO Delete FOR specific FILM REVIEW




//ALLOW USER TO DELETE SAVED FILM REVIEW FROM SAVED/BOOKMARKED REVIEWS
router.delete('/', (req, res) => {
  // FilmReviews.destroy({})
  //   .then(() => {

  //   })
  //   .catch(() => {

  //   });
});



module.exports = router;