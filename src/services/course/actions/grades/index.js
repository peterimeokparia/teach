import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const LOAD_GRADES_BEGIN = "LOAD GRADES BEGIN";
export const LOAD_GRADES_SUCCESS = "LOAD GRADES SUCCESS";
export const LOAD_GRADES_ERROR = "LOAD GRADES ERROR";
export const ADD_NEW_GRADE_BEGIN = "ADD NEW GRADE BEGIN";
export const ADD_NEW_GRADE_SUCCESS = "ADD NEW GRADE SUCCESS"; 
export const ADD_NEW_GRADE_ERROR = "ADD NEW GRADE ERROR";
export const SAVE_GRADE_BEGIN = "SAVE GRADE BEGIN";
export const SAVE_GRADE_SUCCESS = "SAVE GRADE SUCCESS";
export const SAVE_GRADE_ERROR = "SAVE GRADE ERROR";
export const DELETE_GRADE_BEGIN = "DELETE GRADE BEGIN";
export const DELETE_GRADE_SUCCESS = "DELETE GRADE SUCCESS"; 
export const DELETE_GRADE_ERROR = "DELETE GRADE ERROR";
export const TOGGLE_ADD_NEW_GRADE_FORM = "TOGGLE ADD NEW GRADE FORM";

export const loadGrades = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_GRADES_BEGIN });
         return get(`/grades`)
          .then( grades => { 
                dispatch({ type: LOAD_GRADES_SUCCESS, payload: grades }); 
           }).catch( error => {
               dispatch({ type: LOAD_GRADES_ERROR , error });
           }); 
    };
};

export const loadGradesByStudentId = ( studentId ) => {
    return dispatch => {
         dispatch({ type: LOAD_GRADES_BEGIN });
         return getById( studentId, `/grades?studentId=` )
          .then( grades => {           
            dispatch({ type: LOAD_GRADES_SUCCESS, payload: grades }); 
           }).catch( error => {
               dispatch({ type: LOAD_GRADES_ERROR , error });
           });         
    };
};

export const addNewGrade = ( latestGrade, course, pushNotificationUser ) => {
    return dispatch => {
       dispatch({ type: ADD_NEW_GRADE_BEGIN });
        return add({ ...latestGrade }, '/grades' )
            .then( grade => { 
                dispatch({ type: ADD_NEW_GRADE_SUCCESS, payload: { grade, course, pushNotificationUser } });
            }).catch( error => {
                dispatch({ type: ADD_NEW_GRADE_ERROR , error });
            });   
    };
};

export const saveGrade = ( grade ) => {
   return dispatch => {
        dispatch({ type: SAVE_GRADE_BEGIN });
        return update( grade, `/grades/` )
         .then( grade => {  
             dispatch({        
              type: SAVE_GRADE_SUCCESS, payload: grade }); 
          }).catch( error => {
              dispatch({ type: SAVE_GRADE_ERROR , error });
          });
   };
};

export const deleteGrade = grade => {
   return dispatch => {
       dispatch({ type: DELETE_GRADE_BEGIN });
        return remove( grade, `/grades/` )
        .then( () => {
            dispatch({ type: DELETE_GRADE_SUCCESS, payload: grade });
        }).catch( error => {
            dispatch({ type: DELETE_GRADE_ERROR , error });
        });
   };
};

// export const addNewGrade = ( student, course, grade, currentGrades, pushNotificationUser ) => {
//     return dispatch => {
//        dispatch({ type: ADD_NEW_GRADE_BEGIN });
//         return add({ ...calculateGrade( student, course, grade, currentGrades ) }, '/grades' )
//                 .then( grade => { 
//                         dispatch({        
//                             type: ADD_NEW_GRADE_SUCCESS, payload: grade });
//                             dispatch(sendPushNotificationMessage( 
//                                  pushNotificationUser, { 
//                                  title:'Grade Added!', 
//                                  body:`New Grade Added for course: ${ course?.name }` 
//                             })); 
//                 }).catch( error => {
//                     dispatch({ type: ADD_NEW_GRADE_ERROR , error });
//         });   
//     };
// };

// function calculateGrade( student, course, grade, currentGrades ){
//          let result, symbol;

//          if ( currentGrades ) {
//             let previousTestScore = currentGrades[currentGrades?.length -1]?.score;
//             let currentTestScore = parseInt(grade?.score, 10);

//                if ( previousTestScore ) {
//                     if ( previousTestScore > currentTestScore ) {
//                         result =  ( ( ( previousTestScore - currentTestScore ) / previousTestScore ) * 100 );
//                         symbol = "<";
//                      }
            
//                     if ( currentTestScore > previousTestScore ) {
//                         result =  ( ( ( currentTestScore - previousTestScore ) / previousTestScore ) * 100 );        
//                         symbol = ">";
//                     }

//                    if ( currentTestScore === previousTestScore ) {
//                         result = 0;
//                         symbol = "-";
//                     }
//                 }      
//          } else {
//             result = 0;
//             symbol = "-";
//         } 
//     return { ...grade, studentId: student?._id, percentChange: result, symbol: symbol }; 
// }