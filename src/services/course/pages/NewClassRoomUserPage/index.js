import { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
saveUser, 
loadUsers } from 'services/course/actions/users';

import { 
resetClassRoomUserError,
unSubscribe,
deleteClassRoom } from 'services/course/actions/classrooms';

import { 
newSiteUser, 
role } from 'services/course/helpers/PageHelpers';

import ToggleUsersRadioButtons from 'services/course/pages/NewClassRoomUserPage/components/ToggleUsersRadioButtons';
import ResetForm from 'services/course/pages/NewClassRoomUserPage/components/NewUser/ResetForm';
import NewUser from 'services/course/pages/NewClassRoomUserPage/components/NewUser';
import DropDown from 'services/course/pages/components/DropDown';

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
  .catch(error => { throw Error(`  ${error}`)})
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
    .catch(error => {  throw Error(`  ${error}`);})  
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
                 <div> <DropDown
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
                    <form
                        className= {`${className || ''} editing ${error ? 'error' : ''}`}
                        onSubmit={commitEdit}           
                    >
                        <label>
                            <b> Email </b>
                        <input 
                            ref={ inputRef }
                            value={ email }
                            type="email"
                            onChange={ e => setEmail( e.target.value) }
                            disabled={saveInProgress}
                        />
                        </label>
                        <label>
                        <b>First Name </b>
                        <input 
                            ref={ inputRef }
                            value={ firstName }
                            type="text"
                            onChange={ e => setFirstName( e.target.value) }
                            disabled={saveInProgress}
                        />
                        </label>
                        <span className="LoginPageRadioButton">
                        <span className="left">
                        <label> 
                        Tutor
                        <input
                            ref={ inputRef }
                            name="userrole"
                            type="radio"
                            value={'Tutor'}
                            onChange={ e => setRole( e.target.value ) }
                            placeholder="userrole"
                        >
                        </input>
                        </label>
                        </span>
                        <span className="right">
                        <label>
                            Student
                            <input
                            ref={ inputRef }
                                name="userrole"
                                type="radio"
                                value={'Student'}
                                onChange={ e => setRole( e.target.value ) }
                                placeholder="userrole"
                            >
                            </input> 
                            </label>  
                        </span>
                        </span> 
                        <input
                            ref={ inputRef }
                            name="submit"
                            type="submit"
                            value={'Submit'}
                            onChange={ commitEdit }
                            >
                        </input> 
                        </form>    
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