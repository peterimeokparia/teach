import { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
Rnd } from 'react-rnd';

import { 
addNewFormField,
saveFormField,
loadFormFields,
deleteFormField } from 'Services/course/Actions/FormFields';

import { 
setMarkDown } from 'Services/course/helpers/EditorHelpers'; 
    
import {
SET_FORMFIELDS_MARKDOWN } from 'Services/course/Actions/FormFields';

import { 
navigate } from '@reach/router';

import {
elementMeta,  
editorContentType } from 'Services/course/Pages/QuestionsPage/helpers';

import {
manageFormFieldCollection } from 'Services/course/Pages/TestBuilder/helpers';

import {
upload_url, 
uploadImageUrl } from 'Services/course/Pages/OnlineQuestionsPage/helpers';

import { 
getSelectedOnlineAnswersByCourseId } from 'Services/course/Selectors';

// import {
// pageNavigationHelper } from './helpers';

import {
videoMeta,
plusOneIconStyle,
iconStyleMain,
iconStyle } from './inlineStyles';

import RadioButton from 'Services/course/Pages/TestBuilder/FormFields/Components/RadioButton';
import DropDown from 'Services/course/Pages/TestBuilder/FormFields/Components/DropDown';
import MaterialUiVideoComponent from 'Services/course/Pages/Components/MaterialUiVideoComponent';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditorComponent from 'Services/course/Pages/Components/EditorComponent';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import DeleteIcon from '@material-ui/icons/Delete';
import NotesIcon from '@material-ui/icons/Notes';
import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';
import moment from "moment";
import ListItem from 'Services/course/Pages/Components/ListItem';
import './style.css';
    
