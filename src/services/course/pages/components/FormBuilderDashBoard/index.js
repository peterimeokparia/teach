import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { role } from 'services/course/helpers/PageHelpers';
import { red } from '@mui/material/colors';
import { saveFormBuilder } from 'services/course/actions/formbuilders';
import { saveLessonInsightsTeachBotProps } from 'services/course/actions/teachbot';
import { handleUnAnsweredQuestions } from 'services/course/actions/outcomeInsights';
import { addMissedAnswers } from 'services/course/actions/missedanswers';
import { submitIconStyle } from './inlineStyles';
import { orange } from '@material-ui/core/colors';
import { elementMeta } from '../../QuestionsPage/helpers';
import { useTheme } from '@mui/material/styles';
import CustomGroupedBarChart from 'services/course/pages/Charts/components/CustomChart';
import OutcomeChartLessonInsightsFormQuestions from 'services/course/pages/Charts/components/OutcomeChartLessonInsightsFormQuestions';
import useLessonOutcomeChartLandingHook from 'services/course/pages/Charts/hooks/useLessonOutcomeChartLandingHook';
import useOutcomeQuestionInsightsHook from 'services/course/pages/Charts/hooks/useOutcomeQuestionInsightsHook';
import React from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import TeachChatbot  from 'services/course/pages/TeachChatbot';
import './style.css';

const FormBuilderDashBoard = ({ 
  saveFormBuilder,
  saveLessonInsightsTeachBotProps,
  lessonInsightsBotProps,
  addMissedAnswers,
  currentUser,
  formBuilders,
  form,
  handleUnAnsweredQuestions,
  outComeBarChartProp,
  onlineQuestions,
  children }) => {

  let { formUuId, previewMode, formBuilderState } = form;

  let { lessonItem, courseOutcomes, outcomeInsights, outcomes, lessonOutcomes } = outComeBarChartProp;

  const theme = useTheme();
  const [ displaySomeChart, setDisplaySomeChart ] = useState( false );

  useEffect( () => {}, []);

  // let { formQuestionData } = useOutcomeQuestionInsightsHook( { courseOutcomes, outcomeInsights, currentUser, outcomes, lessonItem, onlineQuestions, form, lessonInsightsBotProps } );

function publishContent(){
  let publishForm = formBuilders?.find( form => form?.formUuId === formUuId );

  Swal.fire({
    title: 'Publish content',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Publish',
    confirmButtonColor: '#20c997',
    cancelButtonText: 'Cancel'
  }).then( (response) => {
    if ( response?.value &&  publishForm ) {    
      saveFormBuilder( { ...publishForm, orderedFormQuestions: [], status: elementMeta.status.Published, state: elementMeta.state.Manage,  userId: currentUser?._id } );
      return;
    } else {
      return;
    }
  });
};

function submit(){
  let submitForm = formBuilders?.find( form => form?.formUuId === formUuId );

  Swal.fire({
    title: ( currentUser?.role === role.Student ) ? 'Submit for review' : 'Submit reviewed content', 
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    confirmButtonColor: '#20c997',
    cancelButtonText: 'Cancel'
  }).then( (response) => {
    if ( response?.value && submitForm ) {    
      if ( currentUser?.role === role.Student ) {
        saveFormBuilder( { ...submitForm, status: elementMeta.status.Review, state: elementMeta.state.Taking } );

        alert('handleUnAnsweredQuestions')
        handleUnAnsweredQuestions( form ); 
        // saveLessonInsightsTeachBotProps( { courseOutcomes, outcomeInsights, currentUser, outcomes, lessonItem, onlineQuestions, form, lessonInsightsBotProps } );
        //setDisplaySomeChart( true );
      } else {
        saveFormBuilder( { ...submitForm, status: elementMeta.status.Reviewed, state: elementMeta.state.Taking } );
      }
      return;
    } else {
      return;
    }
  });
};

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabPublishStyle = {
  position: 'absolute',
  bottom: 26,
  right: 26,
};

const transitionDuration = {
  enter: theme.transitions.duration.enteringScreen,
  exit: theme.transitions.duration.leavingScreen,
};

const fabRedStyle = {
  color: 'common.white',
  bgcolor: red[500],
  '&:hover': {
    bgcolor: red[600],
  },
};

const fabOrangeStyle = {
  color: 'common.white',
  bgcolor: orange[500],
  '&:hover': {
    bgcolor: orange[600],
  },
};

const fabs =  [
  {
    color: 'primary',
    sx: { ...fabStyle, ...fabRedStyle },
    icon: <StopCircleOutlinedIcon className="formbuilder-round-button-1" onClick={ () => submit() } style={{
      height:35,
      width:35      
    }}/>,
    label: 'Submit',
    value: 0
  },
  {
    color: 'primary',
    sx: { ...fabPublishStyle, ...fabOrangeStyle},
    icon: <PublishIcon className="formbuilder-round-button-1" onClick={ () => publishContent() } style={{
      height:35,
      width:35      
    }}/>,
    label: 'Publish',
    value: 1
  }
];

return (
    <>
    {  ( displaySomeChart ) 
        // ? <OutcomeChartLessonInsightsFormQuestions pieChartData={formQuestionData} lessonOutcomes={lessonOutcomes} questionPropsData={form}/>
        ? <TeachChatbot/>
        : <div className="clock">
          <span className="digital"> 
            { children }   
            <span>
              {
                fabs?.map((fab, index) => (
                    <Zoom
                      key={`${fab.color}_${index}`}
                      in={((previewMode?.isPreviewMode) ? fab.value : 0 )=== index }
                      timeout={transitionDuration}
                      style={{
                        height:30,
                        width:30,     
                        "top": "-131%",
                        "right": formBuilderState === elementMeta.state.Manage ? "-880px" : "-770px",
                        color:"greenyellow",
                        transitionDelay: `${(fab.value === index) ? transitionDuration.exit : 0}ms`,
                      }}
                      unmountOnExit
                    >
                      <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
                        {
                          <Tooltip title={fab.label} arrow>
                            {  fab.icon }
                          </Tooltip>  
                        }
                      </Fab>
                  </Zoom>
                ))
              }
            </span>     
          </span> 
      </div>
    }
    </>
    
); };

const mapDispatch = {
  saveFormBuilder,
  handleUnAnsweredQuestions,
  addMissedAnswers,
  saveLessonInsightsTeachBotProps
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    formBuilders: Object.values( state.formBuilders?.formBuilders ),
    onlineQuestions: Object.values( state?.onlineQuestions?.onlineQuestions ),
    lessonInsightsBotProps: state?.teachBotProps?.lessonInsightsBotProps
  };
};

export default connect( mapState, mapDispatch )( FormBuilderDashBoard );
