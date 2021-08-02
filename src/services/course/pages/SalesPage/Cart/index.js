import { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
buyCourse } from 'services/course/actions/users';

import { 
Link,
navigate } from '@reach/router';

import Modal from 'react-modal'; 
import './style.css';

const Cart = ({ currentUser, buyCourse }) => {
  const [ toggleModal, setToggleModal ] = useState( currentUser?.cart?.length > 0 );

const closeNewCourseModal = () => {
  setToggleModal( false );
};

const buyOrLogin = () => {
  if ( currentUser ) {
      setToggleModal( false );
      buyCourse(currentUser);
      return;
  } else {
      navigate('/login');
  }
};
  
return (<span className="cart"> 
        <Modal isOpen={  toggleModal } onRequestClose={closeNewCourseModal}> 
            <div className="cartTitle"> <h3>Add New Item </h3>  </div>
              <div className="cart">
                <p></p>
                {currentUser?.cart?.length > 0 &&  <ul>
                {(currentUser?.cart?.map(course => (
                      <li key={course?.course?._id}>
                        <span className="list-items">
                          <span className="">{course?.course?.name}</span>
                          <span className="price">{course?.course?.price}</span>
                          <span className="">{course?.numberOfSessions}</span>
                          <span> <Link to={`/updatecart/${course?.course?._id}`}> remove</Link> </span>
                        </span>
                      </li>
                      ))
                    )}
                    <span>
                      {
                        `Total: ${ currentUser?.cartTotal === undefined ? 0 : currentUser?.cartTotal }` 
                      } 
                    </span>
                    </ul> 
                  }
                  <div>
                      <button onClick={buyOrLogin}>Add</button>
                  </div>
              </div>
          </Modal>
          </span> 
              );
};

const mapState = (state)  => ({
  currentUser : state.users.user,
});

export default connect( mapState, { buyCourse } )( Cart );

