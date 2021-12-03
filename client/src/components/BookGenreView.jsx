/* eslint-disable */
import React from 'react';

function BookGenreView() {

  const getBookInfo  = (genre) => {
    Axios.post(`/readr/genre/${genre}`)
      .then(({ data }) => {
      })
      .catch((error) => {
        window.alert('Book not found!');
        console.error(error);
      });
  };

  // const getBookInfoComedy  = () => {
  //   Axios.post('/readr/genre/comedy')
  //     .then(({ data }) => {
  //     })
  //     .catch((error) => {
  //       window.alert('Book not found!');
  //       console.error(error);
  //     });
  // };

  // const getBookInfoFiction  = () => {
  //   Axios.post('/readr/genre/fiction')
  //     .then(({ data }) => {
  //     })
  //     .catch((error) => {
  //       window.alert('Book not found!');
  //       console.error(error);
  //     });
  // };

  // const getBookInfoMystery  = () => {
  //   Axios.post('/readr/genre/mystery')
  //     .then(({ data }) => {
  //     })
  //     .catch((error) => {
  //       window.alert('Book not found!');
  //       console.error(error);
  //     });
  // };

  // const getBookInfoPoetry  = () => {
  //   Axios.post('/readr/genre/poetry')
  //     .then(({ data }) => {
  //     })
  //     .catch((error) => {
  //       window.alert('Book not found!');
  //       console.error(error);
  //     });
  // };

  // const getBookInfoDrama  = () => {
  //   Axios.post('/readr/genre/drama')
  //     .then(({ data }) => {
  //     })
  //     .catch((error) => {
  //       window.alert('Book not found!');
  //       console.error(error);
  //     });
  // };

  // const getBookInfoRecipe  = () => {
  //   Axios.post('/readr/genre/recipe')
  //     .then(({ data }) => {
  //     })
  //     .catch((error) => {
  //       window.alert('Book not found!');
  //       console.error(error);
  //     });
  // };

  // const getBookInfoFantasy  = () => {
  //   Axios.post('/readr/genre/fantasy')
  //     .then(({ data }) => {
  //     })
  //     .catch((error) => {
  //       window.alert('Book not found!');
  //       console.error(error);
  //     });
  // };

  return (
    <div>
      
      <div>Title: </div>
      <div>Author: </div>
    </div>
  )
}

export default BookGenreView;