/* eslint-disable */
const axios = require('axios');

const grabBooksByGenre = (genre) => {
  let isbnNumber;
  let title = '';
  let author = '';
  let i = 0;
    return axios.get(`http://openlibrary.org/subjects/${genre}.json`)
      .then((data) => {
        while (data.works[i].availability.isbn === null) {
          i++;
        }
        isbnNumber = data.works[i].availability.isbn;
        title = data.works[i].title;
        author = data.works[i].authors[1].name;
        console.log(isbnNumber);
        console.log(title);
        console.log(author);
      }).catch((error) => {
        console.log(error);
      });
  };

const grabBookCover = (isbnNumber) => {
  axios.get(`https://covers.openlibrary.org/b/isbn/${isbnNumber}-M.jpg`)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
}

module.exports.grabBooksByGenre = grabBooksByGenre;
