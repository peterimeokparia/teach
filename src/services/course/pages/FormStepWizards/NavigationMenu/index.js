
import { connect } from 'react-redux';
import { toggleCourseModal } from 'services/course/actions/courses';
import { setFormWizardStep } from 'services/course/actions/app';
import { handleNavigation } from 'services/course/pages/FormStepWizards/helpers';
import Modal from 'react-modal';

const NavigationMenu = ({isModalOpen, operatorBusinessName, user, toggleCourseModal, setFormWizardStep, formWizardStep, children 
}) => {
    const handleModal = ( step ) => {
        setFormWizardStep( step );
        handleNavigation(step);
        toggleCourseModal();
    };

    const handleModalClose = () => {
        toggleCourseModal();
    };

    return (
        <div>
            {
                <>
            
                 <Modal 
                    isOpen={true} 
                    onRequestClose={() => handleModalClose()}
                > 
                     <> 
                        <div>{ `Step ${ formWizardStep }` }</div>
                        { 
                            children 
                        }
                     </>
                     
                </Modal>
                    {   <span>
                          <button onClick={() => handleModal(1)}>{'1'}</button>
                          <button onClick={() => handleModal(2)}>{'2'}</button>
                          <button onClick={() => handleModal(3)}>{'3'}</button>
                       </span>
                    }
                <div>
                    
                </div>
                
                </>
            }
        </div>
    );
};

const mapDispatch = {
    toggleCourseModal,
    setFormWizardStep
};

const mapState = ( state, ownProps )  => ({
    isModalOpen: state?.courses?.isModalOpen,
    formWizardStep: state?.app.formWizardStep
});

export default connect(mapState, mapDispatch)(NavigationMenu);