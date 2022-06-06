import { PropaneSharp } from '@mui/icons-material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReadBook from './ReadBook.jsx';
import { Container, Grid } from '@mui/material';

const ReadList = (props) => {
  const { id } = props.user;
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    Axios.get('/readr/haveread', {
      params: {
        userID: id,
      },
    })
      .then(({ data }) => {
        setReadBooks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container sx={{
      marginY: 5
    }}>
      <Grid container spacing={5}>
        {readBooks.map((readBook) => <ReadBook readBook={readBook} user={props.user} />)}
      </Grid>
    </Container>
  );
};

export default ReadList;
