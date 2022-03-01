import PlusOneIcon from '@material-ui/icons/PlusOne';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from 'services/course/pages/components/SubscriptionComponent/MiniSideBarButton';
import Modal from 'react-modal';
import './style.css';

const FormFieldPanel = ({ props }) => {

    let {
        previewMode,
        formFieldElement,
        handleTogglingModal,
        currentUser,
        addGroupedFormFields,
        onhandleSelected,
        addFieldPoints,
        formType,
        moveInputField,
        setMoveInputField
    } = props;

return(
    <>
        <MiniSideBarMenu question={ formFieldElement } formType={formType} >
        {( handleMouseDown, menuVisible ) => (
            <>
            <MiniSideBarButton
                mouseDown={ handleMouseDown }
                navMenuVisible={ menuVisible } 
            />
          <Modal isOpen={menuVisible} onRequestClose={ ( e ) => handleTogglingModal(e,  handleMouseDown) }
            style={{
                overlay: {
                backgroundColor: 'skyblue',
                opacity: 0.95
                },
                content: {
                width: '25%',
                height: '25%',
                "marginTop": "20%",
                "marginLeft": "37%",
                }
              }}
            > 
            {  <div className="modal-content">
                {   
                    <span className="">
                        <PlusOneIcon 
                            className="comment-round-button-2"
                            onClick={() => addGroupedFormFields( formFieldElement )}
                        />
                        <DeleteIcon 
                            className="comment-round-button-3"
                            onClick={() => onhandleSelected( formFieldElement )}
                        />
                    </span>  
                }
                { ( previewMode ) && 
                    <div className="points-title">
                        <div>
                            <input
                                className="points-input"
                                type="number" 
                                value={ formFieldElement?.points }
                                onChange={ e => addFieldPoints( e?.target?.value ) } 
                            />
                        </div>
                    </div> 
                }
                { (formFieldElement?.answerKey !== null) &&
                    <div className="answer-title">
                        <label>
                            {`Answer: ${ formFieldElement?.answerKey }` }
                        </label>
                    </div>
                }
                    </div>
            }
          </Modal>
        </>
        )}
        </MiniSideBarMenu>
        <span className={'on-top-right'}>
        <button  className={moveInputField ? 'button-handle' : 'button-handle-move'} 
            onClick={ () => setMoveInputField( !moveInputField ) } /> 
        </span> 
    </>
    )
};

export default FormFieldPanel;