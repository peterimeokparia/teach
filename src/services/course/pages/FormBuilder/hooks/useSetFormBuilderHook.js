import { 
useState,
useEffect } from 'react';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

function useSetFormBuilderHook( formType, currentUser, loadFormBuilders,  loadTestTimers, formBuilders ) {

  const [ pendingFormsInBuildState, setPendingFormsInBuildState ] = useState([]);
  const [ publishedFormsInBuildState, setPublishedFormsInBuildState ] = useState([]);
  const [ inProgressFormsInTakingState, setInProgressFormsInTakingState ] = useState([]);
  const [ submittedFormsInTakingState, setSubmittedFormsInTakingState ] = useState([]); 
  const [ allSubmittedFormsInSubmittedState, setAllSubmittedFormsInSubmittedState ] = useState([]);
  const [ currentUsersSubmittedFormsInSubmittedState, setCurrentUsersSubmittedFormsInSubmittedState ] = useState([]);
  const [ formsInBuildState, setFormsInBuildState ] = useState([]); 
  const [ formsInUse, setFormsInUse ] = useState([]); 

  // If there are submitted tests we can't modify the form. Create copy... but we can modify reports, surveys etc
  useEffect(() => { // filter by user Id appropriately

    loadFormBuilders();

    loadTestTimers();

    let formBuildersInBuildState = formBuilders?.filter(form => form?.formType === formType &&  form?.state === elementMeta.state.Manage && form?.status === elementMeta.status.Pending);

    if ( formBuildersInBuildState ) {
      setPendingFormsInBuildState( formBuildersInBuildState );
    }

    let formsInPublisedState = formBuilders?.filter(form => form?.formType === formType &&  form?.state === elementMeta.state.Manage && form?.status === elementMeta.status.Published);

    if ( formsInPublisedState ) {
      setPublishedFormsInBuildState( formsInPublisedState );
    }

    let formBuildersInPendingState =  formBuilders.filter(form => form?.formType === formType && form?.state === elementMeta.state.Taking && form?.status === elementMeta.status.InProgress && form?.userId === currentUser?._id );

    if ( formBuildersInPendingState ) {
      setInProgressFormsInTakingState( formBuildersInPendingState );
    }

    let submittedForms = formBuilders?.filter(form => form?.formType === formType &&  form?.state === elementMeta.state.Taking && form?.status === elementMeta.status.Submitted && form?.userId === currentUser?._id);

    if ( submittedForms ) {
      setSubmittedFormsInTakingState( submittedForms );
    }

    let allCurrentUsersSubmittedForms = formBuilders?.filter(form => form?.formType === formType && form?.state === elementMeta.state.Submitted && form?.status === elementMeta.status.Submitted && form?.userId === currentUser?._id);

    if ( allCurrentUsersSubmittedForms ) {

      setCurrentUsersSubmittedFormsInSubmittedState( allCurrentUsersSubmittedForms );
    }

    let allSubmittedForms = formBuilders?.filter(form => form?.formType === formType && form?.state === elementMeta.state.Submitted && form?.status === elementMeta.status.Submitted && form?.createdBy === currentUser?._id);

    if ( allSubmittedForms ) {

      setAllSubmittedFormsInSubmittedState( allSubmittedForms )
    }

    let currentFormsToUse = formBuilders.filter(form => form?.formType === formType && form?.state === elementMeta.state.Manage );

    if ( currentFormsToUse ) {
      setFormsInBuildState( currentFormsToUse );
    }

    let formsInUse = formBuilders.filter(form => form?.formType === formType && form?.state === "Started");

    if ( formsInUse ) {
      setFormsInUse( formsInUse );
    }

  }, []);
    
return {
  pendingFormsInBuildState,
  publishedFormsInBuildState,
  inProgressFormsInTakingState,
  submittedFormsInTakingState,  
  allSubmittedFormsInSubmittedState,
  currentUsersSubmittedFormsInSubmittedState,
  formsInBuildState,
  formsInUse
}; };

export default useSetFormBuilderHook;