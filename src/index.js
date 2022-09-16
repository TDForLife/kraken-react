import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import KrakenView from './KrakenView';
import './polyfill';

document.body.style.margin = '0';

ReactDOM.render(
  <React.StrictMode>
    <KrakenView />
  </React.StrictMode>,
  document.body
);
