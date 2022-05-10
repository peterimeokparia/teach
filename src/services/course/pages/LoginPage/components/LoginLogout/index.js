import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import { 
logOut } from 'services/course/actions/users';

import { 
Validations } from  'services/course/helpers/Validations';

import { 
forceReload, 
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import { 
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import LockIcon from '@material-ui/icons/Lock';
import Swal from 'sweetalert2';
import './style.css';

const LoginLogout = ({ 
  operatorBusinessName,
  operator, 
  user,  
  logOut }) => {
const logInPage = `/${(!operatorBusinessName) ? getItemFromSessionStorage('operatorBusinessName') : operatorBusinessName}/login`;
const performLoginLogOut = (e) => {
  e.preventDefault();
    
  if ( user ) {
      if ( user?.cart?.length > 0 ) {
        Swal.fire({
          title: 'Courses you are interested in.',
          icon: 'warning',
          html: user.cart.map((item, index) => `<ul><li key=${index}> ${item?.name} </li></ul`) + "Do you still want to log out?",
          showCancelButton: true,
          confirmButtonText: 'Get course(s)',
          cancelButtonText: 'Next time'
        }).then( (response) => {
          if ( response?.value ) {      
            return;
          } else {
            userLogOut( user );
          }
        });
      } else {
          userLogOut( user );
      }
    } else {
        navigate(logInPage);
    } 
};

const userLogOut = ( usr ) => {
  logOut( usr );
  navigate(logInPage);
  forceReload();
};

return (
  <span className="lock-icon">
    <LockIcon onClick={e => performLoginLogOut(e)} />
    { Validations.setErrorMessageContainer() }
  </span>  
  );          
};

const mapState = ( state, ownProps )   => {
  return {
    user: state.users.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
  };
};

export default connect(mapState, { logOut } )(LoginLogout);