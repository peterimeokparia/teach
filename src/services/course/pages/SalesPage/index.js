import { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
Redirect } from '@reach/router';

import {
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,     
getCoursesByCourseIdSelector  } from 'Services/course/Selectors';

import { 
addToSalesCart } from 'Services/course/Actions/Users';

import { 
Validations } from  'Services/course/helpers/Validations';

import { 
Link } from '@reach/router';

import SessionSignUpComponent from 'Services/course/Pages/SessionPage/Component/SessionSignUpComponent';
import BuySessionPackageComponent from './Components/BuySessionPackageComponent';
import './style.css'; 

const SalesPage = ({ 
    operatorBusinessName,
    operator,    
    loginUser,
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
        if ( ! userOwnsCourse(currentUser, courseId) && ( ! sessionType ) ) {       
            BuySessionPackageComponent(setSessionType);              
        } 
    }, [ currentUser, courseId, sessionType ]);

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
};

if ( userOwnsCourse(currentUser, courseId) ) { 
    return <Redirect to={`/${operatorBusinessName}/courses/${courseId}`} noThrow/>;
} 

let tutor = users.find(user => user._id === course?.createdBy), numberOfSessions = 0;

let cartConfig = {
    course, 
    sessionType: sessionType, 
    numberOfSessions: numberOfSessions, 
    totalNumberOfSessions: totalNumberOfSessions, 
    userId: currentUser?._id, 
    tutor: tutor,
    startDate: Date.now(),
    endDate: Date.now(),
    status: true, 
    autoRenew: autoRenew,
    autoRenewDates: Date.now()
};

const addToCartAndReturnToCourses = () => {
addCourseToCart( cartConfig );
};

const addCourseToCart = ( salesCartConfig ) => {
let duplicateItemsExist = ( (currentUser?.cart?.filter(item => item?.course?._id === courseId ))?.length > 0 );

if ( duplicateItemsExist ) {  
    Validations.warn(`Duplicate. ${salesCartConfig.course?.name} is already in your cart.`);
    navigate(MyCourses);
    return;
}
else {
    addToSalesCart( salesCartConfig ); 
    navigate(MyCourses);
 };
};

let tutorsName = `${tutor?.firstname}`;

return (
        <div className={"Sales"}>
            <header></header>
            <div className={"content"}> 
                <div className={""}>
                <div className="cart-item">
                    <h1> NEW SESSION </h1>  <div> <br></br>   <h3> {course && course?.name }</h3> </div>  
                    <div>by</div> 
                    <img src={tutor?.avatarUrl} className={"avatar-img-preview"} alt="user profile"/>
                    <div> { course && tutorsName } </div>
                    <div> { course && course?.description } </div>
                    {  
                        ( sessionType === "Package" ) 
                            ?   < SessionSignUpComponent 
                                    setNumberOfSessionsValue={setTotalNumberOfSessions}
                                    setAutoRenewValue={setAutoRenewal}
                                />
                            :   <div> {sessionType && `Per Session`} </div> 

                    }
                    <div> <Link to={`/${operatorBusinessName}/course/${course?._id}/user/${tutor?._id}/review`}> { "Ratings & Review" }</Link> </div>
                    <button onClick={ addToCartAndReturnToCourses }>ADD SESSION</button>   
                        { Validations.setErrorMessageContainer() }
                </div>
                <div class="marquee">
                <div class="reviews">  { children } </div>
                </div>
                </div>
            </div>
        </div>
); };

const mapState = (state, ownProps) => ({
    currentUser: state.users.user,
    course: getCoursesByCourseIdSelector(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps)
});

export default connect(mapState, { addToSalesCart })(SalesPage);