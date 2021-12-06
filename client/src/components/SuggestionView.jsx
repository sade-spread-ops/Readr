/* This is the book suggestion view where the user sees the single book suggestion.
 * It is dynamic and update each time the user clicks "yes", "no", or "read now".
 * It renders a large image of the book cover along with description and the three button
 * choices above. The user should not see a book they have already said yes or no to.
 */

/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import Slider from './BookTinder.jsx';
import LoadingSuggestion from './SuggestionView/LoadingSuggestion.jsx';
import Book from './SuggestionView/Book.jsx';
class SuggestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookSuggestion: null,
      // ---FORMAT IS THIS
      /* author: "Susan Wiggs"
       * coverURL: "http...."
       * description: "Book 1 of .."
       * isbn: "9781459247925"
       * title: "THE CHARM SCHOOL"
       */
      authorClicked: false,
      authorBooks: [],
    };

    this.getBookSuggestion = this.getBookSuggestion.bind(this);
    this.postUserInterest = this.postUserInterest.bind(this);
    this.handleYesClick = this.handleYesClick.bind(this);
    this.handleNoClick = this.handleNoClick.bind(this);
    this.clearBookSuggestion = this.clearBookSuggestion.bind(this);
    this.handleAuthorClick = this.handleAuthorClick.bind(this);
    this.handleYesClickAuthor = this.handleYesClickAuthor.bind(this);
  }

  componentDidMount() {
    this.getBookSuggestion();
  }

  // Request to server to get a new book suggestion
  getBookSuggestion() {
    return axios.get('/readr/suggestion').then((retrievedBook) => {
      // a conditinal is here becuase some books were returning empty data, so we want to retry
      if (retrievedBook.data === '') {
        this.getBookSuggestion();
      } else {
        this.setState({ bookSuggestion: retrievedBook.data });
      }
    });
  }

  // Sends post reqest to server to update the users interest in book suggestion
  postUserInterest(isInterested) {
    const { bookSuggestion } = this.state;
    const { user } = this.props;
    return axios.post('/readr/interest', {
      userID: user.id,
      isbn: bookSuggestion.isbn,
      // this is true or false value, passed in on click
      toRead: isInterested,
    });
  }

  // clears bookSuggestion before finding another
  clearBookSuggestion() {
    setTimeout(() => {
      this.setState({
        bookSuggestion: null,
      });
    }, 400);
  }

  /* Adds book to the logged in users "not interested" list by
  * sending a update user interest request to the database.
  * Show the next book suggestion.
  */
  handleNoClick() {
    this.postUserInterest(false);
    this.clearBookSuggestion();
    this.getBookSuggestion();
  }

  /* Adds book to the logged in users "to-read" list by
  * sending a update user interest request to the database.
  * Show the next book suggestion.
  */
  handleYesClick() {
    this.postUserInterest(true);
    this.clearBookSuggestion();
    this.getBookSuggestion();
  }

  handleYesClickAuthor(){
    // this.postUserInterest(true);
    const { user } = this.props;
    axios.post('/readr/interest', {
      userID: user.id,
      isbn: this.state.authorBooks.isbn,
      // this is true or false value, passed in on click
      toRead: true,
    });
    this.clearBookSuggestion();
    this.getBookSuggestion();
    axios.post('/readr/insertIntoBookDb', {
      isbn: this.state.authorBooks.isbn,
      title: this.state.authorBooks.title,
      author: this.state.authorBooks.author,
      description: null,
      coverURL: null,
      buyLink: null,
      genre: null,
      urlSnippet: null,
      availability: null,
    });
    this.setState({authorBooks: [], authorClicked: false})
  }

  handleAuthorClick(author) {
    // console.log('clicked');
    // console.log(author);
    const options = {
      url: 'http://localhost:3000/readr/authorTopWorks',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        q: author,
      },
    };

    axios(options)
      .then(({ data }) => {
        // console.log(data)
        if(data) {
          data.author = Array.isArray(data.author) ? data.author[0] : data.author 
          this.setState({ authorBooks: data });
          console.log(this.state)
        }
      })

    // things i ned to make a book component
    // title, author, description, coverURL
  }
  // {authorBooks.length ? authorBooks.map((entry) => <Book bookSuggestion={entry} />) : null}
  render() {
    const { bookSuggestion, authorBooks } = this.state;
    // console.log(bookSuggestion, 'SUGGEST');
    // check if no book description
    if (bookSuggestion) {
      if (!bookSuggestion.description) {
        bookSuggestion.description = 'No description available';
      }
    }
    return (
      <div>
        {/* Spinner until component mounts and sets state */}
        {bookSuggestion === null ? (
          <LoadingSuggestion />
        ) : (
          <Zoom in>
            <Grid container align="center">
              <Grid item xs={12}>
                <Slider
                  handleNoClick={this.handleNoClick}
                  handleYesClick={this.handleYesClick}
                  book={(
                    <div>
                      <Book
                        bookSuggestion={bookSuggestion}
                        handleNoClick={this.handleNoClick}
                        handleYesClick={this.handleYesClick}
                        handleAuthorClick={this.handleAuthorClick}
                      />
                    </div>
                  )}
                />
                {authorBooks.isbn ? <Slider
                  handleNoClick={this.handleNoClick}
                  handleYesClick={this.handleYesClickAuthor}
                  book={(
                    <div>
                    {console.log(this.state.authorBooks)}
                    {this.state.authorBooks.author}'s Top Book
                      <Book
                        bookSuggestion={{
                          title: this.state.authorBooks.title,
                          author: this.state.authorBooks.author,
                          description: '',
                          coverURL: `https://covers.openlibrary.org/b/isbn/${this.state.authorBooks.isbn}-L.jpg`
                        }}
                        handleNoClick={this.handleNoClick}
                        handleYesClick={this.handleYesClickAuthor}
                        handleAuthorClick={this.handleAuthorClick}
                      />
                    </div>
                  )}
                /> : null}

              </Grid>
            </Grid>
          </Zoom>
          
        )}
      </div>
    );
  }
}

export default SuggestionView;