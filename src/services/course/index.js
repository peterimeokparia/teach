import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducer';


const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSIONS__ &&
    window.__REDUX_DEVTOOLS_EXTENSIONS__({ trace: true })
  );




ReactDOM.render( 
 <Provider store={store}> 
    <App />  
  </Provider>, 
  document.querySelector('#root')
);