const FormFields = ({ 
    operatorBusinessName,
    courseId,
    currentUser,
    currentUsers,
    question,
    addNewFormField,
    saveFormField,
    loadFormFields,
    deleteFormField,
    formfields,
    formfieldsTest,
    videoComponentMeta,
    setMarkDown,
    children }) => {
    const [ contentChanged, setContentChanged ] = useState( undefined );
    const [ elementPosition, setElementPostion ] = useState([{}]);
    const [ testPosition, setTestPosition ] = useState({xaxis: 10, yaxis: 10});
    const [ previewMode, togglePreviewMode ] = useState(false);

    useEffect(() => { 
        loadFormFields();
        if ( contentChanged ) {
        loadFormFields();
        setContentChanged( false );
        }
    }, [ formfieldsTest?.length, loadFormFields, contentChanged, setContentChanged, previewMode ] );   

    if ( !formfieldsTest ) {
        return  <span className="">
                {
                    <PlusOneIcon 
                    style={plusOneIconStyle()}
                    className="comment-round-button-2"
                    onClick={() => addFormField()}
                    />
                }
                </span>;  
    }; 
    
function addFormField( element ){
    let config = {
    question: { _id: "001" },
    //question: questionId,
    answerId: "002",
    formFieldGroupId: "PARENTID",
    enableFormFieldGroup: false,
    inputType: "text",
    inputValue: "",
    labelType: "Roman",
    labelValue: "",
    formFieldCreatedOnDateTime: Date.now(),
    formFieldCreatedBy: currentUser?._id,
    markDownContent: null,  
    xAxisformFieldPosition: 0,
    yAxisformFieldPosition: 0,
    files: [],
    videoUrl: ""
    };

    addNewFormField( manageFormFieldCollection( config ) );
    setContentChanged( true );
};

const onhandleSelected = ( selected ) => {
    deleteFormField( selected );
    setContentChanged( true );
};
    
// const goToBlackBoard = ( answer ) => {
//     navigate(pageNavigationHelper.homeWorkAskQuestionBoard( operatorBusinessName, courseId, answer));
// };

const saveRecording = ( selectedElement ) => {
};


const toggleSetPreviewMode = () => {
    alert('test toggle preview')
    alert(previewMode.toString())
    togglePreviewMode( !previewMode );
};

function handleChange( editor, element ){
    let duration = 2000;  

    // setMarkDown(
    // element, 
    // editor.getHTML(), 
    // { propNameOne: "onlineAnswers",  propNameTwo: "onlineAnswers" }, 
    // SET_FORMFIELDS_MARKDOWN, 
    // saveOnlineAnswer, 
    // duration
    // );
};

function dropDownValueCallBack(value){
    alert('set drop down value in call back')
    alert( value );
}

function handleRndPostioning(xaxis, yaxis, element){
    setTestPosition({xaxis, yaxis})
    saveFormField({ ...element, xAxisformFieldPosition: xaxis,  yAxisformFieldPosition: yaxis })
};

function onMatchListItem(){}


return (
      <div 
        className="builder2" 
      > 
       <header>
        {
          <>
            <div className="multicolortext">
                {"london force" }
            </div>
            <div>
                <PlusOneIcon 
                            style={plusOneIconStyle()}
                            className="comment-round-button-2"
                            onClick={() => addFormField()}
                />
            </div>
            </>
        }
        </header>
        <div className="">
             {
            //  <button onClick={()=> toggleSetPreviewMode()}>{"Toggle Preview Mode"}</button>
             }
              { formfieldsTest?.map( element => (
                  <>               
                  {
                    <div className="content">
                      <div className="sidebar"> 
                          <div className="sidebar-cards">
                            <button onClick={()=> toggleSetPreviewMode()}>
                            {"Toggle Preview Mode"}
                            </button>
                          </div>
                        
                        <div className="sidebar-cards2">
                          <button 
                          className="edit-lesson-btn"
                          // onClick={() => { edit(lesson.title); } }                                          
                            > 
                            Edit
                          </button>
                        </div>
                            
                      </div>
                    <div className="onlinequestion-list-items"> 
                    <div className="OnlineListItems">
                    <div>  
                    {/* <div className="lesson-content">  */}
                    <div 
                      className="answerEditor"
                    >
                      <div className="question-card-top-right">
                      {
                          <DeleteIcon 
                            style={iconStyle()}
                            className="comment-round-button-3"
                            onClick={() => onhandleSelected( element )}
                          />
                    
                       }
                      </div>
                      <div>
                      <span>
                           {/* <PlusOneIcon 
                            style={plusOneIconStyle()}
                            className="comment-round-button-2"
                            onClick={() => addFormField()}
                          /> */}
                        </span>
                      </div>
                       {/* <EditorComponent
                        className={"answerEditor"}
                        id={ element?._id }
                        name={ element?.name } 
                        handleChange={(editor) => handleChange(editor, element)}
                        content={ element?.markDownContent }
                        upload_url={ upload_url }
                        upload_handler={ ( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveOnlineAnswer ) }
                        readOnly={ false }
                        // readOnly={config.previewMode? true : false }
                      />  */}
                    {/* <Rnd 
                      position={{ 
                            x: testPosition?.xaxis,
                            y: testPosition?.yaxis}}
                        // position={{ 
                        //     x: elementPosition.find(id => id === element?._id)?.xAxisformFieldPosition,
                        //     y: elementPosition.find(id => id === element?._id)?.yAxisformFieldPosition}}
                        onDragStop={(e, d) => handleRndPostioning(e.x, d.y, element) }
                        // position={{ x: this.state.x, y: this.state.y }}
                        // onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                    > */}
                    <Rnd 
                        default={{
                            // x: testPosition?.xaxis,
                            // y: testPosition?.xaxis,
                            x: element?.xAxisformFieldPosition,
                            y: element?.yAxisformFieldPosition,
                            width: 10,
                            height: 10,
                            
                          }}
                          onDragStop={(e, d) => handleRndPostioning(d.x, d.y, element) }
                          minWidth={10}
                          minHeight={10}
                          bounds="body"
                          allowAnyClick={true}
                          disableDragging={!previewMode}
                          >
                     
                         <div />
                    
                        {/* <span>
                        <input 
                            type={""}
                            value={element?.inputValue}
                        />
                        </span>
                        <span>
                        <input 
                            type={element?.inputType}
                            value={element?.inputValue}
                        />
                        </span> */}
                    </Rnd>
                    { (element.inputType === "text") &&
                            <Rnd
                             default={{
                              // x: testPosition?.xaxis,
                              // y: testPosition?.xaxis,
                              x: element?.xAxisformFieldPosition,
                              y: element?.yAxisformFieldPosition,
                              width: 10,
                              height: 10,
                              
                            }}
                            onDragStop={(e, d) => handleRndPostioning(d.x, d.y, element) }
                            minWidth={10}
                            minHeight={10}
                            bounds="body" 
                            allowAnyClick={true}
                            disableDragging={ !previewMode }
                          >
                             
                              <input type={element?.inputType}></input>
                            
                             
                          </Rnd>
                    }
                    { (element.inputType === "radio") &&
                            <Rnd
                             default={{
                              // x: testPosition?.xaxis,
                              // y: testPosition?.xaxis,
                              x: element?.xAxisformFieldPosition,
                              y: element?.yAxisformFieldPosition,
                              width: 10,
                              height: 10,
                              
                            }}
                            onDragStop={(e, d) => handleRndPostioning(d.x, d.y, element) }
                            minWidth={10}
                            minHeight={10}
                            bounds="body" 
                            allowAnyClick={true}
                            disableDragging={ !previewMode }
                          >
                             
                              {/* <RadioButton previewMode={ previewMode }/> */}
                            
                             
                          </Rnd>
                    }
                     { (element.inputType === "dropdown") &&
                            <Rnd
                             default={{
                              // x: testPosition?.xaxis,
                              // y: testPosition?.xaxis,
                              x: element?.xAxisformFieldPosition,
                              y: element?.yAxisformFieldPosition,
                              width: 10,
                              height: 10,
                              
                            }}
                            onDragStop={(e, d) => handleRndPostioning(d.x, d.y, element) }
                            minWidth={10}
                            minHeight={10}
                            bounds="body" 
                            disableDragging={!previewMode}
                          >
                              <div>
                                {/* <DropDown 
                                    previewMode={ previewMode }
                                    dropDownValueCallBack={ dropDownValueCallBack }
                                /> */}
                              </div>
                             
                          </Rnd>
                    }
                   
                    {/* <div className={'userBio'}>
                    {
                      <div className="moreInfo"> 
                        <div> 
                          <div className="row"> 
                          <div className="answerVideoSub"> 
                          <span className=""> </span>
                          <span className="cols">     
                          <span className="onlineQuestionVideoComponent"> 
                          < MaterialUiVideoComponent 
                              className={ "onlineQuestionVideoComponent" } 
                              element={ element } 
                              videoMeta={videoMeta( element ) }
                              saveRecording={saveRecording}
                              extendedMeetingSettings={false} 
                          />
                          </span>
                          </span>
                          <span className="cols">
                             <NoteAddTwoToneIcon
                                style={ iconStyleMain() }
                                className="comment-round-button-1"
                                onClick={() => goToBlackBoard( element )} 
                             />
                          {( element?.boardVideoUrl  ) &&
                              <NotesIcon
                                  style={ iconStyleMain() }
                                  className="comment-round-button-2"
                                  onClick={() => window.open(`${element.boardVideoUrl}`)}
                              />
                          }    
                          </span>
                          <span>
                          </span>
                          </div>
                          </div>
                          <div className="answerCard">
                          <div className="row">
                              <div className="userBioSub-support">
                                <div className="onlineQuestionVideoComponent">
                                <span className="col-1"> 
                                    <img className="onlineQuestionImage" src={currentUsers?.find(_user => _user?._id === element?.userId)?.avatarUrl} width="70" height="70"  alt=''/>                                        
                                </span>
                                    <div className="col-1"> 
                                      <div className="onlineQuestionCalendarIcon">
                                      <CalendarTodayIcon
                                          style={ iconStyleMain() }
                                          className="round-button-3"
                                          //onClick={() => gotToCalendar(singleUser)}
                                      />
                                      </div>                    
                                    </div>
                                </div>
                              </div>
                          </div>  
                          <div className="comment"> 
                            { <span> {` Answered by ${currentUsers?.find(_user => _user?._id === element?.userId)?.firstname} on ${  moment( element?.answerDateTime ).local() }`} </span>}
                          </div> 
                       </div>
                          </div> 
                        </div>
                    }
                      </div> */}
                      </div>  
                      </div>
                      </div>  
                    </div>
                      </div> 
                    }                
                      {/* <span> 
                      {
                        children( element )
                      }
                      </span> */}
                      <span className="">
                      {
                        <PlusOneIcon 
                          style={plusOneIconStyle()}
                          className="comment-round-button-2"
                          onClick={() => addFormField( element )}
                          />
                      }
                     
                      </span>
                  </>
                )) 
              }
        </div>
      </div>  
      );
    };

    const mapDispatch = {
        addNewFormField,
        saveFormField,
        loadFormFields,
        deleteFormField,
        setMarkDown
    };
    
    const mapState = ( state, ownProps ) => { 
      return {
        currentUser: state.users.user,
        currentUsers: Object.values( state.users.users ),
        formfieldsTest: Object.values(state.formFields.formFields)?.filter(x => x.questionId === "001"),
        formfields: Object.values(state.formFields.formFields)?.filter(field => field?.questionId === ownProps?.question?._id),
        // formfields: getSelectedOnlineAnswersByCourseId(state, ownProps)?.filter(answers => answers?.onlineQuestionId === ownProps?.question?._id),
        //onlineQuestions:  Object.values( state.onlineQuestions.onlineQuestions ),
      };
    };
    
    export default connect( mapState, mapDispatch )(FormFields);
    