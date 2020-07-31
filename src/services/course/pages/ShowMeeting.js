import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { removeItemFromCart  } from '../actions';
import { getCoursesByCourseIdSelector  } from '../Selectors';
import Meeting from './Meeting';


const ShowMeeting = () => {

    
    


    return (    <div> 
                       <Meeting />
                </div> 
              );
}





export default ShowMeeting;