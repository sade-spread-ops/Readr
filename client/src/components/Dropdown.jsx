/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState, useRef }  from 'react';
// import genrePicture from '../BookGenreDropdown.png';


// we are going to utilize two api calls to get the books by genre then grab their title page

function Dropdown() {

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

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


return (

  <div className ="menu-container">
    <button onClick={onClick} className="menu-trigger">
      <span className="menu-trigger-text">Genres</span>
      {/* <img src={genrePicture} alt="Book Picture"/> */}
    </button>
      <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <li><a href="/horror">Horror</a></li>
          <li><a href="/comedy">Comedy</a></li>
          <li><a href="/fiction">Fiction</a></li>
          <li><a href="/mystery">Mystery</a></li>
          <li><a href="/romance">Romance</a></li>
          <li><a href="/poetry">Poetry</a></li>
          <li><a href="/drama">Drama</a></li>
          <li><a href="/recipes">Recipe</a></li>
          <li><a href="/fantasy">Fantasy</a></li>
        </ul>
      </nav>
  </div>

  );
};

export default Dropdown;

 // const grabBooksByGenre = (genre) => {
  //   axios.get(`http://openlibrary.org/subjects/${genre}.json`)
  //     .then((response) => {
  //       console.log(response);
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  // };