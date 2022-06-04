import React, { useState } from 'react';
//import Review from './Review.jsx';
import axios from 'axios';
import { Paper, Container, Grid, Typography, Box, Rating, TextField, Button } from '@mui/material';


const FilmReviews = (props) => {
  //setting review to an object for now. Data will depend on what is returned from backend
  const [filmReview, setFilmReview] = useState({});
  const [reviewRevealed, setReviewRevealed] = useState(false);
  const [title, setTitle] = useState('');

  const getFilmReview = (input) => {
    // TODO: have routes include /api/filmReviews
    // /filmReviews show this page but its also a call to the front end 
    //use relative enpoints!
    console.log('input')
    console.log(input)
    axios.get('http://localhost:3000/api/filmReviews', {params: { title: input }}).then((response) => {
      // console.log('response');
      console.log(response);
      /*
        TODO:
        a) in SERVER
            -make call to NYT api with param.title
            -RESPOND BACK with found item
        b) in HERE
            -store the response in the state
            -use conditionals in your views to show with proper attributes
      */
      //check if this is right
      setFilmReview(response.data.results[0]);///////////
    })
      .catch((err) => {
        console.log(err);
      });
  };

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
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>

        <Button
          onClick={() => getFilmReview(title)}
          //onClick={() => console.log({...props.params})}
          type='submit'
          variant='contained'
          
        >
          Submit
        </Button>
        <Button onClick={() => console.log(title, filmReview)}>
          props
        </Button>
        
        { Object.keys(filmReview).length && <Grid container spacing={4} alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}>
          <Paper elevation={2} square>
            <br></br>
            <br></br>
            <br></br>
            <img 
              src={filmReview.multimedia.src}
              alt=""
              className="reviewImg"
            />
            <Box paddingX={1}>
              <Typography variant="h4" component="h2">
              {filmReview.display_title}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}>
              {filmReview.summary_short}
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

            <Button
              // onClick={() => console.log('you clicked me')}
              type='submit'
              variant='contained'
            >
          Save Review
            </Button>
          </Paper>
        </Grid> }
      </Container>   
      {/* <Review /> */}
    </div>
  );
};

export default FilmReviews;
