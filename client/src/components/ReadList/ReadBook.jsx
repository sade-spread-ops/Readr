import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import WriteReview from '../BookReviews/WriteReview.jsx';

const ReadBook = (props) => {
  const { readBook, user } = props;
  const [writeReviewRevealed, setWriteReviewRevealed] = useState(false);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    Axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: `${readBook.title} ${readBook.author}`
      }
    })
      .then((bookData) => {
        readBook.coverURL = bookData.data.items[0].volumeInfo.imageLinks.thumbnail || null;
        setImageURL(readBook.coverURL);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hideOrRevealReviewOption = () => {
    setWriteReviewRevealed(!writeReviewRevealed);
  };


  return (
    <Grid item xs={4}>
      <Card sx={{
        padding: 3,
      }}>
        <Typography component="h2" variant="h6">
          {readBook.title}
        </Typography>
        <Typography component="h4" variant="subtitle1" color="text.secondary">
          by {readBook.author}          
        </Typography>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginY: 3
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 150,
            }}
            image={imageURL} 
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
              hideOrRevealReviewOption();
            }}
          >
            Write a Review/Cancel
          </Button>
        </Box>
        {writeReviewRevealed && <WriteReview readBook={readBook} user={user}/>}
      </Card>
    </Grid>
  );
};

export default ReadBook;
