import * as React from 'react';
import { connect } from 'react-redux';
import { plusOneIconStyleHeader } from './inlineStyles';
import { columnsQuizz } from 'services/course/pages/components/StickyHeaderTable/helpers'; 
import { TabPanel, a11yProps } from 'services/course/pages/components/TabPanelDisplay/helper';
import { getFormsInUsersPublishedBucket, getFormsInUsersInProgressBucket, getSubmittedFormsInUsersReviewBucket, getSubmittedFormsInUsersReviewedBucket } from 'services/course/selectors/formBuilderFormSelectors';
import StickyHeaderTable from 'services/course/pages/components/StickyHeaderTable';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './style.css';

function HeaderPanelTake({
  props,
  formType,
  publishedForms,
  formsInProgress,
  submittedFormsInReview,
  reviewedSubmittedForms }){
   let {
    headerValue,
    headerValueSub,
    handleChangeSub,
    handleChangeIndexSub,
    theme,
    takeExistingFormBuilderForm,
    continueExistingFormBuilderForm,
    currentUserFormInReview,
    reviewedCurrentUserForm
   } = props;

return (
    <TabPanel value={headerValue} index={1} dir={theme.direction}  className='secondary-toolbars-take'>
    <AppBar position="static" color="default">
      <Tabs
        value={headerValueSub}
        onChange={handleChangeSub}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="action tabs example"
        orientation={"vertical"}  
      >
        <Tab icon={<AddIcon />} label={`Select ${formType}`} {...a11yProps(0)} />
        <Tab icon={<ArrowRightIcon />} label="In Progress" {...a11yProps(1)} />
        <Tab icon={<UpIcon />} label="Review" {...a11yProps(2)} /> 
        <Tab icon={<ArrowRightIcon />} label="Reviewed" {...a11yProps(3)} />
      </Tabs>
    </AppBar>
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={headerValueSub}
      onChangeIndex={handleChangeIndexSub}
    >
      <div className="sticky-header-tab-panel"> 
      <TabPanel value={headerValueSub} index={0} dir={theme.direction}>
      <div className="sticky-header-table-take">
      <StickyHeaderTable columns={columnsQuizz} rows={ publishedForms } onRowSelectedHandler={ takeExistingFormBuilderForm }/>
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
      <TabPanel value={headerValueSub} index={1} dir={theme.direction}>
      <div className="sticky-header-table-progress">
      <StickyHeaderTable columns={columnsQuizz} rows={ formsInProgress } onRowSelectedHandler={ continueExistingFormBuilderForm }/>
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
      <TabPanel value={headerValueSub} index={2} dir={theme.direction}> 
      <div className="sticky-header-table-take-submitted"> 
      <StickyHeaderTable columns={columnsQuizz} rows={ submittedFormsInReview } onRowSelectedHandler={ currentUserFormInReview } />
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
      </div> 
      
      <div className="sticky-header-tab-panel"> 
      <TabPanel value={headerValueSub} index={3} dir={theme.direction}>
      <div className="sticky-header-table-take-submitted"> 
      <StickyHeaderTable columns={columnsQuizz} rows={ reviewedSubmittedForms } onRowSelectedHandler={ reviewedCurrentUserForm }/>
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
   );
}

const mapState = ( state, ownProps ) => {
  return {
    publishedForms: getFormsInUsersPublishedBucket( state, ownProps ),
    formsInProgress: getFormsInUsersInProgressBucket( state, ownProps ),
    submittedFormsInReview: getSubmittedFormsInUsersReviewBucket( state, ownProps  ),
    reviewedSubmittedForms: getSubmittedFormsInUsersReviewedBucket( state, ownProps )
  };
};

export default connect(mapState, null)(HeaderPanelTake);
