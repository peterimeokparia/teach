import {
connect } from 'react-redux';

import { 
saveGrade } from '../../actions';

import {
Link } from '@reach/router';

import {
getSortedRecordsByDate } from '../../selectors';

import {
role } from '../../../../helpers/pageHelpers';

import Roles from '../Components/roles/Role';
import ListItemComponent from '../Components/ListItemComponent';
import EditQuestionComponent from './EditQuestionComponent';



const GradeComponent = ({ 
studentId, 
currentUser,
saveGrade,
grades }) => {


    function onMatchListItem( match, listItem ) {

        if ( match ){
            // setCurrentTutor( listItem );
            // setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${groupId}/${classRoomGroupName}/${listItem._id}/${listItem.firstname}`);
        }
    } 


    return   (    
         <div>    
             {
              ( grades ) && <ListItemComponent
                                collection={getSortedRecordsByDate(grades?.filter(grade => grade?.studentId === studentId), 'testDate')}
                                onMatchListItem={onMatchListItem}
                                path={"student"}
                            >
                          {
                            ( selectedGrade ) => (

                            < EditQuestionComponent
                                grade={selectedGrade}
                                className="lesson-item"
                                onSubmit={(grade) => saveGrade({...selectedGrade, testDate: grade?.testDate, score: grade?.score  })}
                            >

                            { (edit, remove ) => (

                            <div>      
                                <div>
                                 
                                
                                     <div>
                                         <div><h6>{selectedGrade?.testDate}</h6></div>
                                         <span> Score </span>
                                         <span className="gradesHeader"> %Change </span>
                                         <span className="gradesHeader"> Symbol </span>
                                     </div>

                                
                                <Link to={`student/${ studentId }/grades/${selectedGrade?._id}`}> <span title={selectedGrade?._id} >{ selectedGrade?.score } </span> </Link> 

                                 <span className="grades"> { selectedGrade?.percentChange } </span>

                                 <span className="grades"> { selectedGrade?.symbol } </span>

                                <br></br>

                                <div> 

                                <Roles
                                    role={currentUser?.role === role.Tutor }
                                >
                                        <button 
                                            className="edit-lesson-btn"
                                            onClick={() => { edit( selectedGrade ) } }                                          
                                        > 
                                            Edit
                                                
                                        </button>

                                </Roles>

                                <Roles
                                    role={ currentUser?.role === role.Tutor }
                                >
                                    <span>
                                        <button
                                            className="delete-lesson-btn"
                                            onClick={() => { remove( selectedGrade ) }}> 

                                            Delete 

                                        </button> 
                                    </span>

                                </Roles>
                                

                                </div>  
                                </div>
                                
                            </div>
                            )}
                            </EditQuestionComponent> 
                            )
                        }
                        

                    </ListItemComponent>                    
             }
 
            
         </div> 
    )  

}





const mapState = (state, ownProps)   => {
  return {
         currentUser: state.users.user,
         grades: Object.values(state?.grades?.grades),
         lesson: state.lessons.lessons[ownProps.lessonId]
  };
}


export default connect(mapState, { saveGrade  } )(GradeComponent);