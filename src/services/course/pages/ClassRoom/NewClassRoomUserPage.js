import 
React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
resetClassRoomUserError,
unSubscribe,
saveUser, 
deleteClassRoom,
loadUsers } from '../../actions';

import {
role } from '../../../../helpers/pageHelpers';

import { 
newSiteUser } from '../../../../helpers/pageHelpers'

import DropDownSelectorComponent from '../Components/DropDownSelectorComponent';

import './NewClassRoomUserPage.css';




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
const [ selectedUserTest, setSelectedUser] = useState('');
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
            <span className="LoginPageRadioButton">

            <span className="left">

                <label className="label"> 
                
                Existing User

                <input
                    ref={ inputRef }
                        name="userrole"
                        type="radio"
                        value={'Existing'}
                        onChange={ e => setOption( e.target.value ) }
                        placeholder="userrole"
                >
                </input>

                </label>


                </span>
            

                <span className="right">

                <label className="label"> 

                    New User

                    <input
                    ref={ inputRef }
                        name="userrole"
                        type="radio"
                        value={'New'}
                        onChange={ e => setOption( e.target.value ) }
                        placeholder="userrole"
                    >
                    </input> 

                    </label>  

                </span>

                
            </span> 
            
                     
      } 

      {
         ( option === "Existing" )  ?  <div><DropDownSelectorComponent
                                            label={""}
                                            key={"_id"}
                                            value={"firstname"}
                                            optionCollection={userDropDownCollection}
                                            setOptionSelectedValue={selectedUser => addExistingUser(selectedUser)} 
                                        />     
                                    <form
                                      className= {`${className || ''} editing ${error ? 'error' : ''}`} 
                                   >
                                       
                                    <input
                                        ref={ inputRef }
                                            name="reset"
                                            type="submit"
                                            value={'Reset'}
                                            onChange={ cancelEdit }
                                        >
                                    </input> 

                                   </form>
                                        </div>
                                    : <div> 
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
                                   <form
                                      className= {`${className || ''} editing ${error ? 'error' : ''}`} 
                                   >
                                         <input
                                            ref={ inputRef }
                                                name="reset"
                                                type="submit"
                                                value={'Reset'}
                                                onChange={ cancelEdit }
                                            >
                                        </input> 

                                   </form>
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