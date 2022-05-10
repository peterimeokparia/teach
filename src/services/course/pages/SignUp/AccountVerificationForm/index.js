import { useEffect, useState } from 'react';

import {  
navigate } from '@reach/router';

import { 
connect } from 'react-redux';

import {
updateCurrentUser,     
loginUser } from 'services/course/actions/users';

import { 
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import {
pageNavigationHelper } from 'services/course/pages/SignUp/AccountVerificationForm/helpers';

import Swal from 'sweetalert2';
import './style.css';

const AccountVerificationForm = ({  
  updateCurrentUser,    
  loginUser,    
  users,    
  operator,
  operatorBusinessName,
  userId,
  classRoomId }) => {
  useEffect(() =>{ 
    if ( ! users ) { 
      updateCurrentUser( { _id: userId } );
    }
  },  [ updateCurrentUser, userId, users ]);   
  // },  [])   

  const [ passWordValue, setPasswordValue ] = useState("");

const handleLoginUser = (event) => {   
  if ( users.length > 0 ) {
      let currentUser = users.find(user => user?._id === userId );

      if ( currentUser ) {    
          if ( currentUser?.userIsVerified ) {
            navigate(pageNavigationHelper?.users( operatorBusinessName ));   
          }   
          if ( currentUser ) {
              if (passWordValue) {
                loginUser( { ...currentUser, password: passWordValue, userIsVerified: true, unHarshedPassword: passWordValue } );
                if ( classRoomId ) {
                  navigate(pageNavigationHelper.classRoom( operatorBusinessName, classRoomId ));
                } else {
                  navigate(pageNavigationHelper?.users( operatorBusinessName ));
                }
              }
          } else {
              Swal.fire({title: 'Account does not exist', icon: 'warning', text: `Please contact the administrator.` });
              navigate(pageNavigationHelper?.login( operatorBusinessName ));
          }
        }
    }    
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
            onClick={e => handleLoginUser(e)}
          >
            Activate Account
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

export default connect(mapState, { loginUser, updateCurrentUser })(AccountVerificationForm);