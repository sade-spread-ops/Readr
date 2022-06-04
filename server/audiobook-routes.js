// const audio = require('express').Router();
const axios = require('axios');
const router = require('express').Router();
const dbHelpers = require('../sequelize/db-helpers');
const { Audiobook } = require('../sequelize/index');


const getAudioBooks = () => {
  const options = {
    method: 'get',
    url: 'https://librivox.org/api/feed/audiobooks?format=json',
    headers: {
      'User-Agent': 'request',
    },
  };
  return axios(options);
};
// create function to get audiobooks from librivox by title 
const getAudioBooksByTitle = (title) => {
  const options = {
    method: 'get',
    url: `https://librivox.org/api/feed/audiobooks?format=json&title=${title}`,
    headers: {
      'User-Agent': 'request',
      'Content-Type': 'application/json',
    },
  };
  return axios(options);
};
// create function to get audiobooks from librivox by author
const getAudioBooksByAuthor = (author) => { // <-- author last name
  const options = {
    method: 'get',
    url: `https://librivox.org/api/feed/audiobooks?format=json&author=${author}`, 
    headers: {
      'User-Agent': 'request',
    },
  };
  return axios(options);
};
// use express router to get audiobooks from librivox using title or author
router.get('/title', (req, res) => {
  console.log(req.query.title);
  console.log(req.query);
  getAudioBooksByTitle(req.query.title) //req.query.title
    .then((response) => {
      console.log(req.query);
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/author', (req, res) => {
  getAudioBooksByAuthor(req.query.author)
    .then((response) => {
      console.log(req.query);
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});







router.get('/', (req, res) => {
  getAudioBooks().then(({data}) => {
    res.status(200).send(data);
  }).catch(err => console.error(err));

});

router.post('/insert', (req, res) => {
  // console.log('req.body', req.body);
  Audiobook.create({
    audiobookID: req.body.audiobookID,
    title: req.body.title,
    author: req.body.author,
    onlineLink: req.body.onlineLink,
    downloadLink: req.body.downloadLink,
    timeSeconds: req.body.timeSeconds,
  }).then(data => {
    console.log('winner winner chicken dinner');
    res.status(201).send(data.dataValues);
    // res.sendStatus(201); 
  }).catch(err => {
    console.error(err);
    res.sendStatus(500);
  });

});

router.delete('/delete', (req, res) => {
  Audiobook.destroy({
    where: {
      audiobookID: req.body.audiobookID,
    },
  }).then(data => {
    console.log('successfully deleted');
    res.sendStatus(200);
  }
  ).catch(err => {
    console.error(err);
    res.sendStatus(500);
  }
  );
});

module.exports = router;
