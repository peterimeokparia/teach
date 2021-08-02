import ReactDOM from 'services/course/node_modules/react-dom';
import { createStore } from 'services/course/node_modules/redux';
import { Provider } from 'services/course/node_modules/react-redux';
import App from './App';
import reducer from './reducer';
import dotenv from 'services/course/node_modules/dotenv';
import './index.css';

dotenv.config();

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

