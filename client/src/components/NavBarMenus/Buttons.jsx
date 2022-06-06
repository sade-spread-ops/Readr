/* eslint-disable */
import React from 'react';
import {
  makeStyles,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown';

// This allows custom styling of the buttons, over-riding the root theme
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Buttons = () => {
  const classes = useStyles();
  return (
    <div>
      <Button
        size="large"
        component={Link}
        to="/books"
        className={classes.button}
      >
        Search Books
      </Button>
      {/* <Button
        size="large"
        component={Link}
        to="/genres"
        className={classes.button}
      >
        Genres
      </Button> */}
      <Button
        size="large"
        component={Link}
        to="/suggestion"
        className={classes.button}
      >
        Explore Books
      </Button>
      <Button
        size="large"
        component={Link}
        to="/booklist"
        className={classes.button}
      >
        Reading List
      </Button>
      <Button
        size="large"
        component={Link}
        to="/listofreadbooks"
        className={classes.button}
      >
        LIST OF READ BOOKS
      </Button>
      {/* <Button
        size="large"
        component={Link}
        to="/addFriend"
        className={classes.button}
      >
        Add Friends!
      </Button> */}
      {/* <Button
        size="large"
        component={Link}
        to="/profile"
        className={classes.button}
      >
        Profile
      </Button> */}
      {/* <Button
        size="large"
        component={Link}
        to="/bookclubinvite"
        className={classes.button}
      >
        Book Club
      </Button> */}
      <Button
        size="large"
        component={Link}
<<<<<<< HEAD
=======
        to="/filmReviews"
        className={classes.button}
      >
        Film Reviews
>>>>>>> 488c6f77240c218b25f080f2b01e62a0a97ee11b
        to="/audiobooks"
        className={classes.button}
      >
        Audio Books
      </Button>
      <Button
        size="large"
        component={Link}
<<<<<<< HEAD
        to="/filmReviews"
        className={classes.button}
      >
        Film Adaptation Reviews
=======
        to="/map"
        className={classes.button}
      >
        Map
>>>>>>> 488c6f77240c218b25f080f2b01e62a0a97ee11b
      </Button>
      <Button
        size="large"
        href="/auth/logout"
        className={classes.button}
      >
        Logout
      </Button>
    </div>
  );
};

export default Buttons;
