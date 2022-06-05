const router = require('express').Router();
const axios = require('axios');
const { FilmReviews } = require('../sequelize/index.js');
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
  //res.send('hello there');
  /*
    byline: "Lena Wilson"
    critics_pick: 1
    date_updated: "2022-06-02 11:03:02"
    display_title: "Watcher"
    headline: "‘Watcher’ Review: Terror, at a Glance"
    link: {type: 'article', url: 'https://www.nytimes.com/2022/06/02/movies/watcher-review.html', suggested_link_text: 'Read the New York Times Review of Watcher'}
    mpaa_rating: "R"
    multimedia: {type: 'mediumThreeByTwo210', src: 'https://static01.nyt.com/images/2022/06/03/arts/watcher1/watcher1-mediumThreeByTwo440.jpg', height: 140, width: 210}
    opening_date: "2022-06-03"
    publication_date: "2022-06-02"
    summary_short: "In C
*/
  console.log(req.body);
  review = req.body;

  const mappedFilmReview = {
    display_title: review.display_title,
    image_url: review.multimedia.src,
    link: review.link.url,
    rating: review.mpaa_rating,
    summary_short: review.summar_short
  }

  console.log(FilmReviews);
  console.log(typeof FilmReviews);

  FilmReviews.create(mappedFilmReview)
    .then((response) => {
      console.log(response);
      res.send(200);
    }).catch((err) => {
      console.log(err);
      res.send(500);
    });
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