import { 
  useState } from 'react';
  
  import { 
  connect } from 'react-redux';
  
  import { 
  navigate } from '@reach/router';
  
  import { 
  getOperatorFromOperatorBusinessName } from 'teach/src/services/course/selectors';
  
  import { 
  forceReload } from 'teach/src/services/course/helpers/ServerHelper';
  
  import LoginLogout from 'teach/src/services/course/pages/LoginPage/components/LoginLogout';
  import Cart from 'teach/src/services/course/pages/SalesPage/Cart';
  import UserBioEditor from 'teach/src/services/course/pages/BioPage/component/UserBioEditor';
  import ImageComponent from 'teach/src/services/course/pages/components/ImageComponent';
  import './style.css';
  
  const BioPage = ({ 
    user, 
    users, 
    userId, 
    operatorBusinessName, 
    operator }) => {
    const [ editing, setEditing ] = useState( false );
  
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
  
  const fileUploadUrl = '/api/v1/fileUploads/avatar';
  
  return  (
          <div> 
              <div className="MyBios">
                      <header data-cy="header"> 
                          <h1 data-cy="h1">  {`Welcome ${(user?.firstname)}!`} </h1>
                          <div>  
                          <LoginLogout
                              operatorBusinessName={operatorBusinessName}
                              user={user} 
                          />
                          <Cart />
                          </div>
                      </header>
                      <br></br>
                      { (user?.role === "Tutor" && tutor?.firstname === user?.firstname) && 
                          <button className="view-bio-btn" onClick={toggleEditing}>
                            {editing ? 'Preview' : 'Edit'}
                          </button> }  
                      <div className="row">
                        <div className="col">
                        <h1 className="editorName">  {`${tutor?.firstname} `} </h1>           
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
  