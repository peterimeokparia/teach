import * as React from 'react';

import { 
green, 
deepOrange, } from '@mui/material/colors';

import { 
useTheme } from '@mui/material/styles';

import {
navigate } from '@reach/router';

import {
v4 as uuidv4 } from 'uuid';

import {
addIconStyleHeader,
plusOneIconStyleHeader } from './inlineStyles';

import {
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import {
columnsQuizz } from 'services/course/pages/components/StickyHeaderTable/helpers'; 

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
import './style.css';
/* <MenuItem value={item}>{`version: ${ moment(item?.timeSaved)?.local().format('YYYY-MM-DD hh:mm:ss') }`}</MenuItem> */

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

export default function FloatingActionButtonZoom({ props }) {
  const theme = useTheme();
  const {
    operatorBusinessName,
    currentUser,
    formBuilders,
    formsInBuildState,
    formsInUse,
    pendingFormsInBuildState,
    publishedFormsInBuildState,
    inProgressFormsInTakingState,
    submittedFormsInTakingState,
    allSubmittedFormsInTakingState,
    loadPagedFormBuilders,
    formType,
    formName,
    formId,
    formUuId,
    courseId,
    lessonId,
    userId,
    addNewFormBuilder,
    saveFormBuilder,
    addTime,
    saveTime,
    loadTestTimers, 
    timer,
    currentUserTimer,
    allTimers
  } = props;

  const [ value, setValue ] = React.useState(currentUser?.role === role.Student ? 1 : 0);
  const [ value2, setValue2 ] = React.useState(0);
  const [ value3, setValue3 ] = React.useState(0);

  const generateUuid = () => {
    const uuid = uuidv4();
    return uuid;
  };

  const handleChange = (event, newValue) => {
    if ( currentUser?.role === role.Student ){
      setValue(1);
    } else {
      setValue(newValue);
    } 
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const getCurrentTimer = ( selectValue ) => {
    return allTimers?.find( timer => timer?.formName === selectValue?.formName && timer?.userId === userId );
  };

  const addNewFormBuilderForm = () => {

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
      status: "Pending",
      state: "Manage",
      formBuilderStatus: elementMeta.status.Editing
    };

    addNewFormBuilder( newBuilder );
  };

  const editExistingFormBuilderForm = ( selectValue ) => {
    if ( selectValue ) {
      saveFormBuilder( { ...selectValue, state: "Manage", status: "Pending", formBuilderStatus: elementMeta.status.Editing, userId: currentUser?._id, } );
      navigateToSelectedForm(selectValue, selectValue?.formType,  elementMeta.status.Editing); 
    }
  };

  const takeExistingFormBuilderForm = ( selectValue  ) => { 
    alert('start new report')
    let formUuId = generateUuid();
    let currentTimer = getCurrentTimer( selectValue );
   
    if ( selectValue ) {
  
      let newBuilder = {
        operatorBusinessName: selectValue?.operatorBusinessName,
        formType: selectValue?.formType,
        formName: selectValue?.formName,
        courseId: selectValue?.courseId,
        lessonId: selectValue?.lessonId,
        formUuId,
        formId: selectValue?.formId,
        createDateTime: selectValue?.createDateTime,
        takingDateTime: Date.now(),
        createdBy: selectValue?.createdBy,
        userId: currentUser?._id,
        status: "InProgress",
        state: "Taking",
        formBuilderStatus: elementMeta.status.NotEditing
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

    alert('take new existing report / continue existing report')

    loadTestTimers();

    let currentTimer = getCurrentTimer( selectValue );

    // if it's not quizz, homework, exam we don't need to worry about getting or setting the timer - fix
    if ( !currentTimer?._id && timer?._id ){
      addTime({ formType: selectValue?.formType, formName: selectValue?.formName, formUuId: selectValue?.formUuId, testTime: timer?.testTime, userId, role: currentUser?.role });
    }

    if ( selectValue ) {
      saveFormBuilder( { ...selectValue, status: "InProgress", formBuilderStatus: elementMeta.status.NotEditing, takingDateTime: Date.now(), userId: currentUser?._id, } );
    }
  };

  const goToSubmittedForm = ( selectValue ) => {
    if ( selectValue ) {  
      navigateToSelectedForm(selectValue, selectValue?.formType, elementMeta.status.NotEditing);
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

  function navigateToSelectedForm(selectValue, formtype, formbuilderstatus){
    switch (formtype) {
      case formTypes?.quizzwithpoints:
        navigate(`/${selectValue?.operatorBusinessName}/formBuilder/${selectValue?.formType}/${selectValue?.formName}/${selectValue?.formId}/${selectValue?.formUuId}/${selectValue?.userId}/${formbuilderstatus}`);
        break;
      case formTypes?.report:
        navigate(`/${selectValue?.operatorBusinessName}/formBuilder/${selectValue?.formType}/${selectValue?.formName}/${selectValue?.formUuId}/${selectValue?.userId}/${formbuilderstatus}`);
        break;
      default:
        break;
    }
  }

  function handleSelectedBuildEditSelectedAll( selected ) {
    editExistingFormBuilderForm( selected )
  }

  function toggleHeaderTabs( label1, label2 ){
    return (
      <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label={ label1 } {...a11yProps(0)} />
          <Tab label={ label2 } {...a11yProps(1)} />
        </Tabs>
    )
  }

  // return < StickyHeaderTable columns={columnsQuizz} rows={publishedFormsInBuildState} onRowSelectedHandler={ takeExistingFormBuilderForm }/>
  return (
    <>
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 1000,
        position: 'relative',
        minHeight: 200,
      }}
      className="formbuilder"
    >
      <AppBar position="static" color="default">
        {( currentUser?.role === role?.Student ) 
          ? toggleHeaderTabs("Take", formType )
          : toggleHeaderTabs(`Manage ${ formType }`, `Take ${ formType }`)
        } 
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <AppBar position="static" color="default">
                <Tabs
                  value={value2}
                  onChange={handleChange2}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="action tabs example"
                >
                  <Tab icon={ <AddIcon  color="primary"/> }  label="All" {...a11yProps2(0)} />
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
          <TabPanel value={value2} index={0} dir={theme.direction}>
          <div class="content"/>
            <div class="sidebar"/>
              <div class="listItem"/>
          < StickyHeaderTable columns={columnsQuizz} rows={formsInBuildState} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll }/>
          <EditIcon 
            // onClick={ () => handleSelectedBuildEditSelectedAll( selectedItem )} 
            style={plusOneIconStyleHeader()}
            className="comment-round-button-8"
          />
          </TabPanel>
          <TabPanel value={value2} index={1} dir={theme.direction} >
          {/* <Link to={selectedPage?.path} > <span title={selectedPage?.status} > { selectedPage?._id } </span> </Link>  */}
          <div>
          < StickyHeaderTable columns={columnsQuizz} rows={pendingFormsInBuildState} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll } />
            <EditIcon 
              // onClick={ () => handleSelectedBuildEditSelectedAll( selectedItem )} 
              style={plusOneIconStyleHeader()}
              color={"default"}
              className="comment-round-button-8"
            />
            </div>
          <br></br>
          <div> 
          </div>             
          </TabPanel>
          <TabPanel value={value2} index={2} dir={theme.direction}>
          < StickyHeaderTable columns={columnsQuizz} rows={publishedFormsInBuildState} onRowSelectedHandler={ handleSelectedBuildEditSelectedAll }/>
          <EditIcon 
            // onClick={ () => handleSelectedBuildEditSelectedAll( selectedItem )} 
            style={plusOneIconStyleHeader()}
            color={"default"}
            className="comment-round-button-8"
          />
          </TabPanel>
          <TabPanel value={value2} index={3} dir={theme.direction}>
          <div className="user-item"/>
          < StickyHeaderTable columns={columnsQuizz} rows={allSubmittedFormsInTakingState} onRowSelectedHandler={ goToSubmittedForm }/>
          <UpIcon 
            // onClick={ () => goToSubmittedForm( selectedItem )} 
            style={plusOneIconStyleHeader()}
            color={"default"}
            className="comment-round-button-8"
          />
          </TabPanel>
          </SwipeableViews>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <AppBar position="static" color="default">
          <Tabs
            value={value3}
            onChange={handleChange3}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab icon={<AddIcon />} label="All" {...a11yProps3(0)} />
            <Tab icon={<ArrowRightIcon />} label="In Progress" {...a11yProps3(1)} />
            <Tab icon={<UpIcon />} label="Submitted" {...a11yProps3(2)} /> 
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value3}
          onChangeIndex={handleChangeIndex3}
        >
          <TabPanel value={value3} index={0} dir={theme.direction}>
          < StickyHeaderTable columns={columnsQuizz} rows={publishedFormsInBuildState} onRowSelectedHandler={ takeExistingFormBuilderForm }/>
          <AddIcon 
            // onClick={ () => takeExistingFormBuilderForm( selectedItem )} 
            style={plusOneIconStyleHeader()}
            className="comment-round-button-7"
          />
          </TabPanel>
          <TabPanel value={value3} index={1} dir={theme.direction}>
          < StickyHeaderTable columns={columnsQuizz} rows={inProgressFormsInTakingState} onRowSelectedHandler={ continueExistingFormBuilderForm }/>
          <ArrowRightIcon 
            // onClick={ () => continueExistingFormBuilderForm( selectedItem )} 
            style={plusOneIconStyleHeader()}
            className="comment-round-button-7"
          />
          </TabPanel>
          <TabPanel value={value3} index={2} dir={theme.direction}>
          < StickyHeaderTable columns={columnsQuizz} rows={submittedFormsInTakingState} onRowSelectedHandler={ goToSubmittedForm }/>
          <UpIcon 
            // onClick={ () => goToSubmittedForm( selectedItem )} 
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
          key={fab.color}
          in={value === index }
          timeout={transitionDuration}
          style={{
            "top": "-15px",
            "left": "45%",
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

