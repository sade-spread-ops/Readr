
/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import SuggestionView from './SuggestionView.jsx';
import BookListView from './BookListView.jsx';
import ReaderView from './ReaderView.jsx';
import FollowingView from './FollowingView.jsx';
import Landing from './Landing.jsx';
import Preference from './Preference.jsx';
import ProfileView from './Profile/Views/ProfileView.jsx';
import AddFriend from './AddFriend.jsx';
import ClubList from './Chatroom/ClubList.jsx';
import BookClub from './BookClub/BookClub.jsx';
import Followers from './Followers.jsx';
import AudioBooks from './AudioBooks/AudioBooks.jsx';
import Map from './Map.jsx';
import Dropdown from './Dropdown.jsx';
import BookGenreView from './BookGenreView.jsx';
import Search from './SearchByBook.jsx';
import FilmReviews from './FilmReviewStuff/FilmReviews.jsx';
import ReadList from './ReadList/ReadList.jsx';


const themeLight = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
    },
    primary: { main: '#ff4400' },
    secondary: {
      background: '#0ffc03',
      theme: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
  },
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
    primary: { main: '#180830' },
    secondary: {
      background: '#09050f',
      light: '#0066ff',
      main: '#a18e18',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    typography: {
      allVariants: {
        color: "pink"
      },
    },
    text: {
      primary: '#a88132',
      secondary: '#a88132',
      disabled: '#a88132',
      hint: '#a88132',
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      urlSnippet: 'shakespearescom000shak',
      checked: false,
      currentTheme: themeLight,
    };
    this.updateUrlSnippet = this.updateUrlSnippet.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.themePatch = this.themePatch.bind(this);
    this.themeGet = this.themeGet.bind(this);
  }

  // Working on axios request here;

  /* Sends request to server to get a book suggestion from google books API.
  * If the book suggestion is already in the logged in user's
  * "yes" or "no" list, resend the getBookSuggestion request.
  * We could also do this server side, by getting the response and checking
  * the user's database. Send back the first item in the Query to Googls API
  * */
  themeGet(){
    if(this.state.user !== null){
      return Boolean(this.state.user.theme);
    }
    return false;
  }

  setTheme(theme){
    if(theme === true){
      this.setState({currentTheme: themeDark});
    }
    else{
      this.setState({currentTheme: themeLight});
    }
  }

  themePatch(bool){
    const { id } = this.state.user;
    return axios.patch('readr/theme', {'user_id': `${id}`, 'theme': bool})
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    axios.get('/auth/user').then((response) => {
      if (response.data.user) {
        this.setState({
          isLoggedIn: true,
          user: response.data.user,
        });
        this.setTheme(this.themeGet());
      } else {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      }
    });
  }

  // testing book genre functionality

  /// //////////////
  updateUser(obj) {
    this.setState({ user: obj });
  }

  updateUrlSnippet(urlSnippet) {
    this.setState({ urlSnippet });
  }

  render() {
    const {
      isLoggedIn, user, userBookList, urlSnippet,
    } = this.state;
    return (
      <MuiThemeProvider theme={this.state.currentTheme}>
        <CssBaseline />
        <div className="App">
          {/* this container centers content on the page. Width is inherited by the rest of app. */}
          <Container component="main" maxWidth="lg">
            <div>
              {isLoggedIn === false ? (<Login />) : null }
            </div>
            {/* conditional rendering of the components based on if the user is logged in */}
            {isLoggedIn ? (
              <div>
                <NavBar user={user} setTheme={this.setTheme} themePatch={this.themePatch} themeGet={this.themeGet}/>
                <div className="mainViews">
                <Switch>
                    {/* // this is our default route */}
                    
                    <Route
                      exact
                      path="/"
                      render={(props) => (
                        <Landing {...props} user={user} updateUser={this.updateUser} />
                      )}
                    />
                    <Route
                      exact
                      path="/suggestion"
                      render={(props) => (
                        <SuggestionView {...props} user={user} />)}
                    />
                    {/* HOW TO PASS PROPS IN REACT ROUTE v4. ESLINT DISLIKES IT */}
                    <Route exact path="/booklist" render={(props) => <BookListView {...props} user={user} updateUrlSnippet={this.updateUrlSnippet} />} />
                    <Route exact path="/readnow" render={(props) => <ReaderView {...props} urlSnippet={urlSnippet} />} />
                    <Route exact path="/preferences" render={(props) => <Preference {...props} user={user} updateUser={this.updateUser} />} />
                    <Route exact path="/profile" render={(props) => <ProfileView {...props} user={user} updateUser={this.updateUser} />} />
                    <Route exact path="/addFriend" render={(props) => <AddFriend {...props} user={user} />} />
                    <Route exact path="/bookclubs" render={(props) => <ClubList {...props} user={user} />} />
                    <Route exact path="/bookclubinvite" render={(props) => <BookClub {...props} user={user} />} />
                    <Route exact path="/followers" render={(props) => <Followers {...props} user={user} />} />
                    <Route exact path="/genres" render={() => <BookGenreView/>} />
                    <Route exact path="/books" render={(props) => <Search {...props} user={user} />} />
                    <Route exact path="/filmReviews" render={(props) => <FilmReviews {...props} user={user} />} />
                    <Route exact path="/audiobooks" render={(props) => <AudioBooks {...props} user={user} />} />
                    <Route exact path="/listofreadbooks" render={(props) => <ReadList {...props} user={user} />} />
                    <Route exact path="/map" render={(props) => <Map {...props} user={user} />} />
                  </Switch>
                </div>
              </div>
            ) : null }
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
