import * as React from 'react';
import SearchResult from './SearchResult.jsx';

import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SearchList = ({ bookData, user }) => {
  return (
    <div>
      {bookData.map((book) => <SearchResult bookData={bookData} book={book} user={user} />)}
    </div>
  );
};

export default SearchList;
