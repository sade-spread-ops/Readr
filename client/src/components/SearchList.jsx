/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SearchList({ bookData, handleYesClick }) {
  // console.log(handleYesClick, 'YES');
  return (
    <div>
      {
        bookData.map((book) => {
          // const isbnNum = book.isbn;
          // console.log(book.isbn[0]);
          console.log(book.title, book.isbn);
          return (
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                // image={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`}
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
                    <Button size="small" variant="contained" color="success">Want to read</Button>
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
