import 
React, { 
useState, 
useEffect, 
useRef } from 'react';

import { 
connect } from 'react-redux';

import { 
addNewClassRoom } from 'Services/course/Actions/ClassRooms';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getClassRoomGroupsByOperatorId } from 'Services/course/Selectors';

import Select from 'react-select';

import { 
role } from 'Services/course/helpers/PageHelpers';

const NewClassRoomGroup = ({
operatorBusinessName,
operator,
saveInProgress,
onSaveError,
user,
users,
dispatch }) => {

const [ classRoomName, setClassRoomName ] = useState('');
const [ classRoomDescription, setClassRoomDescription ] = useState('');
const [ classRoomUsers, setClassRoomUsers ] = useState([]);
const inputRef = useRef();
let currentUser = user;

useEffect (() => {
    inputRef.current.focus();
}, []); 


const handleSubmit = e => { 
    e.preventDefault(); 
    dispatch(addNewClassRoom(classRoomName, classRoomDescription, classRoomUsers, currentUser, operator));
};


if ( saveInProgress ) {
    return <div>...loading</div>
} 

if ( onSaveError ) {
    return <div> { onSaveError.message } </div> ;
}

const options = users?.filter(user => user.role === role.Tutor ).map(item => ( { value: item,  label: item?.firstname } )  );

return (
        <div className="NewCourse">
        <h1>{`Create new group.`}</h1> 
        <br></br>
        <form onSubmit={handleSubmit}> 
            <label>
                Enter group name:
                <input
                   ref={inputRef} 
                   disabled={saveInProgress} 
                   value={classRoomName} 
                   onChange={(e) => setClassRoomName(e.target.value)}
                />
             </label>
            <label>
                   Enter group description:  
                <input
                   disabled={saveInProgress} 
                   value={classRoomDescription} 
                   onChange={(e) => setClassRoomDescription(e.target.value)}
                />         
            </label>
            { onSaveError && (
                <div className="saveError-message">
                    Error: { onSaveError.message }
                </div>
            )}
           <label>
               Add users to group
                <Select
                    isMulti
                    value={classRoomUsers}
                    onChange={setClassRoomUsers}
                    options={options} 
                />
           </label>
            <button type="submit" disabled={saveInProgress} >Create ClassRoom Group</button>
        </form>
    </div>
    );
};

const mapState = (state, ownProps) => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    classrooms: getClassRoomGroupsByOperatorId(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    saveInProgress: state.courses.saveInProgress,
    onSaveError: state.courses.onSaveError,
});

export default connect(mapState)(NewClassRoomGroup);