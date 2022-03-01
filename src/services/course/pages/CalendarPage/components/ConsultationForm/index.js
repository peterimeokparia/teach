import {
courseOption,     
newCalendarEventData,
transformDateTime } from 'services/course/pages/CalendarPage/helpers';

import useConsultationFormHook from 'services/course/pages/CalendarPage/hooks/useConsultationFormHook';
import useSimpleEventHook from 'services/course/pages/CalendarPage/hooks/useSimpleEventHook';
import Select from 'react-select';

const ConsultationForm = ({
    handleSubmit,    
    saveInProgress,
    onSaveError,
    courses,
    slotInfo }) => {

    let {
        firstName, 
        setFirstName,
        lastName, 
        setLastName,
        studentsName, 
        setStudentsName, 
        email, 
        setEmail,
        phone, 
        setPhone,
        coursesInterestedIn, 
        setCoursesInterestedIn,
        inputRef
    } = useConsultationFormHook();

    let {
        start,
        end,
        duration
    } = useSimpleEventHook(slotInfo);

    if ( saveInProgress ) {
        return <div>...loading</div>;
    };
    if ( onSaveError ) {
        return <div> { onSaveError.message } </div> ;
    };

const onSubmit = (e) => {
    e.preventDefault();
};

const submitForm = () => {
    let event = {};

    event = {
        title: `Consultation with ${firstName} ${lastName}`,
        recurringEvent:false,
        allDay: false,
        start,
        end,
        duration
    };

    handleSubmit( newCalendarEventData(event, undefined, undefined, { firstName, lastName, studentsName, email, phone, coursesInterestedIn }, undefined ) );  
};

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
            <label>
              Select Courses you are interested in:
              <Select
                    placeholder={`Add Courses`}
                    isMulti
                    value={coursesInterestedIn}
                    onChange={setCoursesInterestedIn}
                    options={courseOption( courses )} 
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
); };

export default ConsultationForm;