import { 
connect } from 'react-redux';

import { 
logOut } from 'services/course/actions/users';

import { 
Beforeunload } from 'react-beforeunload';

import MainRoute from './MainRoute';
import './style.css';
import dotenv from 'dotenv';
dotenv.config();

const App = ({logOut, user}) => {  
  return(
    <div>
       <MainRoute/>
    </div>
    // <div>
    //    <Beforeunload onBeforeunload={(ev) => { 
    //      ev.preventDefault()
    //      logOut(user);
    //      return;
    //   } } >
    //       <MainRoute/>
    //   </Beforeunload> 
    // </div>
  );
};


const mapState = ( state, ownProps )   => {
  return {
    user: state?.users?.user
  };
};

export default connect( mapState, { logOut } )( App );
