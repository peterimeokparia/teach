import * as React from 'react';
import { connect } from 'react-redux';
import { plusOneIconStyleHeader } from './inlineStyles';
import { TabPanel } from 'services/course/pages/components/TabPanelDisplay/helper';
import { getSubmittedFormsInUsersReviewBucket } from 'services/course/selectors/formBuilderFormSelectors';
import StickyHeaderTable from 'services/course/pages/components/StickyHeaderTable';
import SwipeableViews from 'react-swipeable-views';
import EditIcon from '@mui/icons-material/Edit';
import './style.css';

function HeaderPanelTable({ props }){
   let {
    headerValue,
    headerValueSub,
    handleChangeIndexSub,
    theme,
    handleSelectedBuildEditSelectedAll,
    tableData
   } = props;

return (
  <TabPanel value={headerValue} index={3} dir={theme.direction} className='secondary-toolbars'>
  <SwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={headerValueSub}
    onChangeIndex={handleChangeIndexSub}
  >
    <TabPanel value={headerValueSub} index={0} dir={theme.direction}>
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
    </SwipeableViews>
  </TabPanel>
   );
}

const mapState = ( state, ownProps ) => {
  return {
    submittedFormsInUsersReviewBucket: getSubmittedFormsInUsersReviewBucket( state, ownProps )
  };
};

export default connect(mapState, null)(HeaderPanelTable);
