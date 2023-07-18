import { connect } from 'react-redux';
import { useEffect  } from 'react';
import { logOut } from 'services/course/actions/users';
import { Beforeunload } from 'react-beforeunload';
import { FormBuilderQuestionsWizard } from './FormStepWizardRoutes';
import MainRoute from './MainRoute';
import './style.css';
import dotenv from 'dotenv';
dotenv.config();

const App = ({logOut, user}) => {  
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  
  return(
    <div>
      {/* <nav>
      <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
      </nav> */}
      {/* <nav>
      <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
      </nav> */}
       <MainRoute/>
       <FormBuilderQuestionsWizard />
       <FormBuilderQuestionsWizard />
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
