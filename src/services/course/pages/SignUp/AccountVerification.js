import React, {
useEffect,
useState }from 'react';

import {  
navigate } from '@reach/router';

import { 
connect } from 'react-redux';

import {
updateCurrentUser,     
loginUser } from '../../actions';


import { 
getOperatorFromOperatorBusinessName } from '../../Selectors';

import Swal from 'sweetalert2'

import './LoginPage.css';


const AccountVerification = ({  
updateCurrentUser,    
loginUser,    
users,    
operator,
operatorBusinessName,
userId }) => {



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
        
            if ( currentUser ) {
           
                currentUser = { ...currentUser, userIsValidated: true }
           
        
                 if (passWordValue) {
           
                   loginUser( { currentUser, password: passWordValue } ) 
           
                   navigate(`http://localhost:3000/${operatorBusinessName}/users`);
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

     {/* {Validations.setErrorMessageContainer()} */}
             
  </div> 

  );
  

}



async function getPasswordInput(){

    return await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
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

export default connect(mapState, { loginUser, updateCurrentUser  })(AccountVerification);