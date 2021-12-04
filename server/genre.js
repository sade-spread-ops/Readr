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
  // let isbnNumber;
  // let title = '';
  // let author = '';
  let i = 0;
    return axios.get(`http://openlibrary.org/subjects/${genre}.json`)
      .then(({data}) => {
        // console.log(data.works[i].availability.isbn);
        while (data.works[i].availability.isbn === null) {
          i++;
        }
        return {
        isbnNumber: data.works[i].availability.isbn,
        title: data.works[i].title,
        author: data.works[i].authors[0].name
        };
        // console.log(isbnNumber);
        // console.log(title);
        // console.log(author);
      })
      // .then(() => {
      //     grabBookCover(isbnNumber);
      // })
      .catch((error) => {
        console.log(error);
      });
  };


module.exports.grabBooksByGenre = grabBooksByGenre;
module.exports.grabBookCover = grabBookCover;
