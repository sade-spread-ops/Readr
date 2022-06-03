import React, { useState, useEffect } from 'react';
import AudioBookView from './AudioBookView';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@material-ui/core';
import axios from 'axios';
const AudioBook = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const getAllAudioBooks = () => {
    axios.get('/api/audiobooks').then(({data}) => {
      setAudiobooks(data.books);
    }).catch(error => console.error(error));
  };
  return (
    <div className='audio-book'>
      <Typography variant='h5'>Audio Books</Typography>
      <Button onClick={getAllAudioBooks} variant="contained" id="outlined-basic" color="primary">Get Audio Books</Button>
      <AudioBookView audiobooks={audiobooks} />
    </div>
  );
};

export default AudioBook;