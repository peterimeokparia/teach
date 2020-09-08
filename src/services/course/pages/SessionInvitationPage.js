import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { resetLessonError, deleteLesson, loadUsers } from '../actions';
import { navigate } from '@reach/router';
import './CourseListPage.css';



const SessionInvitationPage = ({
    user, 
    users}) => {


    const [ password, setPassword ] = userState('')     

    useEffect(() => {

        loadUsers();
        
    }, []);


    const handleOnChange = (event) => {
        
        setPassword(event.target.value);
    }


    const handleSubmit = (event) => {
         event.preventDefault();

         if ( password &&   users?.find( authenticateUser => authenticateUser?.password === password)) {
             
              navigate('');
         }
         else {
              return ( <div> Retry. Wrong password entered.</div>)
         }

    }


    if ( users.filter( authenticateUser => authenticateUser?._id === user?._id)?.length === 1 ) {

        return ( <div>
               <form onSubmit={handleSubmit}>

                   <label>
                       
                       Password

                        <input 
                                required
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter password to join video session"
                            
                        />

                    </label>
                   
                      <input
                          type="submit" 
                      />
                </form>

        </div>)

    } else {

    return ( <div> <link to="/loginPage"> Login </link> and then join the session. </div>)
    }
    

}

const mapState = (state)   => {
    
        
    return {
            users: Object.values(state.users.users), // set up selector
            error: state.users.error,
            loading: state.users.loading,
            
    };
    }



  export default connect(mapState, { loginUser, createUser, loadUsers  })(SessionInvitationPage);