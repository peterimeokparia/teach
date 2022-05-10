import { 
useState, 
useRef, 
useEffect } from 'react';

import { 
navigate } from '@reach/router';

import { 
loadUsers } from 'services/course/actions/users';

import { 
deleteSession } from 'services/course/actions/sessions';

import { 
useDispatch } from 'react-redux';

function useSessionHook( sessionProps ){
    const dispatch = useDispatch();
    let { session, onSubmit, users } = sessionProps;

    let numberOfSessionsInitialValue = session ? session?.numberOfSessions : '';
    let totalNumberOfSessionsInitialValue = session ? session?.totalNumberOfSessions : '';
    const [ editing, setEditing ] = useState(false);
    const [ numberOfSessions, setNumberOfSessions ] = useState(numberOfSessionsInitialValue);
    const [ totalNumberOfSessions, setTotalNumberOfSessions ] = useState(totalNumberOfSessionsInitialValue);
    const [ password, setPassword ] = useState('');  
    const inputRef = useRef();

    useEffect (() => {
        if ( editing ) {
            inputRef.current.focus();
        }
        dispatch(loadUsers()); 
    }, [ editing, loadUsers ]); 
    
const reset = () => {
    setTotalNumberOfSessions(totalNumberOfSessionsInitialValue);
    setNumberOfSessions(numberOfSessionsInitialValue);
    setEditing(false);
};

const commitEdit = (e) => {
    e.preventDefault();
    onSubmit( numberOfSessions, totalNumberOfSessions )
        .then(reset)
        .catch( error => {
        setEditing(false);
        setEditing(true);
    });
};

const setValues = () => {
    setNumberOfSessions(numberOfSessionsInitialValue);
    setTotalNumberOfSessions(totalNumberOfSessionsInitialValue);
};

const beginEditing = () => {
    setValues();
    setEditing(true);
};

const performDelete = () => {
    dispatch(deleteSession(session));
};

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
};
        
const handleOnChange = (event) => {
    setPassword(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();

    if ( password &&   users?.find( authenticateUser => authenticateUser?.password === password)) {   
        navigate('');
    }
    else {
        return ( <div> Retry. Wrong password entered.</div>);
    }
};

return {
    inputRef,
    password,
    editing,
    numberOfSessions,
    totalNumberOfSessions,
    beginEditing: () => beginEditing(), 
    performDelete: () => performDelete(), 
    cancelEdit: (val) => cancelEdit(val), 
    commitEdit: (val) => commitEdit(val), 
    setNumberOfSessions: (val) => setNumberOfSessions(val), 
    setTotalNumberOfSessions: (val) => setTotalNumberOfSessions(val), 
    handleSubmit: (val) => handleSubmit(val),
    handleOnChange: (val) => handleOnChange(val)
    };
};

export default useSessionHook;