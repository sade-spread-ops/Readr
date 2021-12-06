/* eslint-disable react/jsx-indent */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm.jsx';
import SearchList from './SearchList.jsx';

const Search = ({ user }) => {

  const [bookData, setBookData] = useState([]);

  const handleSearch = (title) => {
    console.log(`${title} was searched`);
    axios.get(`/readr/books/?title=${title}`)
      .then(({ data }) => {
        // console.log(data, 'DATA');
        setBookData(data);
      }).catch((err) => console.error('Err'));
  };
  // const isbn = bookData.map((book) => {
  //   return book.isbn[0];
  // });

  // const addToList = (isInterested) => {
  //   axios.post('/readr/interest', {
  //     userID: user.id,
  //     isbn: isbn[0],
  //     toRead: isInterested,
  //   })
  //     .then((data) => console.log(data, 'Success'))
  //     .catch((err) => console.error(err));
  // };

  // console.log(isbn , user.id);
  // useEffect(() => {
  //   handleSearch();
  //   // addToList();
  // }, []);

  return (
  <div>
    <h1>Search</h1>
    <SearchForm handleSearch={handleSearch} />
    <SearchList bookData={bookData} user={user} />
  </div>
  );
};

export default Search;
