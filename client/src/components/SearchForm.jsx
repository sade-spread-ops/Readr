/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchBar from 'material-ui-search-bar';

const SearchForm = (props) => {
  const [searchVal, setSearchVal] = useState('');

  const handleChange = (event) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
  };

  const handleClick = (event) => {
    console.log('click');
    const { handleSearch } = props;
    handleSearch(searchVal);
  };
  return (
    <div>
      <div>
        <input placeholder="Search Book" value={searchVal} onChange={handleChange} />
        <button onClick={handleClick} type="button">Search</button>
      </div>
    </div>
  );
};

export default SearchForm;

{ /* <div>
<SearchBar
  placeholder="Search books"
  value={searchVal}
  onChange={handleChange}
  onSubmit={handleSearch}
    // onRequestSearch={() => doSomethingWith(this.state.value)}
  />
</div> */ }
