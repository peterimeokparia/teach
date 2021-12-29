import {
useState,
useEffect } from 'react';

import {
connect } from 'react-redux';

import {
addNewFormBuilder,
saveFormBuilder,
loadFormBuilders,
loadPagedFormBuilders } from 'services/course/actions/formbuilders';

import { 
addTime,
saveTime,
loadTestTimers } from 'services/course/actions/countdowntimer';

import { 
role } from 'services/course/helpers/PageHelpers';

import Modal from 'react-modal';
import FloatingActionButtonZoom from 'services/course/pages/components/FloatingActionButtonZoom';
import 'services/course/pages/FormBuilder/formStyles/quizz/style.css';
import 'services/course/pages/FormBuilder/formStyles/report/style.css';

// Save Test( Course ) / Quizz( Lessons )
// Continue Test / Quizz
// Test Conclusion / Quizz Conclusion
const FormBuilder = ({
    operatorBusinessName,
    currentUser,
    formBuilders,
    formType,
    formName,
    formUuId,
    userId,
    courseId,
    lessonId,
    formId,
    addNewFormBuilder,
    saveFormBuilder,
    loadFormBuilders,
    loadPagedFormBuilders,
    addTime,
    saveTime,
    formBuilders2,
    eraBuilder,
    loadTestTimers, 
    timer,
    currentUserTimer,
    allTimers }) => {

    const [ isOpen, setIsOpen ] = useState( true ); 
    const [ pendingFormsInBuildState, setPendingFormsInBuildState ] = useState([]);
    const [ publishedFormsInBuildState, setPublishedFormsInBuildState ] = useState([]);
    const [ inProgressFormsInTakingState, setInProgressFormsInTakingState ] = useState([]);
    const [ submittedFormsInTakingState, setSubmittedFormsInTakingState ] = useState([]); 
    const [ allSubmittedFormsInTakingState, setAllSubmittedFormsInTakingState ] = useState([]);
    const [ formsInBuildState, setFormsInBuildState ] = useState([]); 
    const [ formsInUse, setFormsInUse ] = useState([]); 

    // If there are submitted tests we can't modify the form. Create copy...
    useEffect(() => { // filter by user Id appropriately

      loadFormBuilders();

      loadTestTimers();

      let formBuildersInBuildState = formBuilders?.filter(form => form?.formType === formType &&  form?.state === "Manage" && form?.status === "Pending");

      if ( formBuildersInBuildState ) {
        setPendingFormsInBuildState( formBuildersInBuildState );
      }

      let formsInPublisedState = formBuilders?.filter(form => form?.formType === formType &&  form?.state === "Manage" && form?.status === "Published");

      if ( formsInPublisedState ) {
        setPublishedFormsInBuildState( formsInPublisedState );
      }

      let formBuildersInPendingState =  formBuilders.filter(form => form?.formType === formType && form?.state === "Taking" && form?.status === "InProgress" && form?.userId === currentUser?._id );

      if ( formBuildersInPendingState ) {
        setInProgressFormsInTakingState( formBuildersInPendingState );
      }

      let submittedForms = formBuilders?.filter(form => form?.formType === formType &&  form?.state === "Taking" && form?.status === "Submitted" && form?.userId === currentUser?._id);

      if ( submittedForms ) {
        setSubmittedFormsInTakingState( submittedForms );
      }

      let allSubmittedForms = formBuilders?.filter(form => form?.formType === formType &&  form?.state === "Taking" && form?.status === "Submitted" && form?.createdBy === currentUser?._id);

      if ( allSubmittedForms ) {
        setAllSubmittedFormsInTakingState( allSubmittedForms )
      }

      let currentFormsToUse = formBuilders.filter(form => form?.formType === formType && form?.state === "Manage" && ![ "Pending", "Published" ]?.includes( form?.status ));

      if ( currentFormsToUse ) {
        setFormsInBuildState( currentFormsToUse );
      }

      let formsInUse = formBuilders.filter(form => form?.formType === formType && form?.state === "Started");

      if ( formsInUse ) {
        setFormsInUse( formsInUse );
      }

    }, []);

    let props = {
      operatorBusinessName,
      currentUser,
      loadPagedFormBuilders,
      formBuilders,
      formsInBuildState,
      formsInUse,
      pendingFormsInBuildState,
      pendingFormsInBuildState,
      publishedFormsInBuildState,
      inProgressFormsInTakingState,
      submittedFormsInTakingState,
      allSubmittedFormsInTakingState,
      formType,
      formName,
      formId,
      formUuId,
      userId,
      courseId,
      lessonId,
      addNewFormBuilder,
      saveFormBuilder,
      addTime,
      saveTime,
      loadTestTimers,
      timer,
      currentUserTimer,
      allTimers
    };

  function handleTogglingModal(  ){
    setIsOpen( !isOpen );
  };

  return <Modal 
    isOpen={isOpen}
    style={{
      overlay: {
      backgroundColor: 'skyblue',
      opacity: 0.95
      },
      content: {
      width: '96%',
      height: '95%',
      overflow: 'hidden',
      // "marginLeft": "1%",
      }
    }}
    >
    {
      <div className="modal-header"><h2>{`${ props?.formType?.toUpperCase()}`}</h2></div>
    }
    {  
      <div className="modal-content">
        <FloatingActionButtonZoom props={props}/>    
      </div>
    }    
    </Modal>
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    formBuilders: Object.values( state.formBuilders?.formBuilders ),
    formBuilders2: state.formBuilders?.formBuilders,
    eraBuilder: state.formBuilders?.builders,
    timer: Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.formName && timer?.role === role?.Tutor ),
    allTimers: Object?.values( state?.timers?.timers ),
  };
};

export default connect( mapState, { addNewFormBuilder, saveFormBuilder, loadFormBuilders, addTime, saveTime, loadTestTimers, loadPagedFormBuilders } )(FormBuilder);
