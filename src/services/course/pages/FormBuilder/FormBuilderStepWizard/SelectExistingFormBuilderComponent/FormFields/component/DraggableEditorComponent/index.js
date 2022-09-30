import { useState } from 'react';
import { connect } from 'react-redux';
import { setElementContentFromEditorState } from 'services/course/editor/MyEditorTest2/helpers';
import { FORMFIELD_MARKDOWN, loadFormFields  } from 'services/course/actions/formfields';
import { role } from 'services/course/helpers/PageHelpers';
import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useFormFieldEditorComponentHook from 'services/course/pages/FormBuilder/hooks/useFormFieldEditorComponentHook';
import useDraggableEditorComponent from 'services/course/pages/FormBuilder/hooks/useDraggableEditorComponent';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css';

const DraggableEditorComponent = ({
  currentUser,
  draggableListItemProps,
  formFields,
  fieldProps,
  previewMode, 
  selectedQuestion,
  formFieldElement,
  loadFormFields,
  saveProgress,
  readOnly }) => {
  const [ inputValue, setInputValue ] = useState('');




  let {
    handleFieldMoved   
  } = draggableListItemProps;

  let { 
    formField 
  } = useDraggableEditorComponent( loadFormFields, formFields, formFieldElement );

  let {
    handleEditor 
  } = useFormFieldEditorComponentHook( FORMFIELD_MARKDOWN );

return (
         <div className="drag-custom-answer">
             { 
                <>     
                { 
                 <div>
                  {  
                    <SidePanelDrawer
                      fieldProps={{...fieldProps, ...draggableListItemProps } } 
                      previewMode={ previewMode } 
                      formFieldElement={formFieldElement}
                      selectedQuestion={selectedQuestion}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                    />
                  }  
                  <div className="drag-answer-content"> 
                  <div className={( currentUser.role === role.Student ) ? "drag-answer-content-overlay": ""}/>
                   <Card sx={{ minWidth: 157  }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                        <MyEditorTest2  
                          element={ formField } 
                          content={ formField?.markDownContent } 
                          readOnly={ readOnly } // form builder status is manage
                          showMenuButtons={ previewMode  } 
                          setElementContentFromEditorState={ editorState => setElementContentFromEditorState( handleEditor, editorState, formField ) }
                        />   
                      </Typography>
                    </CardContent>
                  </Card> 
                </div>     

                </div>
                }
                </>      
             }
        </div>
    );
};

const mapState = ( state, ownProps ) => { 
  return {
    formFields: Object.values(state.formFields?.formFields),
    currentUser: state.users.user,
    currentUsers: Object.values( state.users.users ),
    formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
    saveProgress: state?.formFields?.saveInProgress  
  };
};

export default connect( mapState, { loadFormFields } )( DraggableEditorComponent );
