/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const SearchList = ({ bookData }) => {
  // console.log('BOOK', bookData);
  return (
    <div>
      {
        bookData.map((book) => (
          console.log(book)
        ))
      }
    </div>
  );
};

// class SearchList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       bookData: [],
//     };
//   }

//   componentDidMount() {
//     axios.get(`/readr/books/`)
//       .then((data) => {
//         console.log('DATA', data);
//       }).catch((err) => { console.error('SearchList Error'); });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Result</h1>
//       </div>
//     );
//   }
// }

export default SearchList;
