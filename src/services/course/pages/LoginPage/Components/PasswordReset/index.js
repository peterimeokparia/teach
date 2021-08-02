import { useEffect, useState } from 'react';

import {  
navigate } from '@reach/router';

import { 
connect } from 'react-redux';

import {
updateCurrentUser,
userPasswordReset,     
loginUser } from 'services/course/actions/users';

import { 
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import Swal from 'sweetalert2';

const PasswordReset = ({  
userPasswordReset,  
updateCurrentUser,    
loginUser,    
users,    
operator,
operatorBusinessName,
userId }) => {
useEffect(() =>{ 
  if ( ! users ) {
    updateCurrentUser( {_id: userId } );
  };
});   
// },  []);   
 const [ passWordValue, setPasswordValue ] = useState("");
 const handlePasswordReset = (event) => {
    if ( users.length > 0 ) {
        let currentUser = users.find(user => user?._id === userId );
    
        if ( currentUser ) {
            if ( currentUser ) {
                 if (passWordValue) {
                  userPasswordReset( { ...currentUser, newUserPassword: passWordValue } )
                    .then( resp => { 
                      if ( resp ) {
                          currentUser = { ...currentUser, userIsValidated: true };
                          loginUser( { ...currentUser, unHarshedPassword: passWordValue } ); 
                          navigate(`http://localhost:3000/${operatorBusinessName}/users`);
                      }
                    }).catch( error => { console.log( error ); });
                 }  
            } else {
                Swal.fire({
                  title: 'Account does not exist', 
                  icon: 'warning', 
                  text: `Please contact the administrator.` 
                });
                navigate(`http://localhost:3000/${operatorBusinessName}/login`);
            }
          };
      };
};

const handleSubmit = e => {
    e.preventDefault();
};
                                
return (
    <div className="LoginPage"> 
    <form onSubmit={ e => handleSubmit(e)}>
         <label>
          Password   
          <input
              name="password"
              type="password"
              value={passWordValue}
              onChange={ e => setPasswordValue( e.target.value ) }
              placeholder="password"
          >
          </input>
        </label>
        <div>            
        </div>
           <div></div>
           <button
              type="submit"
              onClick={e => handlePasswordReset(e)}
            >
              Reset Password
           </button>
     </form> 
  </div> 
  );
};

const mapState = ( state, ownProps )   => {  
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    user: state?.users?.user,
    users: Object.values(state?.users?.users),
    lessonStarted: state?.lessons?.lessonStarted,
    error: state?.users?.error,
    loading: state?.users?.loading,
    sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.UserId === ownProps?.currentUser?._id)     
  };
};

export default connect(mapState, { loginUser, updateCurrentUser, userPasswordReset  })(PasswordReset);