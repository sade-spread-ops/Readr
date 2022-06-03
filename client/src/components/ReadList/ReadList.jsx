import { PropaneSharp } from '@mui/icons-material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReadBook from './ReadBook.jsx';

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
  }, []);

  return (
    <div>
      {readBooks.map((readBook) => <ReadBook readBook={readBook} />)}
    </div>
  );
};

export default ReadList;
