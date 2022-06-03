const audio = require('express').Router();
const axios = require('axios');
const audiobooks = require('express').Router();

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

audiobooks.get('/', (req, res) => {
  getAudioBooks().then(({data}) => {
    res.status(200).send(data);
  }).catch(err => console.error(err));

});


// axios.get('https://librivox.org/api/feed/audiobooks?format=json')
//   .then(({data}) => console.log(data.books, '******'))
//   .catch(error => console.log(error));

// console.log(getAudioBooks());

module.exports = audiobooks;
