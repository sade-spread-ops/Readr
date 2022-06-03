const router = require('express').Router();
const axios = require('axios');
const FilmReviews = require('../sequelize/index.js');
require('dotenv').config();
const { NYTAPI } = process.env;




//CREATE ROUTE THAT ALLOWS USER TO SEE SOME AVALABLE REVIEWS ON THE PAGE. THE REVIEWS WILL BE PRESENT ON THE PAGE WHEN THE USER LOADS IT. 
//THEN I GUESS IT WILL JUST RENDER WHATEVER REVIEW THEY SEARCH FOR

router.get('/', (req, res) => {
  //console.log(req.body, 'body here');//{}
  console.log(req, 'req on 15'); //params {}
  //console.log(NYTAPI);
  res.send('hello');
  // FilmReviews.findAll({where: 
  //   {
  //     displayTitle: req.body.displayTitle
  //   }
  // })
  //   .then((data) => {
  //     res.status(200);
  //   })
  //   .catch((err) => {
  //     res.status(500);
  //   });
});


//CREATE ROUTE THAT ALLOWS USER TO SEARCH FOR FILM REVIEW
router.get('/', (req, res) => {


});

//CREATE ROUTE THAT ALLOWS USER TO SAVE/BOOKMARK FILM REVIEWS (Remember to create button in the front end that will do this too);
//use findOrCreate
router.post('/', (req, res) => {

});


//ALLOW USER TO DELETE SAVED FILM REVIEW FROM SAVED/BOOKMARKED REVIEWS
router.delete('/', (req, res) => {
  // FilmReviews.destroy({})
  //   .then(() => {

  //   })
  //   .catch(() => {

  //   });
});



module.exports = router;