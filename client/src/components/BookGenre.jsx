/* eslint-disable */
import axios from 'axios';
import React from 'react';
import useState from 'react';

// we are going to utilize two api calls to get the books by genre then grab their title page

function BookByGenre() {

  const [books, setBooks] = useState([]);

  const grabBooksByGenre = (genre) => {
    axios.get(`http://openlibrary.org/subjects/${genre}.json`)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  };

return (
<div>
        <h1>Chat Room</h1>
        <div className='addFriend'>
          <div className="formClass">
            <form onSubmit={e => e.preventDefault()}>
              <TextField variant="outlined" label="Friend" fullWidth = "fullWidth" color="success"
                value={this.state.friendText}
                onChange={(e) =>
                  this.setState({friendText: e.target.value })
                }
                style={{backgroundColor: 'white'}}
              />
              <Button startIcon={<ArrowUpwardIcon/>} variant="contained" color="secondary" onClick={(e) => this.handleClickFriend(e)}>Add Friend</Button>
            </form>
          </div>
        </div>
        </div>
)


}

export default BookByGenre;
