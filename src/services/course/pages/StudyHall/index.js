import { 
connect } from 'react-redux';

import {
Redirect } from '@reach/router';

import LessonPlan from '../Lessons/LessonPlan/index';
import './style.css';

const StudyHall = ({ 
    operatorBusinessName,
    user }) => {
    if ( ! user ){
        return <Redirect to="/login" noThrow />;
    }
return (<div className="">
            <br></br>   
            <LessonPlan
                currentUser={user}
                operatorBusinessName={operatorBusinessName}
            />
        </div>
); };

const mapState = state => ({
    user: state?.users?.user,
    isModalOpen: state?.courses?.isModalOpen
});

export default connect(mapState, null)(StudyHall);