/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import './styles.css';
import Dropdown from './components/Dropdown.jsx';

ReactDOM.render(
  // creates URLs with the following format: http://localhost:3000/route/subroute
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'),
);
