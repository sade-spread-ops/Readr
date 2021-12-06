/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
// import { Form, Button } from 'react-bootstrap';
// import SearchBar from 'material-ui-search-bar';

const SearchForm = (props) => {
  const [searchVal, setSearchVal] = useState('');

  const handleChange = (event) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
  };

  const handleClick = (event) => {
    // console.log('click');
    event.preventDefault();
    const { handleSearch } = props;
    handleSearch(searchVal);
    setSearchVal('');
  };
  
  return (
    <div>
      <div>
        <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Book" variant="outlined" size="small" />
        <Button onClick={handleClick} variant="contained" id="outlined-basic" color="success">Search</Button>
      </div>
    </div>
  );
};

export default SearchForm;
