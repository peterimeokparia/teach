import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { logOut } from '../actions';
import { Validations } from  '../../../helpers/validations';
import Swal from 'sweetalert2'
import './LoginLogout.css';



const LoginLogout = ({user,  logOut}) => {

    const performLoginLogOut = (e) => {

        e.preventDefault();

        if ( user && user?.cart?.length > 0 ) {

          Swal.fire({
            title: 'You forgot something.',
            text:  "The following items are in your cart:" +  user.cart.map((item, index) => (  " " + item?.name + " " )) + "Do you still want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Get course(s)',
            cancelButtonText: 'Next time'
          }).then( (response) => {

              if ( response?.value ) {

                 return;

              } else {

                logOut();
                navigate('/login'); 

              }

          })
        }


        if ( user && user?.cart?.length === 0 ) {

            logOut();
            navigate('/login'); 
             
        } 


        if ( ! user ) {
     
            navigate('/login');  

        }

    }

    return (<span>
                <button
                     className="LoginLogout"
                     onClick={e => performLoginLogOut(e)}
                > 

                 { user  ? "LogOut" : "Login" }
            
              </button>

              {Validations.setErrorMessageContainer()}
            </span>
            
        ) 
         
}



const mapState = (state)   => {
  return {
    user: state.users.user
  };
}


export default connect(mapState, { logOut } )(LoginLogout);