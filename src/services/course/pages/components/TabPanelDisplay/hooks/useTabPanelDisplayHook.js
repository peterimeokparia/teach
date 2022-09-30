import * as React from 'react';
import { generateUuid } from 'services/course/pages/Users/helpers';
import { addIconStyleHeader } from './inlineStyles';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { role } from 'services/course/helpers/PageHelpers';
import { formToTableConverter } from 'services/course/pages/FormBuilder/FormTables/helpers';
import { useTheme } from '@mui/material/styles';
import { a11yProps, fabStyle, fabGreenStyle, fabDeepOrangeStyle } from 'services/course/pages/components/TabPanelDisplay/helper';
import { addNewFormBuilderDialog } from 'services/course/pages/components/TabPanelDisplay/helper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './style.css';

const useTabPanelDisplayHook = ( props ) => {
  const {
    operatorBusinessName, formType, formName, courseId, lessonId, formId, currentUser, eventId, addNewFormBuilder, saveFormBuilder, addTime, saveTime,
    allTimers, loadTestTimers, onlineQuestions, reportFormFieldAnswers, formBuilders, timer, userId, pendingFormsInBuildState, publishedFormsInBuildState, inProgressFormsInTakingState,
    userSubmittedFormsForCreatorReviewInTakingState,allUserSubmittedFormsForCreatorReviewInTakingState,formsInBuildState
  } = props;

    const [ headerValue, setHeaderValue ] = React.useState(currentUser?.role === role.Student ? 1 : 0);
    const [ headerValueSub, setHeaderValueSub ] = React.useState(0);
    const theme = useTheme();
  
    const handleChange = (newValue) => {
      if ( currentUser?.role === role.Student ){
        setHeaderValue(1);
      } else {
        setHeaderValue(newValue);
      } 
    };
  
    const handleChangeIndex = (index) => {
      setHeaderValue(index);
    };
  
    const handleChangeSub = (event, newValue) => {
      setHeaderValueSub(newValue);
    };
  
    const handleChangeIndexSub = (index) => {
      setHeaderValueSub(index);
    };
  
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

  const getCurrentTimer = ( selectValue ) => {
    return allTimers?.find( timer => timer?.formName === selectValue?.formName && timer?.userId === userId );
  };
  
  const addNewFormBuilderForm = async () => {
    let formUuId = generateUuid();   
    let dateTime = Date.now();

    let newBuilder = {
      operatorBusinessName,formType,formName,courseId,lessonId,formId,formUuId,createDateTime: dateTime,
      takingDateTime: dateTime, createdBy: currentUser?._id, userId: currentUser?._id, status: elementMeta.status.Pending, state: elementMeta.state.Manage, eventId
    };

    addNewFormBuilderDialog(addNewFormBuilder, newBuilder);
   };

  const editExistingFormBuilderForm = ( selectValue ) => {
    if ( selectValue ) {
      saveFormBuilder( { ...selectValue, state: elementMeta.state.Manage, status: elementMeta.status.Pending, userId: selectValue?.userId, eventId } );
    }
  };

  const takeExistingFormBuilderForm = ( selectValue  ) => { 
    let formUuId = generateUuid();
    let currentTimer = getCurrentTimer( selectValue );
   
    if ( selectValue ) {
      let newBuilder = {
        operatorBusinessName: selectValue?.operatorBusinessName, formType: selectValue?.formType, formDisplayName: selectValue?.formDisplayName, formName: selectValue?.formName,
        courseId: selectValue?.courseId, lessonId: selectValue?.lessonId, formUuId, formId: selectValue?.formId, createDateTime: selectValue?.createDateTime, outcomeId: selectValue?.outcomeId,
        takingDateTime: Date.now(), createdBy: selectValue?.createdBy, userId: currentUser?._id, status: elementMeta.status.InProgress, state: elementMeta.state.Taking, eventId
      };
      
      addNewFormBuilder( newBuilder );
   
      if ( !currentTimer?._id && timer?._id ){
        addTime({ ...timer, userId, role: currentUser?.role });
      } else {
        saveTime( { ...currentTimer,  testTime: timer?.testTime } );
      }
    }
  };

  const continueExistingFormBuilderForm = ( selectValue ) => {
    loadTestTimers();

    let currentTimer = getCurrentTimer( selectValue );

    // if it's not quizz, homework, exam we don't need to worry about getting or setting the timer - fix
    if ( !currentTimer?._id && timer?._id ){
      addTime({ formType: selectValue?.formType, formName: selectValue?.formName, formUuId: selectValue?.formUuId, testTime: timer?.testTime, userId, role: currentUser?.role });
    }

    if ( selectValue ) {
      saveFormBuilder( { ...selectValue, status: elementMeta.status.InProgress, takingDateTime: Date.now(), userId: currentUser?._id, eventId } );
    }
  };

  const goToSubmittedForm = ( selectValue ) => {
    if ( selectValue ) {  
      saveFormBuilder( { ...selectValue, status: elementMeta.status.Submitted, state: elementMeta.state.Submitted, takingDateTime: Date.now(), userId: selectValue?.userId, eventId } );
    }
  };
  
  const creatorReviewsUserSubmittedForm = ( selectValue ) => {  
    if ( selectValue ) {  
      saveFormBuilder( { ...selectValue, status: elementMeta.status.Reviewing, state: elementMeta.state.Manage, takingDateTime: Date.now(), userId: selectValue?.userId, eventId } );
    }
  };

  const creatorReviewingUserSubmittedForm = ( selectValue ) => {  
    if ( selectValue ) {  
      saveFormBuilder( { ...selectValue, status: elementMeta.status.Reviewing, state: elementMeta.state.Manage, takingDateTime: Date.now(), userId: selectValue?.userId, eventId } );
    }
  };

  const userGoesToReviewedForm = ( selectValue ) => {
    if ( selectValue ) {  
      saveFormBuilder( { ...selectValue, status: elementMeta.status.Reviewed, state: elementMeta.state.Manage, takingDateTime: Date.now(), userId: selectValue?.userId, eventId: selectValue?.eventId  } );
    }
  };

  const currentUserFormInReview = ( selectValue ) => { 
    if ( selectValue ) {  
      saveFormBuilder( { ...selectValue, status: elementMeta.status.InProgress, state: elementMeta.state.Taking, takingDateTime: Date.now(), userId: selectValue?.userId, eventId: selectValue?.eventId  } );
    }
  };

  const reviewedCurrentUserForm = ( selectValue ) => { 
    if ( selectValue ) {  
      saveFormBuilder( { ...selectValue, status: elementMeta.status.Reviewed, state: elementMeta.state.Taking, takingDateTime: Date.now(), userId: selectValue?.userId, eventId: selectValue?.eventId  } );
    }
  };

  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon onClick={ addNewFormBuilderForm } style={addIconStyleHeader()}/>,
      label: 'Add',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabDeepOrangeStyle },
      icon: <ArrowRightIcon />,
      label: 'Expand',
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon onClick={ editExistingFormBuilderForm }/>,
      label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <AddIcon onClick={ takeExistingFormBuilderForm }/>,
      label: 'Expand',
    }
  ];

  function handleSelectedBuildEditSelectedAll( selected ) {
    editExistingFormBuilderForm( selected );
  }

  function toggleHeaderTabs( value, label1, label2, label3, label4 ){
    return (
      <div className="header-tab-0">
        {
          getHeaderTabs( value, label1, label2, label3, label4 )
        }  
      </div>
    );
  }

  function getHeaderTabs( value, label1, label2, label3, label4 ) {
     return headerTabs( value, label1, label2, label3, label4 );
  }

  function headerTabs( value, label1, label2, label3, label4 ) {
    let index =  { 
      header: 0, 
      header1: 1, 
      header2:2, 
      header3: 3 
    };

    return (
      <> 
        { ( currentUser?.role === role.Tutor ) &&    
            <div className={ value === index.header ? `header-tab-label${index.header}-selected` : `header-tab-label${index.header}`}>
            {
              tabs( value, index.header, label1 )
            }
            </div>
        }
      <div className={ value === index.header1 ? `header-tab-label${index.header1}-selected` : `header-tab-label${index.header1}`}>
       {
         tabs( value, index.header1, label2 )
       }
      </div>
      { ( currentUser?.role === role.Tutor ) &&  
           <div className={ value === index.header2 ? `header-tab-label${index.header2}-selected` : `header-tab-label${index.header2}`}>
           {
             tabs( value, index.header2, label3 )
           }
          </div>
      }
      { ( currentUser?.role === role.Tutor ) && 
           <div className={ value === index.header3 ? `header-tab-label${index.header3}-selected` : `header-tab-label${index.header3}`}>
           {
             tabs( value, index.header3, label4 )
           }
          </div>
      }
      </>
    );
  }

  function tabs( value, index, label ) {
    return (
    <Tabs
      value={value}
      textColor="white"
      variant="fullWidth"
    >
      <span>
      </span>
      <Tab label={ label } {...a11yProps(index)}  onClick={() => handleChange(index) } />
    </Tabs>
    );
  }
  
  const tableData = formToTableConverter( onlineQuestions, reportFormFieldAnswers, formName, formBuilders );

  return {
    headerPanelProps: {
      currentUser, headerValue, headerValueSub, handleChangeSub, handleChangeIndexSub, toggleHeaderTabs,
      lessonId, theme,formType,formsInBuildState, handleSelectedBuildEditSelectedAll, fabs, handleChangeIndex,
      pendingFormsInBuildState, publishedFormsInBuildState, takeExistingFormBuilderForm, transitionDuration,
      inProgressFormsInTakingState, continueExistingFormBuilderForm, goToSubmittedForm,
      userSubmittedFormsForCreatorReviewInTakingState, currentUserFormInReview, reviewedCurrentUserForm,
      allUserSubmittedFormsForCreatorReviewInTakingState,creatorReviewsUserSubmittedForm, creatorReviewingUserSubmittedForm, userGoesToReviewedForm, tableData
    }
  };
};

export default useTabPanelDisplayHook;