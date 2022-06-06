import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextareaAutosize } from '@mui/material';

const WriteReview = (props) => {

  const { readBook, user } = props;
  const [review, setReview] = useState('');

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const submitReview = () => {
    axios.post('/readr/reviews', {
      userID: user.id,
      title: readBook.title,
      author: readBook.author,
      review: review
    })
      .then(() => {
        console.log('Review Created');
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginY: 3
        }}
      >
        <TextareaAutosize
          minRows={5}
          placeholder="Write a review"
          onChange={(event) => handleChange(event)}
        />
      </Box>
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginY: 3
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => {
            submitReview();
          }}
        >
        Submit
        </Button>
      </Box>
    </div>
  );
};

export default WriteReview;