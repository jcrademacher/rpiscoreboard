import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/app.js'

import './styles.css'

var Mount = () => {
  if (!window.WebSocket) {
    return (
      <div>
        <br/><br/>
        <h1>WebSockets are not supported by this browser. Please switch to a different one.</h1>
      </div>
    );
  }
  else {
    return (<App/>);
  }
}

ReactDOM.render(
  <Mount />,
  document.getElementById('app')
);
