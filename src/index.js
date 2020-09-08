import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers';
import thunk from 'redux-thunk'
import { saveAuthToken} from './saveAuthToken';
import { loadCourses, loadUsers, loadLoggedInUsers, lastLoggedInUser } from './services/course/actions';
import Modal from 'react-modal';



const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true
    }) : compose;


const enhancer = composeEnhancers(
  applyMiddleware(thunk, saveAuthToken),
  // other store enhancers if any
);


const store = createStore(
  reducer, 
  enhancer
  );



store.dispatch(loadUsers());  
store.dispatch(lastLoggedInUser());   
store.dispatch(loadCourses());



Modal.setAppElement('#root');


const portalRoot = document.getElementById("portal");


ReactDOM.render( 
 <Provider store={store}> 
    <App />  
  </Provider>, 
  document.querySelector('#root')
);
