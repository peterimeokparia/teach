import { getTertiarySectionData  } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { optionsData } from 'services/course/pages/Charts/components/CustomChart/helpers/customLineChart/dataHelper';
import chartOptions from 'services/course/pages/Charts/components/helpers/customChartHelpers/customLineChartHelper/chartHelper';
import CustomChart from 'services/course/pages/Charts/components/CustomChart';

const CourseOutcomeMainLineChartComponent = ({ pieChartData, mainChartProps, labels, mainChartDatasets }) => {
    
    let { tertiaryData, handleToggleButton, mainHeaderOutcomeTitle, selectedLesson, getLessonInsights } = pieChartData;

 return <div>
    <CustomChart groupedBarChartProps={mainChartProps} labels={labels} datasets={mainChartDatasets} type={'line'} optionsData={optionsData('Course Lesson Outcomes - Pass Rate')} chartOptions={chartOptions}/> }
    <div className={`row course-tertiary-sidepanel`}>
      <button className='toggleButton2' onClick={handleToggleButton}>{''}</button>
      <div className={'course-insights-data'}>
        <div className={'course-insights-data-title'} onClick={() => getLessonInsights()}>
          <h4>{(!mainHeaderOutcomeTitle) ? `Hover over a data point to view data` : mainHeaderOutcomeTitle}</h4>
        </div>
        { selectedLesson &&
          <div className='row justify-content-center'>
          { <> 
            { tertiaryData.map(( data ) =>  getTertiarySectionData( data ) ) }
            </>
          }
          </div>
        }
      </div>
   </div>
  </div>
}

export default CourseOutcomeMainLineChartComponent;