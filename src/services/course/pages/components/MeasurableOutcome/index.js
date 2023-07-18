import { connect } from 'react-redux';
import { getLessonOutcomesByLessonId } from 'services/course/selectors';
import useMeasurableOutcomeHook from 'services/course/pages/components/MeasurableOutcome/hooks/useMeasurableOutcomeHook';
import './style.css';
    
const MeasurableOutcome = ({ 
    operatorBusinessName,
    currentUser,
    previewMode,
    selectedQuestion, 
    lessonId,
    outcomes }) => {      
    let {
        closeModal,
        measurableOutcomes,
        handleModalClose,
        handleOutcomeSelection
    } = useMeasurableOutcomeHook( previewMode, lessonId, selectedQuestion );
    
return (   
<div className="" >
 { ( !closeModal ) && <div className="content">
     <div className={"outcomes"}>
        <div className="row row-cols-2">
            <div className="cols outcomes-text">
            { ( selectedQuestion?.assignedOutcomes.length > 0 )  ? "Edit outcome" : "Assign at least one outcome" } 
            </div>
            { ( selectedQuestion?.assignedOutcomes.length > 0 || measurableOutcomes.length > 0 ) &&  
                <div className="cols outcomes-exit">
                    <button className="" onClick={handleModalClose}>{"X"}</button>
                </div>
            }
        </div>
        { ( outcomes.length > 0 ) && <div className="row">
            { outcomes.map( outcome => ( 
                <label>
                { outcome?.title  } 
                    <input 
                        type={ 'checkbox' }
                        onChange={ e => handleOutcomeSelection( e, selectedQuestion ) }
                        checked={ measurableOutcomes.includes( outcome?.title ) }
                        value={ outcome?.title }
                    />  
                </label>
            ))}
            </div>
        }
        </div> 
        </div>
 }
</div>
 );
};

const mapState = ( state, ownProps )   => {
    return {
        currentUser: state.users.user,
        outcomes: getLessonOutcomesByLessonId( state, ownProps )
    };
};

export default connect(mapState, null )( MeasurableOutcome );