import { 
connect } from 'react-redux';

import { 
getCoursesByCourseIdSelector  } from 'services/course/selectors';

import useSalesHook from 'services/course/pages/SalesPage/hooks/useSalesHook';

const UpdateCart = ({ course }) => {  
    let {
        removeFromCart,
        returnToCourseListPage,
    } = useSalesHook({ course });

return ( <div> 
            <div> {`are you sure you want to remove ${course?.name} from your cart?`} </div> 
                <div> 
                    <button onClick={removeFromCart}>Yes</button>
                    <button onClick={returnToCourseListPage}>No</button>
                </div>
            </div> 
        );
};

const mapState = (state, props)  => ({
    currentUser : state.users.user,
    course: getCoursesByCourseIdSelector(state, props),
});

export default connect(mapState, null)( UpdateCart );