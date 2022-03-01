import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import {
getSortedRecords } from 'services/course/selectors';
      
export const upload_url = "http://localhost:9005/api/v1/fileUploads";

export async function uploadImageUrl( file, imageBlock, question, saveAction ) { // this behavior may have changed in the new Dante editor
  await fetch( imageBlock?.img?.currentSrc )
          .then( result => result.blob())
          //.then( response => { uploadFiles([ response ], question, upload_url, "questions", file?.name,  null )
          //.then( resp => { console.log( resp ); } ); })
          .catch( error => { throw Error(`  ${error}`); });
          let inputFieldObject = JSON.parse( question )[ elementMeta.markDownContent ];

          Object.values(inputFieldObject)?.forEach( block => {
          if ( Object.keys( block ).length > 0 ) {
              block.find( obj => obj?.type === "image" && obj?.data?.url === imageBlock?.img?.currentSrc ).data.url = `http://localhost:3000/files/${ file?.name }`;
          } });
      
          question[ elementMeta.markDownContent ] = JSON.stringify( inputFieldObject );  
          saveAction( { ...question } );
};

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

    switch ( onlineQuestionId ) {
      case ( onlineQuestionId !== undefined ) :
        return onlineQuestions?.filter( question => question?.courseId === courseId 
          && question?.formType === formType 
            && question?.formName === formName ).
             filter(question => question?._id === onlineQuestionId);

      case (onlineQuestionId === undefined && courseId !== undefined ):
        return onlineQuestions?.filter( question => question?.courseId === courseId 
          && question?.formType === formType 
            && question?.formName === formName );

      case (onlineQuestionId === undefined && courseId === undefined ):
        return onlineQuestions?.filter( question => 
          question?.formType === formType 
            && question?.formName === formName );

      default:

        if ( elementMeta.state.Manage === formBuilderStatus ) {

           let questions =  onlineQuestions?.filter( question => 
                              question?.formType === formType 
                                && question?.formName === formName 
                                 && question?.formUuId === formUuId );

           return getSortedRecords( questions, 'position' );
        }

        return onlineQuestions?.
            filter( question => question?.formType === formType && question?.formName === formName );
    }
};

export function handleChange( editor, element, storeName, actionMarkDown, saveQuestion, setMarkDown ){
    let duration = 2000;  
    
    setMarkDown(
      element, 
      editor.getHTML(), 
      { propNameOne: storeName,  propNameTwo: storeName }, 
      actionMarkDown, 
      saveQuestion, 
      duration
    );
  };

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