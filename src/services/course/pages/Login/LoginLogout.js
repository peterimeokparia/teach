import React from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import { 
logOut } from '../../actions';

import { 
Validations } from  '../../../../helpers/validations';

import Swal from 'sweetalert2'

import { 
forceReload } from '../../../../helpers/serverHelper';

import { 
getOperatorFromOperatorBusinessName } from '../../Selectors';

import './LoginLogout.css';


const LoginLogout = ({ 
operatorBusinessName,
operator, 
user,  
logOut }) => {

    const logInPage = `/${operatorBusinessName}/login`;

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
               
                    userLogOut( user );
                    
                  }
  
            })
          } else {

                   userLogOut( user );
          }
  
        } else {
 
          navigate(logInPage)
        } 

    }



    const userLogOut = ( usr ) => {

        logOut( usr );

        navigate(logInPage);

        forceReload();
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



const mapState = ( state, ownProps )   => {
  return {
    user: state.users.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
  };
}


export default connect(mapState, { logOut } )(LoginLogout);