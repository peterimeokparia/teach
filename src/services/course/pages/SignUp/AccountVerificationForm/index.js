import 
React, {
useEffect,
useState }from 'react';

import {  
navigate } from '@reach/router';

import { 
connect } from 'react-redux';

import {
updateCurrentUser,     
loginUser } from 'Services/course/Actions/Users';

import { 
getOperatorFromOperatorBusinessName } from 'Services/course//Selectors';

import Swal from 'sweetalert2'

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
    updateCurrentUser( {_id: userId } )
  }
},  [])   

const [ passWordValue, setPasswordValue ] = useState("");

const handleLoginUser = (event) => {   

  if ( users.length > 0 ) {
      let currentUser = users.find(user => user?._id === userId );

      if ( currentUser ) {
          
          if ( currentUser?.userIsVerified ) {
            navigate(`http://localhost:3000/${operatorBusinessName}/users`);   
          }
      
          if ( currentUser ) {

              if (passWordValue) {
                loginUser( { ...currentUser, password: passWordValue, userIsVerified: true, unHarshedPassword: passWordValue } )
                if ( classRoomId ) {
                  navigate(`/${operatorBusinessName}/LessonPlan/invite/userverified/classRoom/${classRoomId}`);
                } else {
                  navigate(`http://localhost:3000/${operatorBusinessName}/users`);
                }
              }
          } else {
              Swal.fire({title: 'Account does not exist', icon: 'warning', text: `Please contact the administrator.` });
              navigate(`http://localhost:3000/${operatorBusinessName}/login`);
          }
        }
    }    
}

const handleSubmit = e => {
    e.preventDefault();
}

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
}

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
}

export default connect(mapState, { loginUser, updateCurrentUser })(AccountVerificationForm);