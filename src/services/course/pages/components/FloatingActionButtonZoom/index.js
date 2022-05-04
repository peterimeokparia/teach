import * as React from 'react';

import { 
green, 
deepOrange, } from '@mui/material/colors';

import { 
useTheme } from '@mui/material/styles';

import { 
generateUuid } from 'services/course/pages/Users/helpers';

import {
addIconStyleHeader,
plusOneIconStyleHeader } from './inlineStyles';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
role } from 'services/course/helpers/PageHelpers';

import {
columnsQuizz } from 'services/course/pages/components/StickyHeaderTable/helpers'; 

import {
formToTableConverter } from 'services/course/pages/FormBuilder/FormTables/helpers';

import { 
addMissedAnswers,
saveMissedAnswers } from "services/course/actions/missedanswers";

import MissedQuestionComponent from 'services/course/pages/FormBuilder/FormQuestions/components/MissedQuestionsComponent';
import Roles from 'services/course/pages/components/Roles';
import FormTables from 'services/course/pages/FormBuilder/FormTables';
import StickyHeaderTable from 'services/course/pages/components/StickyHeaderTable';
import Pagination from 'services/course/pages/components/Pagination';
import ListItemComponent from 'services/course/pages/Users/components/ListItemComponent';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import './style.css';
import { blue } from '@material-ui/core/colors';

