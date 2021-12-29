import Roles from 'services/course/pages/components/Roles';
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
        formType
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
          <Modal 
            isOpen={menuVisible} onRequestClose={ ( e ) => handleTogglingModal(e,  handleMouseDown) }
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
                {   // {(previewMode && formFieldElement?.questionId === previewMode?.question?._id) && previewMode?.isPreviewMode && 
                    // <Roles role={ currentUser?.role === role.Tutor } >
                    <span className="">
                        <PlusOneIcon 
                        // style={plusOneIconStyle()}
                        className="comment-round-button-2"
                        onClick={() => addGroupedFormFields( formFieldElement, currentUser )}
                        />
                        <DeleteIcon 
                        // style={iconStyle()}
                        className="comment-round-button-3"
                        onClick={() => onhandleSelected( formFieldElement )}
                        />
                    </span>
                    // </ Roles>       
                    }
                    { ( previewMode ) && 
                        <div className="points-title">
                            <div>
                                <input
                                    className="points-input"
                                    type="number" 
                                    value={ formFieldElement?.points }
                                    onChange={ e => addFieldPoints( e?.target?.value ) }
                                    // style={plusOneIconStyleHeader()}    
                                />
                            </div>
                        </div> 
                }
                { (formFieldElement?.answerKey !== null) &&
                    <div className="answer-title">
                        <label>
                            {`Answer: ${formFieldElement?.answerKey}` }
                        </label>
                    </div>
                }
                    </div>
                }
         
          </Modal>
            </>
        )}
        </MiniSideBarMenu>
    </>
    )
};

export default FormFieldPanel;