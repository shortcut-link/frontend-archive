import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = () =>
  ReactDOM.render(
    <App />, // $FlowIgnore
    document.getElementById('root')
  );

render();
