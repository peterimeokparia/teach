import React from 'react';
import MainRoute from './MainRoute';
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
