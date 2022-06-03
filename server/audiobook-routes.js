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
    res.sendStatus(201); 
  }).catch(err => {
    console.error(err);
    res.sendStatus(500);
  });

});

// axios.get('https://librivox.org/api/feed/audiobooks?format=json')
//   .then(({data}) => console.log(data.books, '******'))
//   .catch(error => console.log(error));

// console.log(getAudioBooks());

module.exports = router;
