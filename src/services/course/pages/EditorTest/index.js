import { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import { 
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import { 
forceReload } from 'services/course/helpers/ServerHelper';

import PageEditor from 'services/course/pages/components/EditorComponent/PageEditor';

import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import Cart from 'services/course/pages/SalesPage/Cart';
import UserBioEditor from 'services/course/pages/BioPage/component/UserBioEditor';
import ImageComponent from 'services/course/pages/components/ImageComponent';
//import './style.css';
    
export const upload_url = "/api/v1/fileUploads", editor_upload_url = '/api/v1/fileUploads/editor';


const onChangeHandler = e => {
  //alert(JSON.stringify(e.target.files[0].name));
}


const fileUploadProvider = () => {
  return (<input type="file" name="file" class="form-control" onChange={onChangeHandler}></input> 
//     <div className="files-file-Container">
//     {/* <div class="container">  */}
//     <div class="row"> 
//     <div class="col-md-6">
//     <form method="POST" action={upload_url} id="#" enctype="multipart/form-data" target="hiddenFrame">
//     <button type="submit" class="button uploadBtn" value="upload" />    
//         <div class="form-group files"> 
//         <label> Upload file(s). </label>
//         <input type="file" name="file" class="form-control" onChange={onChangeHandler}></input> 
//         </div> 
//     </form>  
//     </div>
//     </div>
//     {/* </div> */}
// </div>
  )
}
    const EditorTest = ({ 
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
                            { fileUploadProvider() }
                            <LoginLogout
                                operatorBusinessName={operatorBusinessName}
                                user={user} 
                            />
                      
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
                        <div className="row">
                            <div className="col">
                            <PageEditor 
                             id={""} 
                             width={""}
                             height={""}
                             name={""}
                             content={""}
                             className={"editor-main"}
                             handleChange={()=>{}}
                             setOnClickEvent={()=>{}}
                            />
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
    
    export default connect( mapState )(EditorTest);
    