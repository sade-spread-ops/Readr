import React, { useState, useEffect } from 'react';
//import Review from './Review.jsx';
import { Paper, Container, Grid, Typography, Box, Rating, TextField, Button } from '@mui/material';


const FilmReviews = (props) => {
  //setting review to an object for now. Data will depend on what is returned from backend
  // const [review, setFilmReview] = useState({});

  // useEffect(() => {

  // });
  //color for textfield // sx={{color: '#f44336'}}
  //padding and margin
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Container>
        <form noValidate autoComplete='off'>
          <TextField 
            label='Note Title'
            variant='outlined'
            
          />
        </form>

        <Button
          // onClick={() => console.log('you clicked me')}
          type='submit'
          variant='contained'
        >
          Submit
        </Button>
        
        <Grid container spacing={4} alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}>
          <Paper elevation={2} square>
            <br></br>
            <br></br>
            <br></br>
            <img 
              src="https://images-na.ssl-images-amazon.com/images/I/81KCnYSMMxL.jpg"
              alt=""
              className="reviewImg"
            />
            <Box paddingX={1}>
              <Typography variant="h4" component="h2">
              Static Title Here
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <p>Certainly not life changing or anything. The plot was hard to follow and the editing was horrible. 
                The characters were painfully one-dimensional and this Jesus guy delivered some of the worst dialogue I've ever read. 
                All in all, I found it way too long and that it took itself way too seriously. The fact that it sells so well is beyond me. 
                And the way people hold it up, you'd think God Himself wrote the damn thing. 
              </p>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}  
            >
              <Rating 
                name='read-only' value={1.5} readOnly precision={0.5}
              />
              <Typography variant='body2' component='p' marginLeft={0.5}>
                1.5
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Container>   
      {/* <Review /> */}
    </div>
  );
};

export default FilmReviews;
