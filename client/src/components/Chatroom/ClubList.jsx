import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ClubListItem from './ClubListItem.jsx';

const ClubList = ({ user }) => {
  const [fakeData, setData] = useState([{ book: 'One Hundred Years of Solitude', friends: ['Raymond', 'Sam', 'Ryan', 'Royce'], hangoutLink: 'https://hangouts.google.com/call/togytJk6UzTyS_nTVP3JACEE' }, { book: 'The Count of Monte Cristo', friends: ['Royce', 'Sam'], hangoutLink: 'nope' }]);
  useEffect(() => {
    const params = { user };
    console.log(params, 'useEffect in ClubList');
    Axios.get('/readr/getBookclubs', { params })
      .then(({data}) => {
        console.log(data, 'data returned from axios request');
        setData(data);
      });
  }, []);

  return (
    <div>
      <h3>
        Book Clubs
      </h3>
      {fakeData.map((club) => (
        <div>
          <ClubListItem club={club} />
        </div>
      ))}
    </div>
  );
};

export default ClubList;
