import 
React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import { 
getOperatorFromOperatorBusinessName } from 'Services/course/Selectors';

import { 
forceReload } from 'Services/course/helpers/ServerHelper';

import LoginLogout from '../LoginPage/Components/LoginLogout';
import Cart from '../SalesPage/Cart';
import UserBioEditor from './Component/UserBioEditor';
import ImageComponent from '../Components/ImageComponent';
import './style.css';

const BioPage = ({ 
  user, 
  users, 
  userId, 
  operatorBusinessName, 
  operator }) => {
  const [ editing, setEditing ] = useState( false );

  // if ( ! user?.userIsValidated || ! operator ){
  //     navigate(`/${operatorBusinessName}/login`);
  // }

  if ( user === null  || user === undefined ){
    navigate(`/${operatorBusinessName}/login`);
  }

  const toggleEditing = () => {
    if ( editing ) {
        setEditing( false );
        forceReload();
      } else {
        setEditing( true );
    };
  };

  let tutor = Object.values(users)?.find(user => user?._id === userId);
  const fileUploadUrl = 'http://localhost:9005/api/v1/fileUploads/avatar';

  return  (
          <div> 
              <div className="MyCourses">
                      <header> 
                          <h1>  {`Welcome ${user?.firstname}! `} </h1>
                          <div>  
                          <LoginLogout
                              operatorBusinessName={operatorBusinessName}
                              user={user} 
                          />
                          <Cart />
                          </div>
                        </header>
                      <br></br>
                      { (user?.role === "Tutor" && 
                          tutor?.firstname === user?.firstname) && 
                            <button className="view-bio-btn" onClick={toggleEditing}>
                              {editing ? 'Preview' : 'Edit'}
                            </button> }  
                      <div className="row">
                        <div className="col">
                        <h1>  {`${tutor?.firstname} `} </h1>           
                            <ImageComponent
                                user={tutor}
                                url={fileUploadUrl} 
                                editMode={editing}
                                typeOfUpload={'useravatarbiourl'}
                                imageSrc={tutor?.avatarUrl}
                                teachObjectName={"users"}
                            />
                        </div> 
                      </div>                          
                    
                      <div className="content">                                                     
                          <div className="sidebar" />
                          <div className={"bio-editor"}>
                            <UserBioEditor user={tutor}/>
                          </div>                                                                               
                        </div> 
                      <br></br>    
              </div>  
            </div>
      );
};

const mapState = (state, ownProps)   => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    previewMode: state.app.previewMode,
    users: state.users.users,
    user:state.users.user
  };
};

export default connect( mapState )(BioPage);
