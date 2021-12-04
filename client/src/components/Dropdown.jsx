/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState, useRef }  from 'react';
// import genrePicture from '../BookGenreDropdown.png';


// we are going to utilize two api calls to get the books by genre then grab their title page

function Dropdown() {

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [genre, setGenre] = useState('');
  const onClickActive = () => setIsActive(!isActive);
  const onClickHorror = () => setGenre('horror') ;
  const onClickRomance = () => setGenre('romance');
  const onClickFantasy = () => setGenre('fantasy');
  const onClickComedy = () => setGenre('comedy');
  const onClickPoetry = () => setGenre('poetry');
  const onClickRecipe = () => setGenre('recipe');
  const onClickDrama = () => setGenre('drama');
  const onClickMystery = () => setGenre('mystery');

   const getBookInfo = (genre) => {
     return axios.get(`/readr/genre/${genre}`)
      .then(({data}) => {
        console.log(JSON.stringify(data));
         return(JSON.stringify(data));
      })
      .catch((error) => {
        window.alert('Book not found!');
        console.error(error);
      });
  };


  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
    }
  };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };

  }, [isActive]);

  if (genre === '') {
    return (
      <div className ="menu-container">
      <button onClick={onClickActive} className="menu-trigger">
      <span className="menu-trigger-text">Genres</span>
        {/* <img src={genrePicture} alt="Book Picture"/> */}
      </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            <button onClick={() => {onClickHorror()}}><li>Horror</li></button>
            <button onClick={() => {onClickRomance()}}><li>Romance</li></button>
            <button onClick={() => {onClickFantasy()}}><li>Fantasy</li></button>
            <button onClick={() => {onClickComedy()}}><li>Comedy</li></button>
            <button onClick={() => {onClickPoetry()}}><li>Poetry</li></button>
            <button onClick={() => {onClickRecipe()}}><li>Recipe</li></button>
            <button onClick={() => {onClickDrama()}}><li>Drama</li></button>
            <button onClick={() => {onClickMystery()}}><li>Mystery</li></button>
          </ul>
        </nav>
      </div>
  );
} else {
  return (
    <div>
    {/* {console.log(genre)}
    {console.log(getBookInfo(genre))}
    
    <div>
    <div>Title: </div>
    <div>Author: </div>
  </div> */}
  </div>
  )}

};

export default Dropdown;

