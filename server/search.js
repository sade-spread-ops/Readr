const axios = require('axios');

const searchByBooks = (title) => {
  const options = {
    url: `http://openlibrary.org/search.json?title=${title}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      limit: 10,
    },
  };
  return axios(options);
};

const getBookCover = (isbn) => {
  const options = {
    url: `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios(options);
};

module.exports.searchByBooks = searchByBooks;
module.exports.getBookCover = getBookCover;