function TabPanel(props) {

  const { 
      children, 
      value, 
      index, 
      ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

function a11yProps2(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

function a11yProps3(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}


const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

const fabDeepOrangeStyle = {
    color: 'common.white',
    bgcolor: deepOrange[500],
    '&:hover': {
      bgcolor: deepOrange[600],
    },
};

// Rename this
export default function FloatingActionButtonZoom({ props }) {
  const theme = useTheme();
  const {
    operatorBusinessName,
    currentUser,
    users,
    formBuilders,
    formsInBuildState,
    formsInUse,
    pendingFormsInBuildState,
    publishedFormsInBuildState,
    inProgressFormsInTakingState,
    submittedFormsInTakingState,
    allSubmittedFormsInSubmittedState,
    currentUsersSubmittedFormsInSubmittedState,
    loadPagedFormBuilders,
    onlineQuestions,
    formFieldAnswers,
    reportFormFieldAnswers,
    formType,
    formName,
    formId,
    formUuId,
    courseId,
    lessonId,
    userId,
    addNewFormBuilder,
    loadFormBuilders,
    saveFormBuilder,
    addTime,
    saveTime,
    loadTestTimers, 
    timer,
    currentUserTimer,
    allTimers,
    eventId
  } = props;

  const [ value, setValue ] = React.useState(currentUser?.role === role.Student ? 1 : 0);
  const [ value2, setValue2 ] = React.useState(0);
  const [ value3, setValue3 ] = React.useState(0);
  const [ value4, setValue4 ] = React.useState(0);

  const handleChange = (newValue) => {
    if ( currentUser?.role === role.Student ){
      setValue(1);
    } else {
      setValue(newValue);
    } 
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // Rename these
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  const handleChangeIndex2 = (index) => {
    setValue2(index);
  };

  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
  };

  const handleChangeIndex3 = (index) => {
    setValue3(index);
  };

  const handleChangeIndex4 = (index) => {
    setValue4(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const getCurrentTimer = ( selectValue ) => {
    return allTimers?.find( timer => timer?.formName === selectValue?.formName && timer?.userId === userId );
  };

  const addNewFormBuilderForm = async () => {

    let dateTime = Date.now();

    let newBuilder = {
      operatorBusinessName,
      formType,
      formName,
      courseId,
      lessonId,
      formId,
      formUuId,
      createDateTime: dateTime,
      takingDateTime: dateTime,
      createdBy: currentUser?._id,
      userId: currentUser?._id,
      status: elementMeta.status.Pending,
      state: elementMeta.state.Manage,
      eventId
    };

  const { value: formDisplayName } = await Swal.fire({
      title: "Please enter a form display name.",
      input: 'text',
      inputPlaceholder: 'Enter form name.',
      showCancelButton: false,
      showConfirmButton: ( true ),
      confirmButtonText: 'Enter',
      confirmButtonColor:  '#1976d2',
    });

    if ( formDisplayName ) {

      addNewFormBuilder( {...newBuilder, formDisplayName} );

    }

  };

  const editExistingFormBuilderForm = ( selectValue ) => {
    if ( selectValue ) {

      saveFormBuilder( { ...selectValue, state: elementMeta.state.Manage, status:elementMeta.status.Pending, userId: selectValue?.userId, eventId } );

    }
  };

  const takeExistingFormBuilderForm = ( selectValue  ) => { 
    let formUuId = generateUuid();
    let currentTimer = getCurrentTimer( selectValue );
   
    if ( selectValue ) {
  
      let newBuilder = {
        operatorBusinessName: selectValue?.operatorBusinessName,
        formType: selectValue?.formType,
        formDisplayName: selectValue?.formDisplayName,
        formName: selectValue?.formName,
        courseId: selectValue?.courseId,
        lessonId: selectValue?.lessonId,
        formUuId,
        formId: selectValue?.formId,
        createDateTime: selectValue?.createDateTime,
        takingDateTime: Date.now(),
        createdBy: selectValue?.createdBy,
        userId: currentUser?._id,
        status: elementMeta.status.InProgress,
        state: elementMeta.state.Taking,
        eventId
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

  const manageSubmittedForm = ( selectValue ) => {
    if ( selectValue ) {  

      saveFormBuilder( { ...selectValue, status: elementMeta.status.Pending, state: elementMeta.state.Manage, takingDateTime: Date.now(), userId: selectValue?.userId, eventId: selectValue?.eventId  } );

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

  function toggleHeaderTabs( label1, label2, label3 ){
    return (
      <div className="header-tab-0">
        <div className={ value === 0 ? 'header-tab-label0-selected' : 'header-tab-label0' }>
          <Tabs
            textColor="white"
            variant="fullWidth"
            className={ value === 0 ? 'header-tab-label0-selected' : 'header-tab-label0' }
            >
              <Tab label={ label1 } {...a11yProps(0)}  onClick={() => handleChange(0)} className={ value === 0 ? 'header-tab-label0-selected' : 'header-tab-label0' }/>
          </Tabs>
        </div>
        <div className={ value === 1 ? 'header-tab-label1-selected' : 'header-tab-label1' }>
          <Tabs
            textColor="white"
            variant="fullWidth"
          >
            <Tab label={ label2 } {...a11yProps(1)}  onClick={() => handleChange(1) }/>
          </Tabs>
        </div>
        <div className={ value === 2 ? 'header-tab-label2-selected' : 'header-tab-label2'}>
        <Tabs
          value={value}
          textColor="white"
          variant="fullWidth"
        >
            <span>
            </span>
            <Tab label={ label3 } {...a11yProps(2)}  onClick={() => handleChange(2) } />
          </Tabs>
        </div>
        </div>
    )
  }
  
  const tableData = formToTableConverter( onlineQuestions, reportFormFieldAnswers, formName, formBuilders );

  return (
    <>
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 1700,
        position: 'relative',
        minHeight: 200,
        marginLeft: -50
      }}
      className="formbuilder"
    >
      <AppBar position="static" color="default" >
        {/* {( currentUser?.role === role?.Student || ( formBuilders?.find( form => form?.createdBy === currentUser?._id ) === undefined )  ) 
          ? toggleHeaderTabs( '',`Take ${formType}`, "Tables" )
          : toggleHeaderTabs( ( currentUser?.role === role?.Student || ( formBuilders?.find( form => form?.createdBy === currentUser?._id ) !== undefined ) ) && `Manage ${ formType }`, `Take ${ formType }`, "Tables")
        }  */}
          {toggleHeaderTabs( `Manage ${ formType }`, `Take ${ formType }`, "Tables")
        } 
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* <Roles
          role={ ( currentUser?.role === role.Tutor ) && ( formBuilders?.find( form => form?.createdBy === currentUser?._id ) !== undefined ) }
        > */}
       <Roles
          role={ ( currentUser?.role === role.Tutor )  }
        >

        <TabPanel value={value} index={0} dir={theme.direction} className='secondary-toolbars'>
            <AppBar position="static" color="default">
                <Tabs
                  value={value2}
                  onChange={handleChange2}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="action tabs example"
                  orientation={"vertical"}     
                >
                  <Tab icon={ <AddIcon  color="primary"/> }  label={`Select ${formType}`} {...a11yProps2(0)} />
                  <Tab icon={ <EditIcon  color="secondary"/>} label="Pending" {...a11yProps2(1)} />
                  <Tab icon={ <EditIcon  color="default"/>} label="Published" {...a11yProps2(2)} />
                  <Tab icon={ <UpIcon   />} label="Submitted" {...a11yProps2(3)} /> 
                </Tabs>
            </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value2}
          onChangeIndex={handleChangeIndex2}
        >
          <div className="sticky-header-tab-panel"> 
          <TabPanel value={value2} index={0} dir={theme.direction}>
          <div class="content"/>
          <div class="sidebar"/>
          <div class="listItem"/>
          <div className="sticky-header-table">          
          <StickyHeaderTable columns={columnsQuizz} rows={formsInBuildState} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll }/>
          </div>
          <div/>
          <div className="sticky-header-table-edit-0">
          <EditIcon 
            style={plusOneIconStyleHeader()}
            className="comment-round-button-8"
          />
          </div>
          </TabPanel>
          </div>
          <div className="sticky-header-tab-panel">   
          <TabPanel value={value2} index={1} dir={theme.direction} >
          <div>
          <div className="sticky-header-table">
          <StickyHeaderTable columns={columnsQuizz} rows={pendingFormsInBuildState} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll } />
          </div>
          <div className="sticky-header-table-edit-0">
            <EditIcon 
              style={plusOneIconStyleHeader()}
              color={"default"}
              className="comment-round-button-8"
            />
            </div>
            </div>
          <br></br>
          <div> 
          </div>             
          </TabPanel>
          </div>
          <div className="sticky-header-tab-panel"> 
          <TabPanel value={value2} index={2} dir={theme.direction}>
          <div>
          <div className="sticky-header-table-published">
          <StickyHeaderTable columns={columnsQuizz} rows={publishedFormsInBuildState} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll }/>
          </div>
          <div className="sticky-header-table-edit-0">
          <EditIcon 
            style={plusOneIconStyleHeader()}
            color={"default"}
            className="comment-round-button-8"
          />
          </div>
          </div>
          </TabPanel>
          </div>
          <div className="sticky-header-tab-panel"> 
          <TabPanel value={value2} index={3} dir={theme.direction}>
          <div className="user-item"/>
          <div className="sticky-header-table-submitted"> 
          <StickyHeaderTable columns={columnsQuizz} rows={allSubmittedFormsInSubmittedState} onRowSelectedHandler={ manageSubmittedForm }/>
          </div>
          <div className="sticky-header-table-edit-0">
          <UpIcon 
            style={plusOneIconStyleHeader()}
            color={"default"}
            className="comment-round-button-8"
          />
          </div>
          </TabPanel>
          </div>
          </SwipeableViews>
        </TabPanel>
        </Roles>

        <TabPanel value={value} index={1} dir={theme.direction}  className='secondary-toolbars-take'>
        <AppBar position="static" color="default">
          <Tabs
            value={value3}
            onChange={handleChange3}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
            orientation={"vertical"}  
          >
            <Tab icon={<AddIcon />} label={`Select ${formType}`} {...a11yProps3(0)} />
            <Tab icon={<ArrowRightIcon />} label="In Progress" {...a11yProps3(1)} />
            <Tab icon={<UpIcon />} label="Submitted" {...a11yProps3(2)} /> 
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value3}
          onChangeIndex={handleChangeIndex3}
        >
           <div className="sticky-header-tab-panel"> 
          <TabPanel value={value3} index={0} dir={theme.direction}>
          <div className="sticky-header-table-take">
          <StickyHeaderTable columns={columnsQuizz} rows={publishedFormsInBuildState} onRowSelectedHandler={ takeExistingFormBuilderForm }/>
          </div>
          <div className="sticky-header-table-edit-0">
          <AddIcon 
            style={plusOneIconStyleHeader()}
            className="comment-round-button-7"
          />
          </div>
          </TabPanel>
          </div>
          <div className="sticky-header-tab-panel"> 
          <TabPanel value={value3} index={1} dir={theme.direction}>
          <div className="sticky-header-table-progress">
          <StickyHeaderTable columns={columnsQuizz} rows={inProgressFormsInTakingState} onRowSelectedHandler={ continueExistingFormBuilderForm }/>
          </div>
          <div className="sticky-header-table-edit-0">
          <ArrowRightIcon 
            style={plusOneIconStyleHeader()}
            className="comment-round-button-7"
          />
          </div>
          </TabPanel>
          </div>
          <div className="sticky-header-tab-panel"> 
          <TabPanel value={value3} index={2} dir={theme.direction}>
          <div className="sticky-header-table-take-submitted">
          <StickyHeaderTable columns={columnsQuizz} rows={currentUsersSubmittedFormsInSubmittedState} onRowSelectedHandler={ goToSubmittedForm }/>
          </div>
          <div className="sticky-header-table-edit-0">
          <UpIcon 
            style={plusOneIconStyleHeader()}
            color={"default"}
            className="comment-round-button-7"
          />
          </div>
          </TabPanel>
          </div>
          </SwipeableViews>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value4}
          onChangeIndex={handleChangeIndex4}
        >
          <TabPanel value={value4} index={0} dir={theme.direction}>
          <div class="content"/>
            <div class="sidebar"/>
              <div class="listItem"/>
              <div className="sticky-header-table">
              <StickyHeaderTable columns={tableData?.columns} rows={tableData?.rows} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll }/>
              </div>
          <EditIcon 
            style={plusOneIconStyleHeader()}
            className="comment-round-button-8"
          />
          </TabPanel>
          <TabPanel value={value4} index={1} dir={theme.direction} >
          <div>
          <StickyHeaderTable columns={columnsQuizz} rows={pendingFormsInBuildState} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll } />
            <EditIcon 
              style={plusOneIconStyleHeader()}
              color={"default"}
              className="comment-round-button-8"
            />
            </div>
          <br></br>
          <div> 
          </div>             
          </TabPanel>
          <TabPanel value={value4} index={2} dir={theme.direction}>
          <StickyHeaderTable columns={columnsQuizz} rows={publishedFormsInBuildState} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll }/>
          <EditIcon 
            style={plusOneIconStyleHeader()}
            color={"default"}
            className="comment-round-button-8"
          />
          </TabPanel>
          <TabPanel value={value4} index={3} dir={theme.direction}>
          <div className="user-item"/>
          <StickyHeaderTable columns={columnsQuizz} rows={currentUsersSubmittedFormsInSubmittedState} onRowSelectedHandler={ goToSubmittedForm }/>
          <UpIcon 
            style={plusOneIconStyleHeader()}
            color={"default"}
            className="comment-round-button-8"
          />
          </TabPanel>
          </SwipeableViews>
        </TabPanel>

      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          // key={fab.color}
          in={value === index }
          timeout={transitionDuration}
          style={{
            "top": "-45px",
            "left": "48%",
            color:"greenyellow",
            transitionDelay: `${(value === index) ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
    </>
  );
}

