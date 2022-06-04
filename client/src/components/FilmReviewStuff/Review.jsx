import React from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';

import {
  Grid, Paper, Typography
} from '@material-ui/core';

const Review = () => {
  //review will be set to the data coming from backend. May not be an object but setting it to an object for now
  const [review, setReview] = useState({});

  
  //this is where we'll use the axios routing will take place


  return (
    <div>
      <Container>
        <Grid>
          
        </Grid>
      </Container>
    </div>
  );
};


export default Review;


/*
return (
  <div>
      <Grid container spacing={5}>
        <Paper elevation={3}>
          
        </Paper>
      </Grid>
  </div>
)
*/