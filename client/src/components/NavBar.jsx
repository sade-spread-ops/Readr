/* This is the header or top bar component.  It is pretty static.
 * Includes navigatin.buttons- App logo Title  2..button to "To-Read" list,
 * 3. "Explore Books" (new book suggestion), 4. Logout button.
 */
/* eslint-disable */
import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Switch,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Link } from 'react-router-dom';
import WelcomeToast from './SnackBar.jsx';
import BigBar from './NavBarMenus/BigBar.jsx';
import SmallBar from './NavBarMenus/SmallBar.jsx';
import Dropdown from './Dropdown.jsx';
import axios from 'axios';
import { ContactsOutlined } from '@material-ui/icons';
import { useState } from 'react';
import Search from './SearchByBook.jsx';


// This allows custom styling of the buttons, over-riding the root theme
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
  },
  bigBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const NavBar = (props) => {

  const [checked, setChecked] = React.useState(props.themeGet());

  const classes = useStyles();
  const { username, id } = props.user;
  const firstName = username.split(' ')[0];

  const handleToggle = (event) => {
    setChecked(event.target.checked);
    props.setTheme(event.target.checked);
    props.themePatch(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <WelcomeToast message={`Hi ${username}!`} />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <MenuBookIcon />
          </IconButton>
          
          <Typography
            variant="h4"
            className={classes.title}
            component={Link}
            to="/suggestion"
          >
            Readr 2.0
          </Typography>
          <Switch className='toggleTheme' checked={checked} onChange={handleToggle}/>
          <div className={classes.bigBar}>
            <BigBar />
          </div>
          <SmallBar />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
