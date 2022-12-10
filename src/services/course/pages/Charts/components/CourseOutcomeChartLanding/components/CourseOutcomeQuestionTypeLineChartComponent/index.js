import { getTertiarySectionData  } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { optionsData } from 'services/course/pages/Charts/components/CustomChart/helpers/customLineChart/dataHelper';
import { colorStyles } from 'services/course/pages/Charts/components/helpers/customChartHelpers/customLineChartHelper/dataHelper';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import chartOptions from 'services/course/pages/Charts/components/helpers/customChartHelpers/customLineChartHelper/chartHelper';
import CustomChart from 'services/course/pages/Charts/components/CustomChart';
import Select from 'react-select';
import { capitalizeFirstLetterOfString } from 'services/course/helpers/PageHelpers';


const CourseOutcomeQuestionTypeLineChartComponent = ({ groupedChartProps, pieChartData, labels, datasets, formTypeSelectorProp }) => {
    
    let { tertiaryData, handleToggleButton, mainHeaderOutcomeTitle, displayFormTypeOptions, getLessonInsights } = pieChartData;

    let { handleMultiSelectFormTypeSelection, selectedMultiSelectFormTypeOptions, multiSelectFormTypeCollection } = formTypeSelectorProp;

 return <div className='col course-sidepanel'> 
          <CustomChart groupedBarChartProps={groupedChartProps} labels={labels} datasets={datasets} type={'line'} optionsData={optionsData('Course Lesson Outcomes - Pass Rate per Form Type')} chartOptions={chartOptions}/>
          <div className={`course-tertiary-select`}>
            <Select
              placeholder={`Select insights`}
              menuPlacement={'top'}
              closeMenuOnSelect={false}
              defaultValue={[{ value: formTypes?.lessoninsights,  label: formTypes?.lessoninsights }]}
              isMulti
              value={selectedMultiSelectFormTypeOptions}
              onChange={handleMultiSelectFormTypeSelection}
              options={ multiSelectFormTypeCollection } 
              styles={colorStyles}
            />
          </div>
          <div className={`row course-tertiary-sidepanel`}>
            <button className='toggleButton2' onClick={handleToggleButton}>{''}</button>
            <div className={'course-insights-data'}>
              <div className={'course-insights-data-title'} onClick={() => getLessonInsights()}>
                <h4>{(!displayFormTypeOptions) ? `Hover over a data point to view data` : capitalizeFirstLetterOfString(mainHeaderOutcomeTitle)}</h4>
              </div>
              { ( mainHeaderOutcomeTitle ) && ( displayFormTypeOptions ) &&
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

export default CourseOutcomeQuestionTypeLineChartComponent;