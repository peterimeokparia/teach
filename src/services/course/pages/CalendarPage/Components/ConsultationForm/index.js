import 
React, { 
useState, 
useEffect, 
useRef } from 'react';

import {
transformDateTime } from 'Services/course/Pages/CalendarPage/helpers';

import './style.css';

const ConsultationForm = ({
handleSubmit,    
saveInProgress,
onSaveError,
slotInfo }) => {
    
const [ firstName, setFirstName ] = useState('');
const [ lastName, setLastName ] = useState('');
const [ studentsName, setStudentsName ] = useState('');
const [ email, setEmail ] = useState('');
const [ phone, setPhone ] = useState(''); 
const inputRef = useRef();

useEffect (() => {

    if ( inputRef ) {
        inputRef.current.focus();
    }
    
}, []); 

if ( saveInProgress ) {
    return <div>...loading</div>
} 

if ( onSaveError ) {
    return <div> { onSaveError.message } </div> ;
}

const onSubmit = (e) => {
    e.preventDefault();
}

const submitForm = () => {

const [ start, end, startStr, endStr, allDay ] = Object.entries(slotInfo);

let event = {}, dateTimeString = transformDateTime( startStr, endStr );    

event = {
    title: `Consultation with ${firstName} ${lastName}`,
    recurringEvent:false,
    allDay: false,
    start: dateTimeString?.resStartStr,
    end: dateTimeString?.resEndStr,
    duration: ( new Date( dateTimeString?.resEndStr ) - new Date( dateTimeString?.resStartStr ) )
};

handleSubmit({event, consultation:{ firstName, lastName, studentsName, email, phone }});  
}

return (
    <div className="NewCourse">
        <h2>{`Schedule your free consultation.`}</h2> 
        <br></br>
        <form onSubmit={onSubmit}> 
            <label>
                Enter first name:
                <input
                    ref={inputRef}
                    type="text" 
                    disabled={saveInProgress} 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Enter last name:
                <input
                    ref={inputRef}
                    type="text" 
                    disabled={saveInProgress} 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label> 
            <label>
                Enter email:
                <input
                    ref={inputRef}
                    type="email" 
                    disabled={saveInProgress} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label> 
            <label>
                Enter phone:
                <input
                    ref={inputRef}
                    type="phone" 
                    disabled={saveInProgress} 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                />
            </label> 
            <label>
                Enter student's name:
                <input
                    ref={inputRef}
                    type="text" 
                    disabled={saveInProgress} 
                    value={studentsName} 
                    onChange={(e) => setStudentsName(e.target.value)}
                />
            </label>               
                
            { onSaveError && (
                <div className="saveError-message">
                    Error: { onSaveError.message }
                </div>
            )}
             <button onClick={submitForm} disabled={saveInProgress} > Schedule Consultation </button>
        </form>
    </div>
)};

export default ConsultationForm;