import { 
useState, 
useEffect, 
useRef } from 'react';

function useOnlineTutoringRequestFormHook(){
    const [ courseName, setCourseName ] = useState('');
    const [ immediateHelp, setImmediateHelp ] = useState( false );
    const [ getTutor, setGetATutor ] = useState( false );
    const inputRef = useRef();

    useEffect (() => {
        if ( inputRef?.current ) {
         inputRef?.current?.focus();
        }
    }, []); 
return {
    courseName, 
    immediateHelp, 
    getTutor, 
    inputRef,
    setCourseName: (val) => setCourseName(val),
    setImmediateHelp: (val) => setImmediateHelp(val),
    setGetATutor: (val) => setGetATutor(val)
}; };

export default useOnlineTutoringRequestFormHook;