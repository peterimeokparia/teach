import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import { getCoursesByCourseIdSelector  } from '../Selectors';
import { addToSalesCart, loginUser  } from '../actions';
import { Validations } from  '../../../helpers/validations';
// import './SalesPage.css';


const SalesPage = ({ course, courseId, navigate, addToSalesCart, currentUser, loginUser  }) => {


    if ( currentUser?.paymentStatus === "approved" ) {

        navigate('/');
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
    
        return <Redirect to={`/courses/${courseId}`} noThrow/>
   }
   


   const addToCartAndReturnToCourses = () => {

      addCourseToCart(course);
   }
   

   const addCourseToCart = (course) => {
 
       let duplicateItemsExist = ( (currentUser?.cart?.filter(item => item._id === courseId ))?.length > 0 );

       if ( duplicateItemsExist ) {
          
            Validations.warn(`Duplicate. ${course?.name} is already in your cart.`);

            //alert(`Duplicate. ${course?.name} is already in your cart.`); // change from alert to inline div

            navigate('/mycourses');

          return;
        }
      else{

           addToSalesCart( course );

           navigate('/mycourses');

      }

      
   }


    return (<div className="SalesPage">
        
        <h1> ADD TO CART { course  && course.name }</h1>

        <button onClick={addToCartAndReturnToCourses}>ADD TO CART</button>

        {Validations.setErrorMessageContainer()}
      
    </div>)
}


const mapState = (state, props) => ({
     currentUser: state.users.user,
     course: getCoursesByCourseIdSelector(state, props),
//   userOwnsCourse: userOwnsCourse(state, props)

});


export default connect(mapState, { addToSalesCart, loginUser })(SalesPage);