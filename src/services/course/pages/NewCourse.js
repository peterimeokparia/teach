import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { addNewCourse } from '../actions';
import './NewCourse.css'



const NewCourse = ({
    saveInProgress,
    onSaveError,
    user,
    dispatch }) => {


    const [ courseName, setCourseName ] = useState('');
    const [ coursePrice, setCoursePrice ] = useState('');
    const inputRef = useRef();
    let currentUser = user;
    
    useEffect (() =>{
        inputRef.current.focus();
    }, []); 


    const handleSubmit = e => { 
        e.preventDefault(); 

        dispatch(addNewCourse(courseName, coursePrice, currentUser));

     };


     if ( saveInProgress ) {

        return <div>...loading</div>
    } 

    if ( onSaveError ) {

        return <div> { onSaveError.message } </div> ;
    }      


    return (
        <div className="NewCourse">
        <h1>{`Welcome ${ currentUser?.username }. Create your awesome course. The world is waiting!`}</h1> 
        <br></br>
        <form onSubmit={handleSubmit}> 
            <label>
                Enter course name:
                <input
                   ref={inputRef} 
                   disabled={saveInProgress} 
                   value={courseName} 
                   onChange={(e) => setCourseName(e.target.value)}
                />
             </label>
             <label>
                   Enter course price:  
                <input
                   disabled={saveInProgress} 
                   value={coursePrice} 
                   onChange={(e) => setCoursePrice(e.target.value)}
                />        
            </label>
            <label>
                   Enter course description:  
                {/* <input
                   disabled={saveInProgress} 
                   value={coursePrice} 
                   onChange={(e) => setCoursePrice(e.target.value)}
                />         */}
            </label>
             
            { onSaveError && (
                <div className="saveError-message">
                    Error: { onSaveError.message }
                </div>
            )}; 

            <button type="submit" disabled={saveInProgress} >Create Course</button>
        </form>
    </div>
    );
};




const mapState = state => ({
    saveInProgress: state.courses.saveInProgress,
    onSaveError: state.courses.onSaveError,
});

export default connect(mapState)(NewCourse);