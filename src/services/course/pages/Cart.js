import React from 'react';
import { connect } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { buyCourse } from '../actions';
import Modal from 'react-modal';
import ReactModal from 'react-modal-resizable-draggable';
import './Cart.css';

//https://www.npmjs.com/package/react-modal-resizable-draggable
const Cart = ({ currentUser, buyCourse }) => {

  const buyOrLogin = () => {
       
    if ( currentUser ) {

          buyCourse(currentUser);

    } else {
     
           navigate('/login');

    }
}

    return (    <span> 
                    {/* <h1> Buy { currentUser?.course  && currentUser?.course?.name }</h1> */}
                    <ReactModal initWidth={400} initHeight={300}top left className="test-modal" isOpen={currentUser?.cart?.length > 0} onRequestClose={currentUser?.cart?.length === 0}>  
                    

                            <h3>My Cart</h3>

                            <div className="body">
                                <p></p>
                                {
                                        currentUser?.cart?.length > 0 &&  <ul>
                                        {             
                                          (
                                            currentUser?.cart?.map(course => (
                                            
                                              <li key={course?.id}>
                
                                                    <span>{course?.name}</span>
                
                                                    <span>{course?.price}</span>
                
                                                    <span> <Link to={`/updatecart/${course?.id}`}>X</Link> </span>
                
                                              </li>
                
                                              )
                                            )
                
                                          )
                
                                        }

                                    <span>
                              
                                              {
                      
                                                  `Total: ${ currentUser?.cartTotal === undefined ? 0 : currentUser?.cartTotal }` 
                                              } 
                                          
                                          
                                         </span>
                                      </ul> 
                                         
                          
                                }
                                             <div>
                                             <button onClick={buyOrLogin}>buy</button>
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

