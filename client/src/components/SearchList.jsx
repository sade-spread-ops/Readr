/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
// import React from 'react';

// const SearchList = ({ bookData }) => {
//   // console.log('BOOK', bookData);
//   return (
//     <div>
//       {
//         bookData.map((book) => (
//           console.log(book)
//         ))
//       }
//     </div>
//   );
// };

// export default SearchList;

// import * as React from 'react';
// import { Table } from '@mui/material';
// import { TableBody } from '@mui/material';
// import { TableCell } from '@mui/material';
// import { TableContainer } from '@mui/material';
// import { TableHead } from '@mui/material';
// import { TableRow } from '@mui/material';
// import { Paper } from '@mui/material';

// function createData(name, calories, fat, carbs, protein) {
//   return {
//     name, calories, fat, carbs, protein,
//   };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function SearchList({ bookData }) {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         {/* <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead> */}
//         <TableBody>
//           {
//             bookData.map((book) => {
//               console.log(book);
//               return (
//                 <TableRow
//                   // key={book.name}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {book.title}
//                   </TableCell>
//                   {/* <TableCell align="right">{row.calories}</TableCell>
//                   <TableCell align="right">{row.fat}</TableCell>
//                   <TableCell align="right">{row.carbs}</TableCell>
//                   <TableCell align="right">{row.protein}</TableCell> */}
//                 </TableRow>
//               );
//             })
//           }
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@material-ui/core';
import Typography from '@mui/material/Typography';

export default function SearchList({ bookData }) {
  // console.log(bookData);
  return (
    <div>
      {
        bookData.map((book) => {
          // console.log(typeof book.isbn[0]);
          // const isbnNum = Number(book.isbn[0]);
          return (
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg`}
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
                  {/* <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton> */}
                </Box>
              </Box>
            </Card>
          );
        })
      }
    </div>
  );
}
