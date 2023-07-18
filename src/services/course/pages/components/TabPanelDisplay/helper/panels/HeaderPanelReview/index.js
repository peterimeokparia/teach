import * as React from 'react';
import { connect } from 'react-redux';
import { plusOneIconStyleHeader } from './inlineStyles';
import { columnsQuizz } from 'services/course/pages/components/StickyHeaderTable/helpers'; 
import { TabPanel, a11yProps } from 'services/course/pages/components/TabPanelDisplay/helper';
import {  getSubmittedFormsInCreatorsReviewBucket, getSubmittedFormsInCreatorsReviewedBucket, getSubmittedFormsInCreatorsReviewingBucket } from 'services/course/selectors/formBuilderFormSelectors';
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

function HeaderPanelReview({
  props, 
  formType,
  submittedFormsForCreatorReview,
  currentlyReviewingSubmittedForms,
  creatorReviewedSubmittedForms }){
   let {
    headerValue,
    headerValueSub,
    handleChangeSub,
    handleChangeIndexSub,
    theme,
    creatorReviewsUserSubmittedForm,
    creatorReviewingUserSubmittedForm,
    userGoesToReviewedForm
   } = props;

return (
  <TabPanel value={headerValue} index={2} dir={theme.direction} className='secondary-toolbars-take'>
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
      <Tab icon={<AddIcon />} label={`Submitted ${formType} for review`} {...a11yProps(0)} />
      <Tab icon={<ArrowRightIcon />} label={`Creator Reviewing ${formType}`} {...a11yProps(1)} />
      <Tab icon={<UpIcon />} label={`Creator Reviewed ${formType}`} {...a11yProps(2)} /> 
    </Tabs>
  </AppBar>
  <SwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={headerValueSub}
    onChangeIndex={handleChangeIndexSub}
  >
    <div className="sticky-header-tab-panel"> 
    <TabPanel value={headerValueSub} index={0} dir={theme.direction}>   
      <div className="sticky-header-table-take-submitted">
        <StickyHeaderTable columns={columnsQuizz} rows={ submittedFormsForCreatorReview } onRowSelectedHandler={ creatorReviewsUserSubmittedForm }/>
      </div>
    <EditIcon 
      style={plusOneIconStyleHeader()}
      className="comment-round-button-8"
    />
    </TabPanel>
    </div>

    <div className="sticky-header-tab-panel"> 
    <TabPanel value={headerValueSub} index={1} dir={theme.direction}>   
      <div className="sticky-header-table-take-submitted">
        <StickyHeaderTable columns={columnsQuizz} rows={ currentlyReviewingSubmittedForms } onRowSelectedHandler={ creatorReviewingUserSubmittedForm }/>
      </div>
    <EditIcon 
      style={plusOneIconStyleHeader()}
      className="comment-round-button-8"
    />
    </TabPanel>
    </div>

    <div className="sticky-header-tab-panel"> 
    <TabPanel value={headerValueSub} index={2} dir={theme.direction} > 
    <div>
    <div className="sticky-header-table-take-submitted">  
    <StickyHeaderTable columns={columnsQuizz} rows={ creatorReviewedSubmittedForms } onRowSelectedHandler={ userGoesToReviewedForm } />
    </div>
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
    </SwipeableViews>
  </TabPanel>
   );
}

const mapState = ( state, ownProps ) => {
  return {
    submittedFormsForCreatorReview: getSubmittedFormsInCreatorsReviewBucket( state, ownProps ),
    currentlyReviewingSubmittedForms: getSubmittedFormsInCreatorsReviewingBucket(  state, ownProps   ),
    creatorReviewedSubmittedForms: getSubmittedFormsInCreatorsReviewedBucket( state, ownProps )
  };
};

export default connect(mapState, null)(HeaderPanelReview);
