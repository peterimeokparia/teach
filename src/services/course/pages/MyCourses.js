import 
React, { 
useEffect, 
useState, 
useRef } from 'react';

import { 
connect } from 'react-redux';

import Modal from 'react-modal';

import { 
Link, 
navigate, 
Redirect } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from '../actions';

import { 
navContent } from  '../../../helpers/navigationHelper.js';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from '../Selectors';

import LoginLogout from './LoginLogout'
import CoursesComponent from './CoursesComponent';
import NewCourse from './NewCourse';
import MainMenu from './MainMenu';
import Cart from './Cart';

import './MyCourses.css';


 
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components/components';
import { useOnClickOutside } from './hooks';



const MyCourses = ({
operatorBusinessName,
operator,
user,
courses,
openNewCourseModal,
closeNewCourseModal,
isModalOpen }) => {


    const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));
    const [open, setOpen] = useState(false);



    if ( ! user || user?.email === undefined ){

        return <Redirect to={`/${operatorBusinessName}/login`} noThrow />
    }

    
    let navigationContent = navContent( user, operatorBusinessName ).users;

    let myCourseList = courses?.filter(course => user?.courses?.includes(course?._id));

       
    return (

       
        <div className="MyCourses">
 
            <header> 
                
                <MainMenu navContent={navigationContent} />

                <h2> You are viewing your list of courses. </h2>

                
                <div>  
                <LoginLogout
                     operatorBusinessName={operatorBusinessName}
                     user={user}
                />    

                <Cart />
                </div>
            </header>

             
      {
          ( user?.courses?.length === 0 ) && (<div> 
               <div>
                 <h3>You are not subscribed to any  <span><Link to={"/courses"}> courses. </Link></span></h3>
               </div>

              <div>   
              { ( user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button> }
    
              </div>
      
              <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCourse user={user}/> </Modal>
           </div>

        )  
      }
        


     

            <br></br>   

              { ( user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewCourseModal}>Add New Course</button> }

                    <CoursesComponent
                               operatorBusinessName={operatorBusinessName}
                               modal={isModalOpen} 
                               courses={myCourseList}
                   />     
 
                 <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCourse user={user}/> </Modal>

        </div>

    )     
}


const mapDispatch = {
   openNewCourseModal,
   closeNewCourseModal
};


const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    user: state?.users?.user,
    yourCourses: getCoursesByOperatorId(state, ownProps)?.filter(course => state?.users.user?.courses?.includes(course?._id)),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
})

export default connect(mapState, mapDispatch)(MyCourses);