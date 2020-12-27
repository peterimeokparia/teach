import React from 'react';

import { 
connect } from 'react-redux';

import Modal from 'react-modal';

import { 
Link, 
navigate, 
Redirect } from '@reach/router';

import { 
openNewClassRoomModal,
closeNewClassRoomModal } from '../../actions';

import { 
getOperatorFromOperatorBusinessName, 
getClassRoomGroupsByOperatorId } from '../../Selectors';

import Loading from '../Components/Loading';

import LoginLogout from '../Login/LoginLogout'

import ClassRoomGroupComponent from '../ClassRoom/ClassRoomGroupComponent';

import NewClassRoomGroup from '../ClassRoom/NewClassRoomGroup';

import Cart from '../Sales/Cart/Cart';

import MainMenu from '../Components/MainMenu';

import './MyCourses.css';


const ClassRoomGroupsPage = ({
operatorBusinessName,    
operator, 
user,
classroomsLoading,
classrooms,
onClassRoomError,
openNewClassRoomModal,
closeNewClassRoomModal,
isModalOpen }) => {


    if ( ! user ){

        return <Redirect to="/login" noThrow />
    }


    if ( classroomsLoading) {

        return <Loading />
    }         


   
    if ( onClassRoomError ) {

        return <div> { onClassRoomError.message } </div> ;
    }


    let navContent = [
        { id: 0, hrefValue: `/LessonPlan/StudyHall/StudyHall/StudyHall/${user?.firstname}` , item: 'Study Hall' }, 
        { id: 1, hrefValue: '/mycourses' , item: 'My Courses' },
        { id: 2, hrefValue: '/users' , item: 'My Tutors' }  
    ]
           
    return (

        <div className="MyCourses">

        <header> 

           <MainMenu navContent={navContent} />

            {/* <h1>  {`Welcome ${user?.firstname}! `} </h1> */}

            <h2> You are viewing all classroom groups. </h2>

            <div>  
            <LoginLogout
                user={user}
            />

              <Cart />

            </div>
        </header>

        <br></br>   

         { ( user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewClassRoomModal}>Add New Group</button> }
  
                <ClassRoomGroupComponent
                            operatorBusinessName={operatorBusinessName}
                            user={user} 
                            classrooms={classrooms}
               />     

                <Modal isOpen={isModalOpen} onRequestClose={closeNewClassRoomModal}> 
                        <NewClassRoomGroup 
                            user={user} 
                            operator={operator}
                            operatorBusinessName={operatorBusinessName}
                        /> 
                </Modal> 

        </div>
    )
}


const mapDispatch = {
   openNewClassRoomModal,
   closeNewClassRoomModal
};



const mapState = ( state, ownProps ) => ({
    user: state?.users?.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    classrooms: getClassRoomGroupsByOperatorId(state, ownProps),
    classroomsLoading: state?.classrooms?.classroomsLoading,
    onClassRoomError: state?.classrooms?.onClassRoomError,
    isModalOpen: state?.classrooms?.isModalOpen
})



export default connect(mapState, mapDispatch)(ClassRoomGroupsPage);