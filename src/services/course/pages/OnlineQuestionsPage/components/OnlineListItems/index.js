import { 
useState,
useEffect } from 'react';

import './style.css';

const OnlineListItems = ({ 
  currentCourseQuestions,
  children }) => {

return currentCourseQuestions?.map((element) => (
    <>
      {
        children( element )
      }  
    </>
  ));
};

export default  OnlineListItems;
  
  