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
      }).catch((err) => console.error(err));
  };
  return (
    <div>
      <h1>Search</h1>
      <SearchForm handleSearch={handleSearch} />
      <SearchList bookData={bookData} user={user} />
    </div>
  );
};

export default Search;
