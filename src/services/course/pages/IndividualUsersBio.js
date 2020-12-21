import React, { 
useState, useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
Link, 
navigate } from '@reach/router';

import Loading from './Loading';

import LoginLogout from './LoginLogout'
import Cart from './Cart';
import UserBioEditor from './UserBioEditor';
import MarkDown from 'react-markdown';
import ImageComponent from './ImageComponent';
import './MyCourses.css';

import { 
forceReload } from '../../../helpers/serverHelper';


const IndividualUsersBio = ({ user, users, userId }) => {

  const [ editing, setEditing ] = useState( false );


  const toggleEditing = () => {

       if ( editing ) {

         setEditing( false );

         forceReload();

       } else {

         setEditing( true );

       }

  }


  let tutor = Object.values(users)?.find(user => user?._id === userId);

  const fileUploadUrl = 'http://localhost:9005/fileUploads';

  return  (

               <div> 
                        <div className="MyCourses">

                                <header> 
                                    <h1>  {`Welcome ${user?.firstname}! `} </h1>

                                    {/* <h2> You are viewing {tutor?.firstname}'s Bio. </h2> */}

                                    
                                        <div>  
                                        <LoginLogout
                                            user={user}
                                        /> 

                                        <Cart />
                                        </div>
                                    </header>

                                    <br></br>

                                     { (user?.role === "Tutor") && <button className="view-bio-btn" onClick={toggleEditing}>{editing ? 'Preview' : 'Edit'}</button> }
                            
                                     <h1>  {`${tutor?.firstname} `} </h1>

                                        <div className="bio-image-btn">

                                     
                                        <ImageComponent
                                                  user={tutor}
                                                  url={fileUploadUrl} 
                                                  editMode={editing}
                                                  imageSrc={tutor?.avatarUrl}
                                                  teachObjectName={"users"}
                                        />

                                        </div>
                                       
                               
                                    <br></br>
                                      {
                                          editing ? (    
                                                  <div> 
                                                      {"Enter your bio."} 
                                                      <UserBioEditor user={user}/>
                                                      
                                                  </div> 
                                                  ) : (    
                                                  <div> 
                                                        
                                                      <MarkDown source={tutor?.markDown} />
                                              
                                                  </div> 
                                              )
                                      }

                       </div>
                        
                    </div>
          
    
                );
            }



const mapState = (state, ownProps)   => {
  return {
         previewMode: state.app.previewMode,
         users: state.users.users,
         user:state.users.user
  };
}


export default connect( mapState )(IndividualUsersBio);
