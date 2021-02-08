import React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import {  
getOperatorFromOperatorBusinessName } from '../../Selectors';


import { 
forceReload } from '../../../../helpers/serverHelper';


import LoginLogout from '../Login/LoginLogout'
import Cart from '../Sales/Cart/Cart';
import UserBioEditor from './UserBioEditor';
import ImageComponent from '../Components/ImageComponent';

import './MyCourses.css';



const IndividualUsersBio = ({ user, users, userId, operatorBusinessName, operator }) => {

  const [ editing, setEditing ] = useState( false );


  if ( ! user?.userIsValidated || ! operator ){

      navigate(`/${operatorBusinessName}/login`);
  }



  const toggleEditing = () => {

       if ( editing ) {

         setEditing( false );

         forceReload();

       } else {

         setEditing( true );

       }

  }


  let tutor = Object.values(users)?.find(user => user?._id === userId);

  const fileUploadUrl = 'http://localhost:9005/api/v1/fileUploads/avatar';

  return  (

               <div> 
                        <div className="MyCourses">

                                <header> 
                                    <h1>  {`Welcome ${user?.firstname}! `} </h1>

                                    {/* <h2> You are viewing {tutor?.firstname}'s Bio. </h2> */}

                                        <div>  

                                        <LoginLogout
                                              operatorBusinessName
                                              user 
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
                                              typeOfUpload={'useravatarbiourl'}
                                              imageSrc={tutor?.avatarUrl}
                                              teachObjectName={"users"}
                                        />

                                </div> 

                                                <div className="content"> 
                                                      
                                                <div className="sidebar" />

                                                   <div className={"bio-editor"}>
                                                   <UserBioEditor user={user}/>
                                                   </div> 
                                                     
                                                   

                                                </div> 
                                       
                                    <br></br>
                                 
                       </div>
                        
                    </div>
          
                );
            }



const mapState = (state, ownProps)   => {
  return {
         operator: getOperatorFromOperatorBusinessName(state, ownProps),
         previewMode: state.app.previewMode,
         users: state.users.users,
         user:state.users.user
  };
}


export default connect( mapState )(IndividualUsersBio);
