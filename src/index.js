import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Helmet } from 'react-helmet';
import App from './App';

ReactDOM.render(
  <>
  <Helmet>
    <title> Bob </title>
    <script src="./jshue.js" type = "text/babel"></script>
  </Helmet>
  <App />
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
