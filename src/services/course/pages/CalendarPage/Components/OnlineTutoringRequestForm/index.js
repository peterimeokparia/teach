import 
React, { 
useState, 
useEffect, 
useRef } from 'react';

import { 
connect } from 'react-redux';

// import { 
// addNewCourse } from 'Services/course/Actions/Courses';

// import { 
// Validations } from  'Services/course/helpers/Validations';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'Services/course/Selectors';

import DropDown from 'Services/course/Pages/Components/DropDown';
import './style.css';

const OnlineTutoringRequestForm = ({
saveInProgress,
onSaveError,
user,
tutors,
courses,
operatorBusinessName,
operator,
dispatch }) => {
const [ courseName, setCourseName ] = useState('');
const [ immediateHelp, setImmediateHelp ] = useState( false );
const [ getTutor, setGetATutor ] = useState( false );
const inputRef = useRef();
//let currentUser = user;

useEffect (() => {
    // inputRef.current.focus();
}, []); 

if ( saveInProgress ) {
        return <div>...loading</div>;
} 

if ( onSaveError ) {
    return <div> { onSaveError.message } </div> ;
}      

const handleSubmit = e => { 
    e.preventDefault(); 
};

const getImmediateHelp = e => { 
    setImmediateHelp( true );
    // dispatch(addNewCourse(courseName, coursePrice, courseDescription, currentUser, operator));
};

const getScheduledHelp = e => { 
    // dispatch(addNewCourse(courseName, coursePrice, courseDescription, currentUser, operator));
};

const getATutor = e => {
    setGetATutor( true );
};

return (
    <div className="OnlineHelp">
        <h1>{`.`}</h1> 
        <br></br>
        <form onSubmit={handleSubmit}>    
           <div className="center">
              <div className={( immediateHelp ) ? "hide-button-options" : ""}>
                <div className="row justify-content-sm-center">
                    <span className="col">
                        <button className="" onClick={ getImmediateHelp } disabled={ saveInProgress } > {`Immediate Assistance`} </button> 
                    </span>
                    <span className="col">
                        <button className="" onClick={ getScheduledHelp } disabled={ saveInProgress } > {`Scheduled Session`} </button> 
                    </span>
                </div>
               </div>
               {
                <div>   
               <div className={(getTutor) ? "hide-button-options" : ""}>
               {  
                 <div className={( immediateHelp ) ? "show-quick-intro-form" : "show-quick-intro-form-hidden"}>
                    <label>
                        <input
                            ref={inputRef} 
                            disabled={saveInProgress} 
                            value={courseName} 
                            onChange={(e) => setCourseName(e.target.value)}
                            placeholder="Email Address"
                        />
                    </label>
                    <label>
                        <input
                            ref={inputRef} 
                            disabled={saveInProgress} 
                            value={courseName} 
                            onChange={(e) => setCourseName(e.target.value)}
                            placeholder="First Name"
                        />
                    </label>
                    <label>
                        <div>   {'How can we assist you?'} </div>
                        <div className="row justify-content-sm-center">
                            <DropDown />
                        </div>    
                    </label>
                    <button className={( immediateHelp ) ? "show-quick-intro-form" : "show-quick-intro-form-hidden"} onClick={ getATutor } disabled={ saveInProgress } > {`Get a Tutor`} </button> 
                </div>
             }
                </div>
                <div className={( getTutor ) ? "show-quick-intro-form-test" : "show-quick-intro-form-hidden"}>
                    <div className={'blink'}>  <div>  {'We are getting you connected with a tutor. Please wait...'}  </div>  </div>
                                    {/* https://www.tawk.to/ */}
                    <div> { ' Ad & Promo Rotation. Ad & Promo Rotation. Ad & Promo Rotation. Ad & Promo Rotation.  '}  </div>
                    <div> { 'While you wait, do you know that you can get a discount by signing up today? '}  </div>
                </div>
                </div>
           }
           </div>
        </form>
    </div>
); };

const mapState = ( state, ownProps ) => ({
    user: state?.users?.user, // get user by operator id
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    calendarEvents: state?.calendar?.calendarEvents, // get calendar events by operator id
    tutors: getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Tutor"),
    courses: getCoursesByOperatorId(state, ownProps),
    // courses: Object.values(state?.courses?.courses)?.filter(crs => crs?.operatorId === ownProps.operator?._id),
    saveInProgress: state.courses.saveInProgress,
    onSaveError: state.courses.onSaveError,
});

export default connect(mapState)(OnlineTutoringRequestForm);