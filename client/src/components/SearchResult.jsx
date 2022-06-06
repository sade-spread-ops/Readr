import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SettingsInputComponent, SettingsPowerRounded } from '@mui/icons-material';
import ReviewList from './BookReviews/ReviewList.jsx';

const SearchResult = (props) => {
  const { bookData, book, user } = props;

  // const isbn = bookData.map((book) => (book.isbn ? book.isbn[0] : null));

  const addToList = (book) => {
    // console.log(book, 'book');
    axios.post('/readr/interest', {
      userID: user.id,
      isbn: book.isbn[0],
      toRead: true,
    })
      .then((data) => console.log(data, 'Success'))
      .catch((err) => console.error(err));
  };

  const addNewBook = (book) => {
    axios.post('/readr/insertIntoBookDb', {
      isbn: book.isbn[0],
      title: book.title,
      author: book.author_name[0],
      description: null,
      coverURL: null,
      buyLink: null,
      genre: null,
      urlSnippet: null,
      availability: null,
    });
  };
  
  const [reviews, setReviews] = useState([]);

  const getReviews = (book) => {
    axios.get('/readr/reviews', {
      params: {
        title: book.title,
        author: book.author_name
      }
    })
      .then((results) => {
        // console.log(results, 'results on line 56 in SearchList.jsx');
        setReviews(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const [reviewListShown, setReviewListShown] = useState(false);

  const showReviewList = () => {
    setReviewListShown(!reviewListShown);
  };
  
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn[2]}-L.jpg` : 'https://covers.openlibrary.org/b/isbn/9780307386861-M.jpg'}
        alt="Book cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
                    by {book.author_name} -published {book.first_publish_year}
          </Typography>
        </CardContent>
        <Box sx={{
          display: 'flex', alignItems: 'center', pl: 1, pb: 1,
        }}
        >
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => {
                addNewBook(book);
                addToList(book);
              }}
            >Want to read
            </Button>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => {
                getReviews(book);
                showReviewList();
              }}
            >
                      Reviews
            </Button>
          </CardActions>
        </Box>
        {reviewListShown && <ReviewList reviews={reviews} />}
      </Box>
    </Card>
  );
};

export default SearchResult;