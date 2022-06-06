import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Axios from 'axios';

const Review = (props) => {
  const { userID, review } = props.review;
  const [reviewer, setReviewer] = useState('');

  useEffect(() => {
    Axios.get('/readr/users', {
      params: {
        userID: userID
      }
    })
      .then((result) => {
        setReviewer(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <Box sx={{
      padding: 3,
    }}>
      <Typography variant="h6" component="h2">
        Review by {reviewer.username}
      </Typography>
      <Typography variant="body1" component="body">
        {review}
      </Typography>
    </Box>
  );
};

export default Review;