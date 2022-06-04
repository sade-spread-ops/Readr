import React, { useState, useEffect } from 'react';
import AudioBookView from './AudioBookView';
import Button from '@mui/material/Button';
import { TextField, Typography, Switch } from '@material-ui/core';
import { MenuItem } from '@mui/material';
// import { Checkbox } from '@material-ui/core';
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
      setAudiobooks(sortByTime);
    } 
  };  
  // create a function to reverse order of books based on the sortBy function
  const reverseSortBy = () => {
    const reverseSort = [...audiobooks].reverse();
    setAudiobooks(reverseSort);
  };
  

  const getAudiobooksByTitle = (title) => {
    axios.get(`/api/audiobooks/title/${title}`).then(({data}) => {
      setAudiobooks(data.books);
    }).catch(error => console.error(error));
  };





  const sortingOptions = [{value: 'title', label: 'Title'}, {value: 'author', label: 'Author'}, {value: 'time', label: 'Time'}];
  const [sortingOption, setSortingOption] = useState('');
  const handleSortingOptionChange = (event) => {
    setSortingOption(event.target.value);
    sortBy(event.target.value);
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
          value={sortingOption}
          onChange={handleSortingOptionChange}
          helperText="Please select an option"
          margin="normal"
        > 
          {sortingOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {/* create a Switch using material ui to toggle reverseSortBy function */}
      <div className='audio-book-reverse-sort'>
        <Switch
          onChange={() => reverseSortBy(audiobooks)}
          value='reverse'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
      





      <div className='audio-book-view'>
        <AudioBookView audiobooks={audiobooks} sortBy={sortBy}/>
      </div>      
    </div>
  );
};

export default AudioBook;