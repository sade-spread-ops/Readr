import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AudioBookView = (props) => {
  console.log(props);
  const { audiobooks, user, addAudioBook, deleteAudioBook } = props;
  const [userLibrary, setUserLibrary] = useState([]);
  
  useEffect(() => {
    const getUserLibrary = () => {
      axios.get('api/audiobooks/db').then(({data}) => {
        console.log(data);
        setUserLibrary(data);  
      }).then(() => {
        console.log(userLibrary, '****userLibrary****');
      }).catch(error => console.error(error));
    };
    getUserLibrary();
  }, []);
  
  const handleChange = () => {
    addAudioBook();
    getUserLibrary();
    
  };
  console.log(userLibrary);
  return (
    <div className="audiobook-view">
      {audiobooks && audiobooks.map((audiobook) => (
        <div className="audiobook-view-item" key={audiobook.id}>
          <b>{audiobook.title}</b>
          {audiobook.authors.map((author) => (
            <div className="audiobook-view-item-author" key={author.id}>
              <i>{`${author.first_name} ${author.last_name}`}</i>
            </div>
          ))}
          <div className="audiobook-view-item-zip-download">
            <a href={audiobook.url_zip_file}>Download a zip file</a>
          </div>
          <div className="audiobook-view-item-librivox-listen">
            <a href={audiobook.url_librivox} target="_blank">Listen Online at Librivox</a>
          </div>
          <div className="audiobook-view-item-duration">
            <i>{audiobook.totaltime.split(':').map((time, index) => {
              if (index === 0) { 
                return `${time} hours `; 
              } else if (index === 1) { return `${time} minutes`; }
            })}</i>
          </div>
          <div className="audiobook-add-to-library">
            <button onClick={() => { addAudioBook(audiobook); }}>
              Add to Library</button>
          </div>
          {userLibrary.find((userAudiobook) => userAudiobook.audiobookID === audiobook.id) && (
            <div className="audiobook-delete-from-library">
              <button onClick={() => { deleteAudioBook(audiobook); }}>
                Delete from Library
              </button>
            </div>
          )}
          <div>
          **************************************************
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default AudioBookView;