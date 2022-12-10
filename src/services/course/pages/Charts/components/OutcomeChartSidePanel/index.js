import { connect } from 'react-redux';
import { toggleLessonOutcome } from 'services/course/actions/outcomeInsights';
import CustomPieChart from 'services/course/pages/Charts/components/CustomPieChart';
import { dataPieSidePanelChart1, dataPieSidePanelChart2, dataPieSidePanelChart1Default, dataPieSidePanelChart2Default } from 'services/course/pages/Charts/components/OutcomeChartSidePanel/helpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import { role } from 'services/course/helpers/PageHelpers';
import FormTypeSelectorComponent from 'services/course/pages/Charts/components/FormTypeSelectorComponent';
import useFormTypeSelectorHook from 'services/course/pages/Charts/hooks/useFormTypeSelectorHook';
import './style.css';

const OutcomeChartSidePanel = ({ toggleLessonOutcomeInsightModal, toggleLessonOutcome, outcome, outcomeInsights, currentUser }) => {

  if ( isEmptyObject( outcomeInsights ) ) return null;

  let { 
    formTypeSelectorProp 
  } = useFormTypeSelectorHook( outcomeInsights, currentUser ) || {};

  let { handleSelectedFormType, selectedFormType, formTypeCollection, selectedOutcomeInsights } = formTypeSelectorProp;

  if ( selectedOutcomeInsights?.length === 0 ) return null;

    let { color } = Object(outcome);

  return <div className='row main-sidepanel-visible' style={{borderColor: (!color) ? 'white' : color, borderStyle: 'solid', borderWidth: 5 }}>
            <div className='title-header' style={{ backgroundColor: 'black'}}>{ (!outcome?._id) ? '' : `${outcome?.title}` }</div>
            <div className='row primary-sidepanel'> 
              <div className='primary-row-sidepanel'>
              { ( ( !outcome?._id && toggleLessonOutcomeInsightModal ) ) 
                  ? <CustomPieChart data={ dataPieSidePanelChart1Default( selectedOutcomeInsights ) } />
                  : <CustomPieChart data={ dataPieSidePanelChart1( selectedOutcomeInsights?.find(item => item?.outcomeId === outcome?._id ))} />    
              }
              </div>
            </div>
            <button className='toggleButton3' style={{backgroundColor: (!color) ? 'white' : color }} onClick={ toggleLessonOutcome }>{''}</button>
            <div className='row secondary-sidepanel'>
              <div className='secondary-row-sidepanel'>
              { ( ( !outcome?._id && toggleLessonOutcomeInsightModal ) ) 
                    ? <CustomPieChart data={ dataPieSidePanelChart2Default( selectedOutcomeInsights ) } />
                    : <CustomPieChart data={ dataPieSidePanelChart2( selectedOutcomeInsights?.find(item => item?.outcomeId === outcome?._id ))} />    
              }
              </div>
            </div>
            <div className={`row tertiary-select`}> 
              <FormTypeSelectorComponent 
                formTypeCollection={formTypeCollection} 
                handleSelectedFormType={handleSelectedFormType} 
                selectedFormType={selectedFormType}
              />
            </div>
          </div>
};

const mapState = ( state, ownProp ) => ({
  currentUser: state?.users?.user,
  toggleLessonOutcomeInsightModal: state?.outcomeInsights?.lessonOutcomeInsightModal,
  outcomeInsights: Object.values(state?.outcomeInsights?.outcomeInsights)
});

export default connect(mapState, { toggleLessonOutcome })(OutcomeChartSidePanel);