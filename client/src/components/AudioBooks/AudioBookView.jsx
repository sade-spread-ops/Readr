import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, 
  CardActions, Button, Typography, IconButton, Stack } from '@mui/material';
import { DownloadIcon } from '@mui/icons-material';

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
  // console.log(userLibrary);
  return (
    <div className="audiobook-view">
      {audiobooks && audiobooks.map((audiobook) => (
        <div className="audiobook-view-item" key={audiobook.id}>
          <Card style={{backgroundColor: '#f0f0f0'}}> 
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {audiobook.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="span">
                {audiobook.authors.map((author) => (
                  <div className="audiobook-view-item-author" key={author.id}>
                    {`${author.first_name} ${author.last_name}`}
                  </div>
                ))}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="span">
                {audiobook.totaltime.split(':').map((time, index) => {
                  if (index === 0) { 
                    return `${time} hours `; 
                  } else if (index === 1) { return `${time} minutes`; }
                })}
              </Typography>
              <Stack 
                direction="row"
                spacing={1}
                alignItems="center"
                className="audiobook-view-item-buttons">
                <Button color="primary" size="small" href={audiobook.url_zip_file}>
                  Download
                </Button>
                <Button color="primary" size="small" href={audiobook.url_librivox} target="_blank">
                  Librivox
                </Button>
              </Stack>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => addAudioBook(audiobook)}>
                Add to Library
              </Button>
              {
                userLibrary.find(userAudiobook => userAudiobook.audiobookID === audiobook.id) && (
                  <Button size="small" color="primary" onClick={() => deleteAudioBook(audiobook)}>
                    Remove from Library
                  </Button>
                )
              }
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
  { /* <b>{audiobook.title}</b>
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
  );*/ }
};

export default AudioBookView;


{ /* <IconButton aria-label="download" onClick={() => {
                  window.open(audiobook.url_zip_file, '_blank');
                }
                }>
                  <DownloadIcon />
                </IconButton> */ }