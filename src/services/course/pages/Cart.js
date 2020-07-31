import React from 'react';
import { connect } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { buyCourse } from '../actions';


const Cart = ({ currentUser, buyCourse }) => {


  const buyOrLogin = () => {
       
    if ( currentUser ) {

          buyCourse(currentUser);

    }else {
     
           navigate('/login');

    }
}

    return (    <div> 
                    {/* <h1> Buy { currentUser?.course  && currentUser?.course?.name }</h1> */}
              <ul>
              {
                
               currentUser?.cart?.map(course => (
                   
                    <li key={course?.id}>

                          <span>{course?.name}</span>

                          <span>{course?.price}</span>

                          <span> <Link to={`/updatecart/${course?.id}`}>X</Link> </span>

                    </li>

                    )
                  )
              }
                  </ul>
                  <div>
                   {

                     `Total: ${ currentUser?.cartTotal === undefined ? 0 : currentUser?.cartTotal }` 
                   }

                    <button onClick={buyOrLogin}>buy</button>
                   </div>
                </div> 
              );
}



const mapState = (state)  => ({
  currentUser : state.users.user,
})


export default connect(mapState, {buyCourse})( Cart );

