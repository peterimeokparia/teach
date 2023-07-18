import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'; 
import { addNewFormBuilder } from 'services/course/actions/formbuilders';
import { toggleOutComeFurtherStudyModal } from 'services/course/actions/outcomes';
import { handleFormDisplayName } from 'services/course/pages/FormBuilder/helpers';
import { Validations } from  'services/course/helpers/Validations';
import { toast } from 'react-toastify';
import './style.css';

const NewFormBuilderPage = ({
    saveInProgress,
    onSaveError,
    user,
    formBuilders,
    addNewFormBuilder,
    toggleOutComeFurtherStudyModal,
    formBuilderProps }) => {
    const [ formDisplayName, setFormDisplayName ] = useState('');
    const inputRef = useRef();
    let {
        operatorBusinessName,formType,formName,courseId,lessonId,formId,formUuId,createDateTime: dateTime,
        takingDateTime, createdBy, userId, status, state, eventId, outcomeId
    } = formBuilderProps;

    useEffect (() => {
        inputRef.current.focus();
    }, []); 

    if ( onSaveError ) {
        toast.error(`There was a problem while adding the new ${handleFormDisplayName(formType)}: ${ formName }: ${ onSaveError?.message }`);
    }

    const handleSubmit = e => { 
        e.preventDefault(); 

        let newBuilder = {
            operatorBusinessName, formType, formName,courseId,lessonId,formId,formUuId,createDateTime: dateTime,
            takingDateTime, createdBy, userId, status, state, eventId, outcomeId
        };
        
        addNewFormBuilder( { ...newBuilder, formDisplayName } ); 
        toggleOutComeFurtherStudyModal();
    };

    if ( saveInProgress ) {
        return <div>...loading</div>;
    } 

return (
    <div className="NewBuilder">
        <h1>{`Create new ${handleFormDisplayName(formType)}.`}</h1> 
        <br></br>
        <form onSubmit={handleSubmit}> 
            <label>
            {`Enter ${handleFormDisplayName(formType)} name:` }
                <input
                    ref={inputRef} 
                    disabled={saveInProgress} 
                    value={formDisplayName} 
                    onChange={(e) => setFormDisplayName(e.target.value)}
                />
            </label>
            {
                <div>
                    {
                        Validations?.setErrorMessageContainer()
                    }
                </div>
            }
            { onSaveError && (
                <div className="saveError-message">
                    Error: { onSaveError.message }
                </div>
            )}
            <button type="submit" disabled={saveInProgress} >{`Create ${handleFormDisplayName(formType)}`}</button>
        </form>
    </div>
); };

const mapState = (state, ownProps ) => ({
    courses: Object.values(state?.courses?.courses)?.filter(crs => crs?.operatorId === ownProps.operator?._id),
    saveInProgress: state.courses.saveInProgress,
    onSaveError: state.courses.onSaveError
});

export default connect(mapState, { addNewFormBuilder, toggleOutComeFurtherStudyModal })(NewFormBuilderPage);