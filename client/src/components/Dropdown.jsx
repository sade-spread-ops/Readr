/* eslint-disable */
import axios from 'axios';
import React from 'react';
import useState from 'react';
import useRef from 'react';


// we are going to utilize two api calls to get the books by genre then grab their title page

function Dropdown() {

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);


return (
  
  <div className ="menu-container">
    <button onClick={onClick} className="menu-trigger">
      <span className="menu-trigger-text">Genres</span>
      <img src="..\BookGenreDropdown.JPG"/>
    </button>
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