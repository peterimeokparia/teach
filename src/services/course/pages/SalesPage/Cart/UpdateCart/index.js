import React from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import { 
removeItemFromCart  } from 'Services/course/Actions/Users';

import { 
getCoursesByCourseIdSelector  } from 'Services/course/Selectors';

const UpdateCart = ({ courseId, course, removeItemFromCart }) => {  

const removeFromCart = () => {
    removeItemFromCart( course );
    navigate('/mycourses');
}

const returnToCourseListPage = () => { 
    navigate('/mycourses');
}

return ( <div> 
            <div> {`are you sure you want to remove ${course.name} from your cart?`} </div> 
                <div> 
                    <button onClick={removeFromCart}>Yes</button>
                    <button onClick={returnToCourseListPage}>No</button>
                </div>
            </div> 
        );
}

const mapState = (state, props)  => ({
    currentUser : state.users.user,
    course: getCoursesByCourseIdSelector(state, props),
})

export default connect(mapState, { removeItemFromCart })( UpdateCart );