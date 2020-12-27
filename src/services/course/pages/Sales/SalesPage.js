import React, { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
Redirect } from '@reach/router';

import {
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,     
getCoursesByCourseIdSelector  } from '../../Selectors';

import { 
addToSalesCart, 
loginUser  } from '../../actions';

import { 
Validations } from  '../../../../helpers/validations';

import { 
Link } from '@reach/router';

 
import SessionSignUpComponent from '../Sessions/SessionSignUpComponent';
import BuySessionPackageComponent from '../Sales/BuySessionPackageComponent';


import './SalesPage.css'; // create different css per page


const SalesPage = ({ 
operatorBusinessName,
operator,    
course, 
courseId, 
navigate, 
addToSalesCart, 
currentUser, 
users,
children }) => {

const [ totalNumberOfSessions, setTotalNumberOfSessions ] = useState(1);
const [ sessionType, setSessionType ] = useState(undefined);
const [ autoRenew, setAutoRenewal ] = useState(false);
const MyCourses = `/${operatorBusinessName}/mycourses`;


    useEffect(() => {
       
        if ( ! userOwnsCourse(currentUser, courseId) ) {
            
            BuySessionPackageComponent(setSessionType);              
        } 

    }, [  ]);



    if ( currentUser?.paymentStatus === "approved" ) {

        navigate(MyCourses);
    }
    

    const userOwnsCourse = (user, courseId) => {

        if ( ! user ) {

            return false;
        }
    
        if ( user.userRole === 'admin' ) {
    
            return true;
        }
    
        return user?.courses?.includes(courseId);
    }


   if ( userOwnsCourse(currentUser, courseId) ) {
    
     return <Redirect to={`/${operatorBusinessName}/courses/${courseId}`} noThrow/>

   } 
   

   let tutor = users.find(user => user._id === course?.createdBy)

   let numberOfSessions = 0;


   const addToCartAndReturnToCourses = () => {

      addCourseToCart(
             course, 
             sessionType,  
             numberOfSessions, 
             totalNumberOfSessions, 
             currentUser?._id, 
             tutor,
             Date.now(),
             Date.now(),
             true,
             autoRenew,
             Date.now() );
   }
   

   const addCourseToCart = ( 
             course, 
             sessionType,  
             numberOfSessions, 
             totalNumberOfSessions, 
             userId,  
             tutor, 
             startDate,
             endDate,
             status,
             autoRenew,
             autoRenewDates  ) => {
 
       let duplicateItemsExist = ( (currentUser?.cart?.filter(item => item?.course?._id === courseId ))?.length > 0 );

       if ( duplicateItemsExist ) {
          
            Validations.warn(`Duplicate. ${course?.name} is already in your cart.`);

            navigate(MyCourses);

          return;
        }

        else {

                addToSalesCart( 
                        course, 
                        sessionType,  
                        numberOfSessions, 
                        totalNumberOfSessions, 
                        userId, 
                        tutor,
                        startDate,
                        endDate,
                        status,
                        autoRenew,
                        autoRenewDates );

                navigate(MyCourses);

        }
      
   }


   let tutorsName = `${tutor?.firstname}`;

    return (
           <div className={"Sales"}>
                 <header></header>
               <div className={"content"}> 
                  <div className={""}>

                  <div className="cart-item">
        
                        <h1> NEW SESSION </h1>  <div> <br></br>   <h3> {course && course?.name }</h3> </div>  
     
                        <div>by</div> 

                        <img src={tutor?.files[0]} className={"avatar-img-preview"}/>
                        <div> { course && tutorsName } </div>
                        <div> { course && course?.description } </div>
  
                            {  
                                     ( sessionType === "Package" ) ? < SessionSignUpComponent 
                                                                            setNumberOfSessionsValue={setTotalNumberOfSessions}
                                                                            setAutoRenewValue={setAutoRenewal}
                                                                     />
                                                                     : <div> {sessionType && `Per Session`} </div> 


                            }

                        <div> <Link to={`/${operatorBusinessName}/course/${course?._id}/user/${tutor?._id}/review`}> { "Ratings & Review" }</Link> </div>

                        <button onClick={addToCartAndReturnToCourses}>ADD SESSION</button>   
                
                        {Validations.setErrorMessageContainer()}
                    
                    </div>
                        <div class="marquee">
                            <div class="reviews">  { children } </div>
                        </div>
                  </div>
               </div>
           </div>
    
    )
}


const mapState = (state, ownProps) => ({
     currentUser: state.users.user,
     course: getCoursesByCourseIdSelector(state, ownProps),
     operator: getOperatorFromOperatorBusinessName(state, ownProps),
     users: getUsersByOperatorId(state, ownProps),
//   userOwnsCourse: userOwnsCourse(state, props)
});


export default connect(mapState, { addToSalesCart, loginUser })(SalesPage);