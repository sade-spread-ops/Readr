/* eslint-disable react/prop-types */
import React from 'react';
import SearchResult from './SearchResult.jsx';

const SearchList = ({ bookData, user }) => {
  return (
    <div>
      {bookData.map((book) => <SearchResult bookData={bookData} book={book} user={user} />)}
    </div>
  );
};

export default SearchList;
