import React from 'react';
import { connect } from 'react-redux';
import { Redirect, navigate } from '@reach/router';
import { logOut } from '../actions';
import { Validations } from  '../../../helpers/validations';
import Swal from 'sweetalert2'
import './LoginLogout.css';



const LoginLogout = ({user,  logOut}) => {

    const performLoginLogOut = (e) => {

        e.preventDefault();

        if ( user ) {

          if ( user?.cart?.length > 0 ) {

            Swal.fire({
              title: 'Courses you are interested in.',
              icon: 'warning',
              html: user.cart.map((item, index) => '<ul><li key=' + `${index}` + '>' + `${item?.name}` + '</li></ul') + "Do you still want to log out?",
              showCancelButton: true,
              confirmButtonText: 'Get course(s)',
              cancelButtonText: 'Next time'
            }).then( (response) => {
  
                  if ( response?.value ) {
                    
                    return;
    
                  } else {
               
                    userLogOut();
                    
                  }
  
            })
          } else {

                   userLogOut();
          }
  
        } else {
 
          navigate('/login')
          // return <Redirect to="/login" noThrow />  
        } 

    }

    const userLogOut = () => {

        logOut();

        navigate('/login')
      // return <Redirect to="/login" noThrow />  
    }

    return (<span>
                <button
                     className="preview-btn"
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