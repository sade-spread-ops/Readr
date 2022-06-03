import React, { useState, useEffect } from 'react';
import AudioBookView from './AudioBookView';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@material-ui/core';
import { MenuItem } from '@mui/material';
import axios from 'axios';
const AudioBook = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const getAllAudioBooks = () => {
    axios.get('/api/audiobooks').then(({data}) => {
      setAudiobooks(data.books);
    }).catch(error => console.error(error));
  };
 
  const sortBy = (option) => {
    if (option === 'title') {
      const sortByTitle = [...audiobooks].sort((a, b) => (a.title.localeCompare(b.title)));
      setAudiobooks(sortByTitle);
    } 
    if (option === 'author') {
      const sortByAuthor = [...audiobooks].sort((a, b) => (a.authors[0].last_name.localeCompare(b.authors[0].last_name)));
      setAudiobooks(sortByAuthor);
    }
    if (option === 'time') {
      const sortByTime = [...audiobooks].sort((a, b) => (a.totaltimesecs - b.totaltimesecs));
      console.log(sortByTime, '***********************');
      setAudiobooks(sortByTime);
    } 
  };  
  return (
    <div className='audio-book'>
      <Typography variant='h5'>Free Audio Books</Typography>
      <div className='audio-book-button'>
        <Button onClick={getAllAudioBooks} variant="contained" id="outlined-basic" color="primary">Get Audio Books</Button>
      </div>
      <div className='audio-book-sort'>
        <TextField
          id="sort-by"
          select 
          label="Sort By"
          value={''}
          onChange={(e) => sortBy(e.target.value)}
          helperText="Please select an option"
          margin="normal"
        > 
          <MenuItem value='title'>Title</MenuItem>
          <MenuItem value='author'>Author</MenuItem>
          <MenuItem value='time'>Time</MenuItem>
        </TextField>
      </div>
      <div className='audio-book-view'>
        <AudioBookView audiobooks={audiobooks} sortBy={sortBy}/>
      </div>      
    </div>
  );
};

export default AudioBook;