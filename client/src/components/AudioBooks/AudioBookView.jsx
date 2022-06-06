import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, 
  CardActions, Button, Typography, Stack, Link as Link2, Grid} from '@mui/material';
import { Download, AddCircleOutline, RemoveCircleOutline, Link } from '@mui/icons-material';

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
  return (
    <div className="audiobook-view">
      <Box className="audiobook-view-item-box" >
        <Grid container direction="row" spacing={2}>
          {audiobooks && audiobooks.map((audiobook) => (
            <div className="audiobook-view-item" key={audiobook.id}>
              <Grid item style={{width: '400px', margin: 10}}>
                <Card style={{backgroundColor: '#f0f0f0'}}> 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" >
                      <Link2 
                        href={audiobook.url_project} 
                        target="_blank" 
                        color="inherit" 
                        style={{ textDecoration: 'none' }}>
                        {audiobook.title}
                      </Link2>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="span">
                      {audiobook.authors.map((author) => (
                        <div className="audiobook-view-item-author" key={author.id}>
                          {`${author.first_name} ${author.last_name}`}
                        </div>
                      ))}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="span">
                      {audiobook.totaltime ? audiobook.totaltime.split(':').map((time, index) => {
                        if (index === 0) { 
                          return `${time} hours `; 
                        } else if (index === 1) { return `${time} minutes`; }
                      }) : <div>Duration Is Not Available</div>}
                    </Typography>
                    <Stack 
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      className="audiobook-view-item-buttons">
                      <Button color="primary" size="small" href={audiobook.url_zip_file} endIcon={ <Download /> }>
                        Download
                      </Button>
                      <Button color="primary" size="small" href={audiobook.url_librivox} target="_blank" endIcon={ <Link /> }>
                        Librivox
                      </Button>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => addAudioBook(audiobook)} endIcon={ <AddCircleOutline /> }>
                      Add to Library
                    </Button>
                    {
                      userLibrary.find(userAudiobook => userAudiobook.audiobookID === audiobook.id) && (
                        <Button size="small" color="primary" onClick={() => deleteAudioBook(audiobook)} endIcon={ <RemoveCircleOutline /> }>
                          Remove from Library
                        </Button>
                      )
                    }
                  </CardActions>
                </Card>
              </Grid>
            </div>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default AudioBookView;
