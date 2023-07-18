import * as React from 'react';
import { connect } from 'react-redux';
import { plusOneIconStyleHeader } from './inlineStyles';
import { role } from 'services/course/helpers/PageHelpers';
import { columnsQuizz } from 'services/course/pages/components/StickyHeaderTable/helpers'; 
import { TabPanel, a11yProps } from 'services/course/pages/components/TabPanelDisplay/helper';
import { getFormsInCreatorsPublishedBucket, getFormsInCreatorsPendingBucket } from 'services/course/selectors/formBuilderFormSelectors';
import Roles from 'services/course/pages/components/Roles';
import StickyHeaderTable from 'services/course/pages/components/StickyHeaderTable';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './style.css';

function HeaderPanelCreate({
  props,
  formType,
  publishedForms,
  pendingForms }){
  let {
    currentUser,
    headerValue,
    headerValueSub,
    handleChangeSub,
    handleChangeIndexSub,
    theme,
    handleSelectedBuildEditSelectedAll
   } = props;

return (<Roles role={( currentUser?.role === role.Tutor )}>
<TabPanel value={headerValue} index={0} dir={theme.direction} className='secondary-toolbars'>
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
          <Tab icon={ <AddIcon  color="primary"/> }  label={`Select ${formType}`} {...a11yProps(0)} />
          <Tab icon={ <EditIcon color="secondary"/>} label="Pending" {...a11yProps(1)} />
          <Tab icon={ <EditIcon color="default"/>} label="Published" {...a11yProps(2)} />
        </Tabs>
    </AppBar>
<SwipeableViews
  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  index={headerValueSub}
  onChangeIndex={handleChangeIndexSub}
>
  <div className="sticky-header-tab-panel"> 
  <TabPanel value={headerValueSub} index={0} dir={theme.direction}> 
  <div class="content"/>
  <div class="sidebar"/>
  <div class="listItem"/>
  <div className="sticky-header-table">          
  <StickyHeaderTable columns={columnsQuizz} rows={ publishedForms } onRowSelectedHandler={ handleSelectedBuildEditSelectedAll }/>
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
  <TabPanel value={headerValueSub} index={1} dir={theme.direction} >
  <div>
  <div className="sticky-header-table">
  <StickyHeaderTable columns={columnsQuizz} rows={ pendingForms } onRowSelectedHandler={ handleSelectedBuildEditSelectedAll } />
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
  <TabPanel value={headerValueSub} index={2} dir={theme.direction}>
  <div>
  <div className="sticky-header-table-published">
  <StickyHeaderTable columns={columnsQuizz} rows={ publishedForms } onRowSelectedHandler={ handleSelectedBuildEditSelectedAll }/>
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
  </SwipeableViews>
</TabPanel>
</Roles>
   );
}

const mapState = ( state, ownProps ) => {
  return {
    publishedForms: getFormsInCreatorsPublishedBucket( state, ownProps ),
    pendingForms: getFormsInCreatorsPendingBucket(  state, ownProps )
  };
};

export default connect(mapState, null)(HeaderPanelCreate);
