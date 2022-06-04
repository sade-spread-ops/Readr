import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material/Container';

// import {
//   Grid, Paper, Typography
// } from '@material-ui/core';

const Review = (props) => {
  //review will be set to the data coming from backend. May not be an object but setting it to an object for now
  
  // const [reviewRevealed, setReviewRevealed] = useState(false);//this will work with deleted reviews
  const [review, setReview] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:3000/filmReviews', {})
  // })  
 



  return (
    <div>
      <Container>
        <Grid>
          {/* {reviews.map((review) => <Review user={user} review={review} />)} */}
        </Grid>
      </Container>
    </div>
  );
};


export default Review;
