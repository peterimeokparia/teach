import { 
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import {
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,     
getCoursesByCourseIdSelector  } from 'services/course/selectors';

import {
addToSalesCart } from 'services/course/actions/users';

import { 
Validations } from  'services/course/helpers/Validations';

import useSalesHook from 'services/course/pages/SalesPage/hooks/useSalesHook';
import SessionSignUpComponent from 'services/course/pages/SessionPage/component/SessionSignUpComponent';
import './style.css'; 

const SalesPage = ({ 
    operatorBusinessName,
    operator,    
    loginUser,
    course, 
    courseId, 
    addToSalesCart, 
    currentUser, 
    users,
    children }) => {
    let salesConfig =  {
        currentUser, 
        courseId,
        users,
        operatorBusinessName,
    };

    let {
        tutor,
        sessionType,
        addToCartAndReturnToCourses,
        setTotalNumberOfSessions,
        setAutoRenewal
    } = useSalesHook( salesConfig );


return (
        <div className={"Sales"}>
            <header></header>
            <div className={"content"}> 
                <div className={""}>
                <div className="cart-item">
                    <h1> NEW SESSION </h1>  <div> <br></br>   <h3> {course && course?.name }</h3> </div>  
                    <div>by</div> 
                    <img src={tutor?.avatarUrl} className={"avatar-img-preview"} alt="user profile"/>
                    <div> { course && tutor?.firstname } </div>
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