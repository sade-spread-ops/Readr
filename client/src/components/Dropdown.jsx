/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState, useRef }  from 'react';


// we are going to utilize two api calls to get the books by genre then grab their title page

function Dropdown() {

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [genre, setGenre] = useState('');
  const [info, setInfo] = useState({});
  const onClickActive = () => setIsActive(!isActive);
  const onClickHorror = () => setGenre('horror') ;
  const onClickRomance = () => setGenre('romance');
  const onClickSatire = () => setGenre('satire');
  const onClickComedy = () => setGenre('comic');
  const onClickWestern = () => setGenre('western');
  const onClickCrime = () => setGenre('crime');
  const onClickDrama = () => setGenre('drama');
  const onClickMystery = () => setGenre('mystery');


   const getBookInfo = (genre) => {
     return axios.get(`/readr/genre/${genre}`)
      .then(({data}) => {
        setInfo({data});
        //  return (JSON.stringify(data));
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
            <button onClick={() => {onClickMystery()}}><li>Mystery</li></button>
            <button onClick={() => {onClickRomance()}}><li>Romance</li></button>
            <button onClick={() => {onClickSatire()}}><li>Satire</li></button>
            <button onClick={() => {onClickComedy()}}><li>Comic</li></button>
            <button onClick={() => {onClickWestern()}}><li>Western</li></button>
            <button onClick={() => {onClickCrime()}}><li>Crime</li></button>
            <button onClick={() => {onClickDrama()}}><li>Drama</li></button>
          </ul>
        </nav>
      </div>
  );
} else {

  {getBookInfo(genre);}
  console.log(!!info.data ? info.data : "Waiting to load....");

 

  return (
    <div>
    <div className ="menu-container">
      <button onClick={onClickActive} className="menu-trigger">
      <span className="menu-trigger-text">Genres</span>
        {/* <img src={genrePicture} alt="Book Picture"/> */}
      </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            <button onClick={() => {onClickHorror()}}><li>Horror</li></button>
            <button onClick={() => {onClickMystery()}}><li>Mystery</li></button>
            <button onClick={() => {onClickRomance()}}><li>Romance</li></button>
            <button onClick={() => {onClickSatire()}}><li>Satire</li></button>
            <button onClick={() => {onClickComedy()}}><li>Comic</li></button>
            <button onClick={() => {onClickWestern()}}><li>Western</li></button>
            <button onClick={() => {onClickCrime()}}><li>Crime</li></button>
            <button onClick={() => {onClickDrama()}}><li>Drama</li></button>
          </ul>
        </nav>
      </div>
    <div>
    <div>
    <div>Title: {!!info.data ? info.data.title : "Loading"}</div>
    <div>Author: {!!info.data ? info.data.author : "Loading"}  </div>
     <img src={!! info.data ? `https://covers.openlibrary.org/b/isbn/${info.data.isbnNumber}-M.jpg` : "Loading..."} />
  </div>
  </div>
  </div>
  )}

};

export default Dropdown;

