import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@material-ui/core';
import axios from 'axios';
const AudioBook = () => {

  const getAudioBooks = () => {
    // const options = {
    //   method: 'GET',
    //   url: '/audioBooks',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json;charset=UTF-8'
    //   },
    // };
    axios.get('https://librivox.org/api/feed/audiobooks?format=json').then((data) => {
      console.log(data, 'DATA');
    }).catch((error) => {
      console.log(error);
    });
  };
  
  return (
    <div className='audio-book'>
      <Typography variant='h5'>Audio Books</Typography>
      <Button onClick={getAudioBooks} variant="contained" id="outlined-basic" color="primary">Get Audio Books</Button>
    </div>
  );
};

export default AudioBook;