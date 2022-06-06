import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import FilmReviews from './FilmReviews';


const Review = (props) => {
  //review will be set to the data coming from backend. May not be an object but setting it to an object for now
  const [savedReviews, setSavedReview] = useState([]);
  const [reviewRevealed, setReviewRevealed] = useState(false);

  const revealReview = () => {
    setSavedReview(!savedReviews);
  };

  useEffect(() => {
    console.log(props);
    axios.post('/api/filmReviews', { 
      params: {

      }
    })
      .then((results) => {
        setSavedReview(results.data);
      });
  });

  const getSavedReview = (review) => {
    console.log('review');
    console.log(review);
    axios.post('/api/filmReviews', FilmReviews).then((response) => {
      //console.log(response);
      {response.data}
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteReview = (review) => {
    axios.delete('/api/filmReviews', {
      /////////
    }).then((response) => {
      setSavedReview();//////
    })
      .catch((error) => {
        console.log(error);
      });
  };
 



  return (
    <div>
      <Container sx={{marginY: 5}}>
        <Grid container spacing={5}>
          {savedReviews.map((review => 
            <Review review={review} getSavedReview={getSavedReview} deleteMessage={deleteMessage}/>))}
        </Grid>
      </Container>
    </div>
  );
};


export default Review;
