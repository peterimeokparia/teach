import {
connect } from 'react-redux';

import {
loadFormBuilders,
saveFormBuilder } from 'services/course/actions/formbuilders';

import { 
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';
  
import { 
DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';


const OnlineListItems = ({ 
  currentCourseQuestions,
  builderState,
  formName,
  formBuilder,
  contentUpdated,
  saveFormBuilder,
  loadFormBuilders,
  saveOnlineQuestions,
  currentUser,
  children }) => {

  function handleOnDragEnd(result) {

    if (!result.destination) return;

    const items = Array.from(currentCourseQuestions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    let temp = [];

    items.splice(result.destination.index, 0, reorderedItem);

    if ( builderState ===  elementMeta.state.Manage ) {

      items.forEach( ( element, index ) => { 

         let repositionedItem = { ...element, position: ( index + 1 ) };

         temp.push( repositionedItem );

         saveOnlineQuestions(  repositionedItem );

      }); 
      
    }
  
    saveFormBuilder({ ...formBuilder, orderedFormQuestions: temp } );

    loadFormBuilders();
    
  }

  return( 
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="updatedOrderedQuestions">
        {(provided) => (
          <ul className="updatedOrderedQuestions" { ...provided.droppableProps } ref={ provided.innerRef }>
            {  currentCourseQuestions?.map((element, index) => { return( <Draggable key={element?._id} draggableId={element?._id} index={index}>
              {(provided) => (
                      <li id={element?._id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {
                          children( element )            
                        }  
                      </li>
                )}
               </Draggable> 
             )} 
            )} 
             {provided.placeholder}
        </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications ),
    courses: Object.values( state?.courses?.courses ),
    contentUpdated: state?.onlineQuestions?.contentUpdated,
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted,
    formFields: Object.values(state.formFields.formFields).filter( field => field?.formId === ownProps?.onlineQuestionProps?.courseId),
  };
};

export default  connect( mapState, { saveFormBuilder, saveOnlineQuestions, loadFormBuilders } )(OnlineListItems);
  
  