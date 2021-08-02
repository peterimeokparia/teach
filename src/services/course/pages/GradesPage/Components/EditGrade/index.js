import { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
deleteGrade } from 'services/course/actions/grades';

const EditGrade = ({
    grade,
    error,
    className,
    onSubmit,
    deleteGrade, 
    children }) => {
    let scoreInitialValue = grade ? grade?.score : '';
    let dateInitialValue = grade ? grade?.testDate : Date.now(); 
const [ editing, setEditing ] = useState(false);
const [ testDate, setTestDate ] = useState(dateInitialValue);
const [ testScore, setTestScore ] = useState(scoreInitialValue);
const inputRef = useRef();

const reset = () => {
    setTestDate(dateInitialValue);
    setTestScore(scoreInitialValue);
    setEditing(false);
};

const commitEdit = (e) => {
    e.preventDefault();
    onSubmit( testDate, testScore )
    .then(reset)
    .catch( error => {
        setEditing(false);
        setEditing(true);
    });
 };

const setValues = () => {
    setTestDate(dateInitialValue);
    setTestScore(scoreInitialValue);
};

const beginEditing = () => {
    setValues();
    setEditing(true);
};

const performDelete = () => {
     deleteGrade(grade);
};

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
};
 
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
                        <b> Test Date </b>
                    <input 
                        name="lessondate"
                        ref={ inputRef }
                        value={ testDate }
                        type="date"
                        onChange={ e => setTestDate( e.target.value) }
                    />
                    </label>  
                    <label>
                        <b>  Test Score </b>
                    <input 
                        ref={ inputRef }
                        value={ testScore }
                        type="number"
                        onChange={ e => setTestScore( e.target.value) }   
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

export default connect(null, { deleteGrade } )(EditGrade);