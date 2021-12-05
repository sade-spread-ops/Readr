/* eslint-disable */
const axios = require('axios');

const grabBookCover = (isbnNumber) => {
  axios.get(`https://covers.openlibrary.org/b/isbn/${isbnNumber}-M.jpg`)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
}

const grabBooksByGenre = (genre) => {
    return axios.get(`http://openlibrary.org/subjects/${genre}.json`)
      .then(({data}) => {
        for(let i = 0; i < data.works.length; i++) {
            if (data.works[i].availability.isbn !== null) {
              return {
                isbnNumber: data.works[i].availability.isbn,
                title: data.works[i].title,
                author: data.works[i].authors[0].name
                };
            }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createBook = (request, response) => {
    const {isbnNumber, title, author} = request.body;
    pool.query('INSERT INTO readr (isbn, title, author) VALUES ($1, $2, $3)', [isbnNumber, title, author], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Book added with ID: ${results.insertId}`);
    });
  }


module.exports.grabBooksByGenre = grabBooksByGenre;
module.exports.grabBookCover = grabBookCover;
