import { connect } from 'react-redux';
import { dataPieChart1, dataPieChart2, dataPieChart3, getTertiarySectionData  } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import CustomPieChart from 'services/course/pages/Charts/components/CustomPieChart';
import FormTypeSelectorComponent from 'services/course/pages/Charts/components/FormTypeSelectorComponent';
import './style.css';

const OutcomeChartLanding = ( { pieChartData } ) => {

  if ( isEmptyObject( pieChartData ) ) return;

  let { pie1, pie2, pie3, tertiaryData, lessonOutcomes, handleToggleButton, handleSelectedFormType, selectedFormType, formTypeCollection } = pieChartData;

return <div className='row landing-main-visible' onDoubleClick={handleToggleButton}> 
    <div className='col landing-primary'>
      <div className='row landing-primary-row'>
        <div className='col'> 
          <CustomPieChart 
            data={dataPieChart3(pie3, lessonOutcomes, selectedFormType)} 
            handleSelectedFormType={handleSelectedFormType} 
            selectedFormType={selectedFormType}
            formTypeCollection={formTypeCollection}
          /> 
        </div>
        <div className='col'> 
          <CustomPieChart data={dataPieChart1(pie1)} /> 
        </div>
      </div>
    </div>
    <button className='toggleButton2' onClick={handleToggleButton}>{''}</button>
    <div className='col landing-secondary'>
      <div className='row landing-secondary-row'>
        <CustomPieChart data={dataPieChart2(pie2)} />
      </div>
    </div>
    <div className={`row landing-tertiary-select`}> 
      <FormTypeSelectorComponent 
        formTypeCollection={formTypeCollection} 
        handleSelectedFormType={handleSelectedFormType} 
        selectedFormType={selectedFormType}
      />
    </div>
    <div className={`row landing-tertiary-sidepanel`}>
      <p className={'landing-insights-data'}>
        <div className='row justify-content-center'>
          { <> 
            {tertiaryData?.map(( data ) =>  getTertiarySectionData( data ) )}
            </>
          }
        </div>
      </p>
    </div>
  </div>
};
const mapState = (state, ownProps) => ({
  currentUser: state?.users?.user,
  outcomes: Object?.values(state?.outcomes?.outcomes),
  outcomeInsights: Object?.values(state?.outcomeInsights?.outcomeInsights),
  toggleLessonOutcomeInsightModal: state?.outcomeInsights?.lessonOutcomeInsightModal
});

export default connect(mapState,null)(OutcomeChartLanding);
