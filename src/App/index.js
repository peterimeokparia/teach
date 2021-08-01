import MainRoute from './mainroute';
import './style.css';
import dotenv from 'dotenv';
dotenv.config();

const App = () => {
  return(
    <div> 
       <MainRoute/>
    </div>

  );
};

export default App;
