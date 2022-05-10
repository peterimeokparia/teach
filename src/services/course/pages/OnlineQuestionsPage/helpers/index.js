import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import {
getSortedRecords } from 'services/course/selectors';

import { 
forceReload,
setItemInSessionStorage,
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

export const upload_url = "/api/v1/fileUploads", editor_upload_url = '/api/v1/fileUploads/editor?fileName=';
 
export function uploadImageUrl( file, imageBlock, fileUploadMeta, selectedElement, saveAction ) {

    const fileData = file, blobUrl = getItemFromSessionStorage('fileUploadBlobUrl');

    if ( fileData && blobUrl ) {

    let markDownContentKey = getItemFromSessionStorage('markDownType') === 'main' ? 'markDownContent' : 'answerExplanationMarkDownContent';

    let fileNotUploaded = handleNewFileUpload( file, fileUploadMeta );

    if ( fileNotUploaded ){

      let markDownContent = selectedElement[ markDownContentKey ];

      let savedMarkedDownData = getItemFromSessionStorage('markDownContent');

      saveAction({ ...selectedElement, markDownContent: savedMarkedDownData });
     
    }
  }
};

function handleNewFileUpload( file, fileUploadMeta ) {

  const isFileUploaded = file?.data?.fileCollection?.includes(file?.data?.file);

  setItemInSessionStorage('filename', `http://localhost:3000/files/${ file?.data?.file }`);

  fileUploadMeta({ imageUploaded: isFileUploaded ? false : true, blobUrl: undefined, fileName: file?.data?.file, markDownType: null }); 
  
  return isFileUploaded;
}

// change
export function Linkssss( selectedStudents, courseId ){
    return [ 
        { id: "SavedAnswers", title: "Saved Answers", path:`student/${ selectedStudents?._id }/savedanswers`, _id: selectedStudents?._id }, 
        { id: "Grades", title: "Grades", path:`student/${ selectedStudents?._id }/grades`, _id: selectedStudents?._id }, 
        { id: "Attendance", title: "Attendance", path: `student/${ selectedStudents?._id  }/attendance`, _id: selectedStudents?._id }, 
        { id: "Session", title: "Session", path: `student/${ selectedStudents?._id  }/sessions/courseId/${courseId}`, _id: selectedStudents?._id },
      ];
};

export function getOnlineQuestion( onlineQuestionsConfig ){

    let {
      formType, 
      formName,
      formUuId,
      formBuilderStatus,
      courseId, 
      onlineQuestionId,
      onlineQuestions,
    } = onlineQuestionsConfig;

    if ( onlineQuestionId ) {
      
      return onlineQuestions?.filter(question => question?._id === onlineQuestionId);

    }

    if ( elementMeta.state.Manage === formBuilderStatus && !onlineQuestionId ) {

        let questions =  onlineQuestions?.filter( question => 
                          question?.formType === formType 
                            && question?.formName === formName 
                              && question?.formUuId === formUuId );

        return getSortedRecords( questions, 'position' );
    }

    return onlineQuestions?.
              filter( question => question?.formType === formType && question?.formName === formName );

};


export function handleChange( element, actionType, route, saveActionMw ){
  const duration = 5000;

  const timeHandler = setTimeout(() => {

    if ( element?._id ) {
      saveActionMw({ element, actionType, route });
    }
     clearTimeout( timeHandler );
  }, duration );
}

export const addQuestionConfig = ( props ) => {

  let {
    typeOfInput,
    formId,
    formType,
    formName,
    courseId,
    formUuId, 
    onlineQuestionId,
    currentUser,
    operator,
    position,
    inputFieldOptions
  } = props;

  return {
      formId,
      formType,
      formName,
      courseId,
      formUuId, 
      onlineQuestionId,
      position,
      inputType: typeOfInput,
      inputValue: null,
      userId: currentUser?._id, 
      questionCreatedBy: ( currentUser?._id ) ? ( currentUser?.firstname ) : 'anonymous', 
      operator: operator?._id,
      inputFieldOptions, 
      placeHolder: null,
      explanationPlaceHolder: "Explain answer and any concepts.",
      pointsAssigned: 0,
      pointsReceived: 0, 
      videoUrl: null,
      xAxisformQuestionPosition: 100,
      yAxisformQuestionPosition: 100,
      xAxisColumnPosition: 100,
      yAxisColumnPosition: -4,
      columnMinWidth: 100,
      columnMinHeight: 10,
      columnAlign: 'left'
  };
};