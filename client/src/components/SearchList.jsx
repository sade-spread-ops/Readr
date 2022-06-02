import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SearchList({ bookData, user }) {
  // console.log(bookData);
  const isbn = bookData.map((book) => (book.isbn ? book.isbn[0] : null));

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
  return (
    <div>
      {
        bookData.map((book) => {
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
                  </CardActions>
                </Box>
              </Box>
            </Card>
          );
        })
      }
    </div>
  );
}
