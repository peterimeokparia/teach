import Select from 'react-select';
import './style.css';

const SessionScheduling = ({ 
    onChange, 
    options, 
    scheduledStudents,
    children }) => {
return (
    <div className="events">
     <h2>{`Schedule Session`}</h2> 
        <br></br>
            <form>  
                <Select
                    placeholder={`Add Student(s)`}
                    isMulti
                    value={scheduledStudents}
                    onChange={onChange}
                    options={options} 
                />
            </form>
            <br></br>
            {children}    
    </div>
); };

export default SessionScheduling;