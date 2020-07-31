import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { logOut } from '../actions';



const LoginLogout = ({createUser,  logOut}) => {

    const performLoginLogOut = (e) => {

        e.preventDefault();

        if (createUser) {

            logOut();
            navigate('/login');  

        }else {
     
             navigate('/login');  

        }

    }

    return (<button
                className="LoginLogout"
                onClick={e => performLoginLogOut(e)}
            > 

               { createUser  ? "LogOut" : "Login" }
            
            </button>
            ) 
         
}



const mapState = (state)   => {
  return {
         createUser: state.users.user
  };
}


export default connect(mapState, { logOut } )(LoginLogout);