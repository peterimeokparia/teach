import React from 'react';

import { 
connect } from 'react-redux';

import { 
Link, 
navigate } from '@reach/router';

import { 
buyCourse } from 'Services/course/Actions/Users';

import ReactModal from 'react-modal-resizable-draggable';

import './style.css';

const Cart = ({ currentUser, buyCourse }) => {
  const buyOrLogin = () => {
       
    if ( currentUser ) {
        buyCourse(currentUser);
        return;
    } else {
        navigate('/login');
    }
}
return (<span> 
              <ReactModal initWidth={400} initHeight={300}top left className="cart" isOpen={currentUser?.cart?.length > 0} onRequestClose={currentUser?.cart?.length === 0}>  
                  <h3>New Sessions</h3>
                      <div className="body">
                          <p></p>
                          {currentUser?.cart?.length > 0 &&  <ul>
                          {(currentUser?.cart?.map(course => (
                                <li key={course?.course?._id}>
                                  <span className="list-items">
                                    <span className="">{course?.course?.name}</span>
                                    <span className="price">{course?.course?.price}</span>
                                    <span className="">{course?.numberOfSessions}</span>
                                    <span> <Link to={`/updatecart/${course?.course?._id}`}>remove</Link> </span>
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
            </ReactModal>
          </span> 
              );
}

const mapState = (state)  => ({
  currentUser : state.users.user,
})

export default connect(mapState, {buyCourse})( Cart );

