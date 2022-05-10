import {  
navigate } from '@reach/router';

import { 
connect } from 'react-redux';

import { 
createUser } from 'services/course/actions/users';

import { 
createOperator } from 'services/course/actions/operator';

import Operator from 'services/course/helpers/Operator';
import Swal from 'sweetalert2';
import OperatorRegistrationForm from './OperatorRegistrationForm';
import './style.css';

const OperatorSignUpPage = ({
  error, 
  loading, 
  createOperator }) => {
  const handleCreateUser = (email, password, firstname, lastname, businessname, phone ) => {
  let operatorUser = new Operator();
  
    operatorUser.email = email;
    operatorUser.password = password;
    operatorUser.firstName = firstname;
    operatorUser.lastName = lastname; 
    operatorUser.businessName = businessname; 
    operatorUser.phone = phone;          

  createOperator( operatorUser )
    .then(resp => {
    Swal.fire({
      title: `Welcome!`,
      icon: 'warning',
      html: (`<div> <p> <u>Your service account link </u> </p> </div> <div> <p> http://localhost:3000/${businessname}/login </p> 
                </div> <div><p> A confirmation email has been sent to your email address.  </p></div>`),
      showCancelButton: false,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#673ab7',
      cancelButtonText: 'Cancel'
    }).then( (response) => {
      if ( response?.value ) {
          navigate(`http://localhost:3000/${businessname}/login`);
      }
  });       
  }).catch(error => 
    { Swal.fire( {title: 'Problem with registration', icon: 'warning', text: `Please contact the administrator.${error?.message}` }); });
};

return ( 
<div className="LoginPage"> 
  {
    <p>Please register below:</p> 
  } 
  {
    <OperatorRegistrationForm
        error={error}
        loading={loading}
        handleCreateUser={handleCreateUser}
    />                        
  }
  </div>
  );
};
const mapState = ( state, ownProps )   => {  
  return {
    user: state?.users?.user,
    users: Object.values(state?.users?.users),
    lessonStarted: state?.lessons?.lessonStarted,
    error: state?.users?.error,
    loading: state?.users?.loading,
    sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.UserId === ownProps?.currentUser?._id)    
    };
};

export default connect(mapState, {  createOperator, createUser })(OperatorSignUpPage);