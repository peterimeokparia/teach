import 
React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
saveUser, 
loadUsers } from 'Services/course/Actions/Users';

import { 
resetClassRoomUserError,
unSubscribe,
deleteClassRoom } from 'Services/course/Actions/ClassRooms';

import { 
newSiteUser, 
role } from 'Services/course/helpers/PageHelpers';

import ToggleUsersRadioButtons from 'Services/course/Pages/NewClassRoomUserPage/Components/ToggleUsersRadioButtons';
import ResetForm from 'Services/course/Pages/NewClassRoomUserPage/Components/ResetForm';
import NewUser from 'Services/course/Pages/NewClassRoomUserPage/Components/NewUser';
import DropDown from 'Services/course/Pages/Components/DropDown';
import './style.css';

const NewClassRoomUserPage = ({
operator,
currentUser,
users,
selectedUsersFirstName,
classRoomUsers,
selectedUser,
classRoomGroupId,
resetClassRoomUserError, 
saveInProgress,
dispatch,
loadUsers, 
saveUser, 
unSubscribe,
error,
className,
onSubmit,
children }) => {

let emailInitialValue = selectedUser ? selectedUser?.email : ''; 
let firstNameInitialValue = selectedUser ? selectedUser?.firstname : ''; 
let lastNameInitialValue = selectedUser ? selectedUser?.lastName : ''; 
let roleInitialValue = selectedUser ? selectedUser?.userrole : ''; 

const [ editing, setEditing ] = useState(false);
const [ email, setEmail ] = useState(emailInitialValue);
const [ firstName, setFirstName ] = useState(firstNameInitialValue);
const [ userrole, setRole ] = useState(roleInitialValue);
const [ option, setOption ] = useState('');
const inputRef = useRef();

const roles = {
    Tutor: "Tutor",
    Student: "Student" 
}

const reset = () => {
    loadUsers();
    setEmail(emailInitialValue);
    setFirstName(firstNameInitialValue);
    setRole(roleInitialValue);
    setEditing(false);
    resetClassRoomUserError();
}

const commitEdit = (e) => {
    e.preventDefault();
    newSiteUser.email = email;
    newSiteUser.firstname = firstName;
    newSiteUser.userrole = userrole; 
    newSiteUser.classRooms.push( classRoomGroupId );
    newSiteUser.operatorId = operator?._id;

    onSubmit(newSiteUser)
     .then(reset)
      .catch( error => {
        setEditing(false);
        setEditing(true);
    });
};

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
}

const addExistingUser = ( selectedUserId ) => {    
  let selectedUser = users?.find(usr => usr?._id === selectedUserId );
  selectedUser.classRooms.push( classRoomGroupId );
  saveUser(selectedUser)
  .then(reset)
  .catch(error => { console.log( error )})
}

const setInitialValuesForInputFields = () => {
    setEmail(emailInitialValue);
    setFirstName(firstNameInitialValue);
    setRole(roleInitialValue);
    setEditing(false);
}

const beginEditing = () => {
    setInitialValuesForInputFields();
    setEditing(true);
}

const performDelete = (  ) => {
    if ( currentUser?.userrole === "Tutor" ) {
        deleteClassRoom(selectedUser);
        unSubscribe( selectedUser, classRoomGroupId );
    } 
}

const unSubscribeCurrentUser = () => {
    unSubscribe( selectedUser, classRoomGroupId )
    .then(reset)
    .catch(error => { console.log( error )})  
}
 
useEffect (() => {
    if ( editing ) {
        inputRef.current.focus();
    }
}, [ editing ]); 

if ( saveInProgress ){
    return <div> Save in progress, please wait. </div>
}

let userDropDownCollection = [{firstname: 'SELECT'} , ...users?.filter(user => user.role === role.Tutor) ]

return editing ? (
    <>          
      {          
           <ToggleUsersRadioButtons
                inputRef={inputRef}
                setOption={setOption}
           />          
      } 
      {
         ( option === "Existing" )  ? 
                 <div><DropDown
                            label={""}
                            key={"_id"}
                            value={"firstname"}
                            optionCollection={userDropDownCollection}
                            setOptionSelectedValue={selectedUser => addExistingUser(selectedUser)} 
                        />     
                        <ResetForm
                            inputRef={inputRef}
                            cancelEdit={cancelEdit}
                            className={className}
                            error={error} 
                        />        
                    </div>
                :    <div> 
                       <NewUser
                            className={className}
                            error={error}
                            inputRef={inputRef}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            email={email}
                            setEmail={setEmail}
                            setRole={setRole}
                            saveInProgress={saveInProgress}
                            commitEdit={commitEdit} 
                       />   
                       <ResetForm
                            inputRef={inputRef}
                            cancelEdit={cancelEdit}
                            className={className}
                            error={error} 
                        />        
                </div> 
         }  
         
        { error && <div>{error.message}</div> }
    </>
            ) : ( 
            children(beginEditing, performDelete, unSubscribeCurrentUser)
        );         
                
};

const mapState = ( state, ownProps ) => {
    return {
        currentUser: state.users.user,
        classRoomUsers: Object.values(state.users.users)?.filter(item => item.classRoom?.includes( ownProps?.classRoomGroupId )),
        saveInProgress: state.classrooms.saveLessonInProgress,
        error: state.classrooms.onSaveError
    }
}

export default connect(mapState, { resetError: resetClassRoomUserError, resetClassRoomUserError, deleteClassRoom, unSubscribe, saveUser, loadUsers} )(NewClassRoomUserPage);