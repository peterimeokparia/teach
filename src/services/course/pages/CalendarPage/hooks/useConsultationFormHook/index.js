import { 
useState, 
useEffect, 
useRef } from 'react';

function useConsultationFormHook(){
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ studentsName, setStudentsName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState(''); 
    const [ coursesInterestedIn, setCoursesInterestedIn ] = useState([]);
    const inputRef = useRef();

useEffect (() => {
    if ( inputRef ) {
        inputRef?.current?.focus();
    }
}, []); 

return {
    firstName, 
    lastName, 
    studentsName, 
    email, 
    phone, 
    coursesInterestedIn, 
    inputRef,
    setFirstName:(val) => setFirstName(val),
    setLastName: (val) => setLastName(val),
    setStudentsName: (val) => setStudentsName(val),
    setEmail: (val) => setEmail(val),
    setPhone: (val) => setPhone(val),
    setCoursesInterestedIn: (val) => setCoursesInterestedIn(val)
}; };

export default useConsultationFormHook;