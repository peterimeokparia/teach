import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getNumberOfStudentsInCoaching } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { toggleCourseOutcome, toggleCourseOutcomesFormOptionsDisplay } from 'services/course/actions/outcomeInsights';
import { deepOrange, green, orange, red } from '@mui/material/colors';
import { isEmptyObject } from 'services/course/helpers/Validations';
import { role } from 'services/course/helpers/PageHelpers';
import { handleCourseInsights } from 'services/course/middleware/courseInsights/helpers';

const useCourseOutcomeChartLandingHook = ( props ) => {
    let { courseOutcomes, outcomeInsights, currentUser, courseId, lessons } = props;

    if (isEmptyObject(outcomeInsights)) return; 

    const [ outcomeId, setOutcomeId ] = useState( null ); 
    const [ selectedOutcome, setSelectedOutcome ] = useState( null );
    const [ mainHeaderOutcomeTitle, setMainHeaderOutcomeTitle ] = useState( null ); 
    const [ lessonLabelTitle, setLessonLabelTitle ] = useState( null ); 
    const [ toggleItem, setToggleItem ] = useState( false ); 
    const [ mainChartToggleItem, setMainChartToggleItem ] = useState( false );
    const [ displayFormTypeOptions, setDisplayFormTypeOptions ] = useState( false ); 
    const [ toggleQuestionPanel, setToggleQuestionPanelButton ] = useState( true );
    const [ tooltipItemLesson, setSelectedTooltipItemLesson ] = useState( null ); 
    const [ selectedLesson, setLesson ] = useState( null ); 
    const [ courseOutcomeInsights, setCourseOutcomeInsights ] = useState([]); 
    const dispatch = useDispatch();

    useEffect(() => {
      let insights = getCourseOutcomeInsights();

      if ( insights?.length > 0 ) {
        setCourseOutcomeInsights( insights );
      }
    }, [] );

    useEffect(() => {
      if ( selectedLesson?._id && mainHeaderOutcomeTitle ) {
        let insights = getCourseOutcomeInsights();

        let questionInsights =  insights?.filter(item => item?.lessonId === selectedLesson?._id && item?.formType === mainHeaderOutcomeTitle.toLowerCase()?.trim()  );

        if ( !handleSettingCourseInsights( questionInsights, insights ) ) {
          handleQuestionTypeInsights( questionInsights );
        } 
        
        handleLessonOutcomes();
      }
    }, [ selectedLesson, mainHeaderOutcomeTitle, selectedOutcome?._id ] );

    useEffect(() => {
      handleToggleButton();
    }, [ toggleItem ]);

    useEffect(() => {
      handleMainChartToggleButton();
    }, [ mainChartToggleItem ]);

    useEffect(() => {
    }, [ toggleQuestionPanel ]);

    // useEffect(() => {
    // }, [ selectedOutcome || ( selectedOutcome?._id === outcomeId )  ] );
 
    if ( ( courseOutcomeInsights?.length === 0 )) return {};

    let { 
      totalNumberOfOutcomeQuestionsInCourse,
      totalNumberOfQuestionsPassedOutcomeInCourse,
      totalNumberOfQuestionsFailedOutcomeInCourse,
      totalNumberOfAttemptedFailedOutcomeQuestionsInCourse,
      totalNumberOfUnAttemptedOutcomeQuestionsInCourse,
      percentageNumberOfQuestionsPassedOutcomeInCourse,
      percentageNumberOfQuestionsFailedOutcomeInCourse,
      percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse 
    } = handleCourseInsights( selectedLesson?._id && courseOutcomeInsights ) || {};
    
    let allStudentsInCoaching = getNumberOfStudentsInCoaching( courseOutcomeInsights );
    
    let courseInsightsMeasurableOutcomeResult = [
      {header:'#Questions Passed',rate: totalNumberOfQuestionsPassedOutcomeInCourse, passFailRate: '', title:'', width:90, minWidth:200, iconColor: green[500], avatarText: '#'},
      {header:'#Questions Missed',rate: totalNumberOfQuestionsFailedOutcomeInCourse, passFailRate: '', title:'', width:90, minWidth:200, iconColor:deepOrange[500], avatarText: '#'},
      {header:'%Pass',rate:percentageNumberOfQuestionsPassedOutcomeInCourse, passFailRate:'', title:'', width:90, minWidth:200, iconColor: green[500], avatarText:'%'},
      {header:'%Fail',rate:percentageNumberOfQuestionsFailedOutcomeInCourse, passFailRate:'', title:'', width:90, minWidth:200, iconColor: deepOrange[500], avatarText:'%'},
      {header:'#Attempted Fail', rate:totalNumberOfAttemptedFailedOutcomeQuestionsInCourse, passFailRate:'', title:'', width:90, minWidth:200, iconColor:orange[500], avatarText:'AF'},
      {header:'#Unattempted Fail', rate:totalNumberOfUnAttemptedOutcomeQuestionsInCourse, passFailRate:'', title:'', width:90, minWidth:200, iconColor:red[500], avatarText:'UF'},
      {header:'Total # Questions', rate: totalNumberOfOutcomeQuestionsInCourse, passFailRate:'', title:'', width:90, minWidth: 200},
      {header:'Coaching', rate:allStudentsInCoaching, passFailRate:'', title:'', width:90, minWidth:200, iconColor:green[900], avatarText:'C'},
      {header:'%Unattempted vs Total Failure',rate:percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse, passFailRate:'', title:'', width:90, minWidth:200, iconColor: deepOrange[500], avatarText:'%'},
    ];

    function handleSettingCourseInsights( questionInsights, insights ) {
      if ( questionInsights?.length === 0 ) {
        setCourseOutcomeInsights( insights?.filter(item => item?.lessonId === selectedLesson?._id ) );
        return true;
      }  
      return false;
    }

    function handleQuestionTypeInsights( questionInsights ) {
      if ( selectedOutcome?._id ) return; 

      setCourseOutcomeInsights( questionInsights );
      setDisplayFormTypeOptions( true );
    }

    function handleLessonOutcomes() {
      if ( selectedOutcome ) {
        let insights = getCourseOutcomeInsights();

        setCourseOutcomeInsights( insights?.filter(item => item?.outcomeId === selectedOutcome?._id && item?.lessonId === selectedLesson?._id &&  item?.formType === mainHeaderOutcomeTitle.toLowerCase()?.trim() ) );
      }
    }

    function getCourseOutcomeInsights() {
      let courseOutcomesInsights = [];

      if ( currentUser?.role === role.Tutor ) {
        courseOutcomesInsights = [ ...outcomeInsights ]?.filter( item => item.courseId === '613ac665f6ca0ce27d863330' ); // get formType, courseId
      }
    
      if ( currentUser?.role === role.Student ) {
        courseOutcomesInsights = [ ...outcomeInsights?.filter( item => item?.userId === currentUser?._id ) ];
      }
      return courseOutcomesInsights;
    }

    function handleMainChartToggleButton() {
      dispatch( toggleCourseOutcomesFormOptionsDisplay() );
    }

    function handleToggleButton() {
      dispatch( toggleCourseOutcome() );
    }

    const TIME_OUT_DURATION =  1000;
    function setLabelTitle( labelTitle ) {  
      setTimeout( setLessonLabelTitle, TIME_OUT_DURATION, labelTitle );
    }

    function handleSettingSelectedOutcome( outcome ){
      setSelectedOutcome( outcome );
    }

    function getChartPropsCallBack( data ) {
      if ( data && lessonLabelTitle ) {

        let selectedLesson = lessons?.find(lesson => lesson?.title?.toLowerCase().trim() === lessonLabelTitle?.toLowerCase()?.trim() );

        if ( selectedLesson ) {
          setLesson( selectedLesson );
          setMainHeaderOutcomeTitle( data );
        }
      }
    }
    
    function setOutcomeIdFromChartCallBack( data ){
      setOutcomeId( null );

      let outcome = courseOutcomes?.find(outcome => data?.toLowerCase()?.trim() === outcome?.title?.toLowerCase().trim() ) ?? selectedOutcome;
 
      if ( outcome ) {
        setMainHeaderOutcomeTitle( data );
        setOutcomeId( selectedOutcome?._id );
        return;
      }
    } 

    function getLessonInsights(){
      setMainHeaderOutcomeTitle( lessonLabelTitle );
      setOutcomeId( null );
    }

    function getCourseInsights() {
      let courseInsights = courseOutcomeInsights?.filter( courseInsights => courseOutcomes?.map(_courseOutcome => _courseOutcome?._id )?.includes( courseInsights?.outcomeId ) );
      return {
        courseInsights
      }
    }

    function setToggleQuestionPanel() {
      setToggleQuestionPanelButton( !toggleQuestionPanel );
    }

    let { courseInsights } = getCourseInsights() || {};

  return {
    coursePieChartData: { pie1: courseInsights, pie2: courseInsights, pie3: courseInsights, setSelectedTooltipItemLesson, handleSettingSelectedOutcome, displayFormTypeOptions, courseOutcomeInsights,
    courseOutcomes, handleToggleButton, tertiaryData: courseInsightsMeasurableOutcomeResult, courseId, setToggleItem, setMainChartToggleItem, toggleItem, selectedLesson, selectedOutcome, 
    toggleQuestionPanel, setToggleQuestionPanel, mainChartToggleItem, mainHeaderOutcomeTitle, setOutcomeIdFromChartCallBack, getChartPropsCallBack, setLabelTitle, lessonLabelTitle, getLessonInsights, selectedOutcomeId: outcomeId }
  };
};

export default useCourseOutcomeChartLandingHook;