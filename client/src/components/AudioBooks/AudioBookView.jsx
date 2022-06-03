import React from 'react';
const AudioBookView = (props) => (
  <div className="audio-book-view">
    {props.audiobooks.map((book) => ( 
      <div className="audio-book-view-item" key={book.id}>
        <b>{book.title}</b>
        {book.authors.map((author) => (
          <div className="audio-book-view-item-author" key={author.id}>
            <i>{`${author.first_name} ${author.last_name}`}</i>
          </div>
        ))}
        <div className="audio-book-view-item-zip-download">
          <a href={book.url_zip_file}>Download a zip file</a>
        </div>
        <div className="audio-book-view-item-librivox-listen">
          <a href={book.url_librivox} target="_blank">Listen Online at Librivox</a>
        </div>
        {/* <div className="audio-book-view-item-description">
          {book.description}
        </div> */}
        <div>
        **************************************************
        </div>
      </div>
    ))
    }
  </div>
);

export default AudioBookView;