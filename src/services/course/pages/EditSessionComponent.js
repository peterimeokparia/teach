import React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
deleteSession } from '../actions';

import './NewLessonPage.css';



const EditSessionComponent = ({
session,
error,
className,
onSubmit,
deleteSession, 
children }) => {

        
let numberOfSessionsInitialValue = session ? session?.numberOfSessions : '';
let totalNumberOfSessionsInitialValue = session ? session?.totalNumberOfSessions : '';
const [ editing, setEditing ] = useState(false);
const [ numberOfSessions, setNumberOfSessions ] = useState(numberOfSessionsInitialValue);
const [ totalNumberOfSessions, setTotalNumberOfSessions ] = useState(totalNumberOfSessionsInitialValue);
const inputRef = useRef();



const reset = () => {
    setTotalNumberOfSessions(totalNumberOfSessionsInitialValue);
    setNumberOfSessions(numberOfSessionsInitialValue);
    setEditing(false);
}


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
}


const beginEditing = () => {
    setValues();
    setEditing(true);
}


const performDelete = () => {
    deleteSession(session);
}


const cancelEdit = (e) => {
    e.preventDefault();
    reset();

}
 

useEffect (() => {

       if ( editing ) {

           inputRef.current.focus();

       }

}, [ editing ]); 




return editing ? (
           <>
                  <form
                    className= {`${className || ''} editing ${error ? 'error' : ''}`}
                    onSubmit={commitEdit}           
                    >
                    <label>
                        <b> Number of Sessions </b>
                    <input 
                        name="lessondate"
                        ref={ inputRef }
                        value={ numberOfSessions }
                        type="number"
                        onChange={ e => setNumberOfSessions( e.target.value) }
            
                    />
                    </label>  

                    <label>
                        <b>  Total Number of Sessions </b>
            
                    <input 
                        ref={ inputRef }
                        value={ totalNumberOfSessions }
                        type="number"
                        onChange={ e => setTotalNumberOfSessions( e.target.value) }
                 
                    />

                    </label>

                <input
                    ref={ inputRef }
                    name="submit"
                    type="submit"
                    value={'Submit'}
                    onChange={ commitEdit }
                >
                </input> 

                </form>

                <form
                    className= {`${className || ''} editing ${error ? 'error' : ''}`} 
                >
                        <input
                            ref={ inputRef }
                            name="reset"
                            type="submit"
                            value={'Reset'}
                            onChange={ cancelEdit }
                        >
                    </input> 

                </form>
                   {error && <div>{error.message}</div>}
           </>
            ) : ( 
                   children(beginEditing, performDelete)
                );         
                
};




export default connect(null, { deleteSession} )(EditSessionComponent);