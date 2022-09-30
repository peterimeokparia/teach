import { useState, useEffect } from 'react';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';

function useSetFormBuilderHook( formType, currentUser, loadFormBuilders,  loadTestTimers, formBuilders ) {
  const [ pendingFormsInBuildState, setPendingFormsInBuildState ] = useState([]);
  const [ publishedFormsInBuildState, setPublishedFormsInBuildState ] = useState([]);
  const [ inProgressFormsInTakingState, setInProgressFormsInTakingState ] = useState([]);
  const [ submittedFormsInTakingState, setSubmittedFormsInTakingState ] = useState([]); 
  const [ allCreatorReviewedUserSubmittedFormsInTakingState, setallCreatorReviewedUserSubmittedFormsInTakingState ] = useState([]);
  const [ allUserSubmittedFormsForCreatorReviewInTakingState, setAllUserSubmittedFormsForCreatorReviewInTakingState ] = useState([]);
  const [ currentUsersSubmittedFormsInTakingState, setCurrentUsersSubmittedFormsInTakingState ] = useState([]);
  const [ creatorReviewedUserSubmittedFormsInTakingState, setCreatorReviewedUserSubmittedFormsInTakingState ] = useState([]); 
  const [ userSubmittedFormsForCreatorReviewInTakingState, setUserSubmittedFormsForCreatorReviewInTakingState ] = useState([]);
  const [ formsInBuildState, setFormsInBuildState ] = useState([]); 
  const [ formsInUse, setFormsInUse ] = useState([]); 
  // there are duplicates...to fix
  // If there are submitted tests we can't modify the form. Create copy... but we can modify reports, surveys etc

  useEffect(() => { // filter by user Id appropriately
    loadFormBuilders();
    loadTestTimers();
    let formBuildersInBuildState = formBuilders?.filter(form => form?.formType === formType && form?.state === elementMeta.state.Manage && form?.status === elementMeta.status.Pending && form?.createdBy === currentUser?._id && form?.userId === currentUser?._id );
    
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
    let submittedForms = formBuilders?.filter(form => form?.formType === formType &&  form?.state === elementMeta.state.Taking && form?.status === elementMeta.status.Review && form?.userId === currentUser?._id);

    if ( submittedForms ) {
      setSubmittedFormsInTakingState( submittedForms );
    }
    let allCurrentUsersSubmittedForms = formBuilders?.filter(form => form?.formType === formType && form?.state === elementMeta.state.Taking && form?.status === elementMeta.status.Review && form?.createdBy === currentUser?._id);

    if ( allCurrentUsersSubmittedForms ) {
      setCurrentUsersSubmittedFormsInTakingState( allCurrentUsersSubmittedForms );
    }
    let allUserSubmittedFormsForCreatorReview = formBuilders?.filter(form => form?.formType === formType && form?.state === elementMeta.state.Taking && form?.status === elementMeta.status.Review && form?.createdBy === currentUser?._id );

    if ( allUserSubmittedFormsForCreatorReview ) {
      setAllUserSubmittedFormsForCreatorReviewInTakingState( allUserSubmittedFormsForCreatorReview );
    }
    let allCreatorReviewedUserSubmittedForms = formBuilders?.filter(form => form?.formType === formType && form?.state === elementMeta.state.Manage && form?.status === elementMeta.status.Reviewed && form?.createdBy === currentUser?._id );

    if ( allCreatorReviewedUserSubmittedForms ) {
      setallCreatorReviewedUserSubmittedFormsInTakingState( allCreatorReviewedUserSubmittedForms );
    }
    let userSubmittedFormsForCreatorReview = formBuilders?.filter(form => form?.formType === formType && form?.state === elementMeta.state.Taking && form?.status === elementMeta.status.Review && form?.userId === currentUser?._id );

    if ( userSubmittedFormsForCreatorReview ) {
      setUserSubmittedFormsForCreatorReviewInTakingState( userSubmittedFormsForCreatorReview );
    }
    let creatorReviewedUserSubmittedForms = formBuilders?.filter(form => form?.formType === formType && form?.state === elementMeta.state.Manage && form?.status === elementMeta.status.Reviewed && form?.userId === currentUser?._id );

    if ( creatorReviewedUserSubmittedForms ) {
      setCreatorReviewedUserSubmittedFormsInTakingState( creatorReviewedUserSubmittedForms );
    }
    let currentFormsToUse = formBuilders.filter(form => form?.formType === formType && form?.state === elementMeta.state.Manage && form?.status === elementMeta.status.Published );

    if ( currentFormsToUse ) {
      setFormsInBuildState( currentFormsToUse );
    }
    let formsInUse = formBuilders.filter(form => form?.formType === formType && form?.state === "Started");

    if ( formsInUse ) {
      setFormsInUse( formsInUse );
    }
  }, []);
  // }, [ currentUser?._id, formBuilders, formType, loadFormBuilders, loadTestTimers ]);
    
return {
  creatorReviewedUserSubmittedFormsInTakingState,
  userSubmittedFormsForCreatorReviewInTakingState,
  pendingFormsInBuildState,
  publishedFormsInBuildState,
  inProgressFormsInTakingState,
  submittedFormsInTakingState,  
  allCreatorReviewedUserSubmittedFormsInTakingState,
  allUserSubmittedFormsForCreatorReviewInTakingState,
  currentUsersSubmittedFormsInTakingState,
  formsInBuildState,
  formsInUse
}; };

export default useSetFormBuilderHook;