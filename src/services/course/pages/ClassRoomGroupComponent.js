import 
React, { 
useEffect, 
useRef, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
saveClassRoom, 
deleteClassRoom, 
unSubscribe, 
loadClassRooms} from '../actions';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId } from '../Selectors';

import Loading from './Loading';

import NavLinks from './NavLinks';

import Swal from 'sweetalert2';

import './CoursesComponent.css';

import { 
forceReload } from '../../../helpers/serverHelper';



const ClassRoomGroupComponent = ({
operatorBusinessName,
operator,    
user,
users,
classrooms, 
classRoomsLoading,
onClassRoomError,
saveClassRoom,
deleteClassRoom,
unSubscribe}) => {

const inputRef = useRef();
const [ editing, setEditing ] = useState(false);
const [ name, setNewName ] = useState('');
const [ currentName, setCurrentName ] = useState('')
const [ description, setNewDescription ] = useState('');
const [ currentDescription, setCurrentDescription ] = useState('')
const [ currentClassRoom, setCurrentClassRoom ] = useState({});
const [ deleting, setDelete ] = useState(false);


useEffect(() => {

    loadClassRooms();

    if ( editing ) {
        inputRef.current.focus();
    }

    setDelete(false);

}, [ loadClassRooms, editing, classrooms ]);




if ( classRoomsLoading ) {

    return <Loading />
}         


if ( onClassRoomError ) {

    return <div> { onClassRoomError.message } </div> 

}  


const beginEditing = ( classroom ) => {
    setCurrentClassRoom(classroom);
    setCurrentName(classroom?.name);
    setCurrentDescription(classroom?.description);
    setEditing(true);
}



const submitForm = (e) => {
    e.preventDefault();
    saveClassRoom({
        ...currentClassRoom, 
        name: (name === "") ? currentName : name, 
        description: (description === "") ? currentDescription : description 
    })
    .then(reset)
    .catch( error => {
        setEditing(false);
        setEditing(true);
    });
} 


const reset = () => {
    setEditing(false);
    forceReload();
    // resetError();
}




const performDelete = ( classroom  ) => {

    let classRoomUsers = users?.filter(user => user?.classRooms?.includes(classroom?._id) && user?.role === "Student");

    performClassRoomValidation( 'Delete ?', 'warning', "You are about to delete:", classroom )
        .then( (response) => {

            if ( response?.value ) {

                if ( user?.role === "Tutor" ) {

                    deleteClassRoom(classroom);

                    classRoomUsers.forEach(user => {

                        unSubscribe( user, classroom?._id );

                    });

                } 

                setDelete(true);
            
                return;

            } else {
    
                return;

            }
        });
}




function performClassRoomValidation( title, icon, htmlTitle, classroom ) {

    return Swal.fire({
        title,
        icon,
        html:   '<div>'+ htmlTitle + `${classroom?.name}` +'</div>',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#673ab7',
        cancelButtonText: 'No'
        });
}




return  editing ? (<div>
        
                    <form
                    onSubmit={submitForm}
                    >
                        <input
                        name="name"
                        ref={inputRef}
                        value={name}
                        onChange={e => setNewName(e.target.value)}
                        placeholder={currentName}
                        >
                        </input> 
                    </form>

                    <form
                    onSubmit={submitForm}
                    >       
                        <input
                        name="description"
                        value={description}
                        onChange={e => setNewDescription(e.target.value)}
                        placeholder={currentDescription}
                        >
                        </input> 

                    </form>


                </div> ) : (
            <div className="ComponentCourseList">
                <ul>
                { classrooms?.map( classroom => ( 
                    <li 
                        key={classroom?._id}
                        className={"component-seconday-list-body"}
                    >

                        <div className={"user-list-items"}>

                        <NavLinks to={`/${operatorBusinessName}/classroomgroups/${classroom?._id}/${classroom?.name}`}>
                            <span> {classroom?.name}</span>
                        </NavLinks>

                            <div className="price"> { classroom?.description }   </div> 
                                {  
                                    <div>
                                        {user?._id ===  classroom?.createdBy && (
                                            <span>
                                                <button
                                                    className="edit-lesson-btn"  // rename
                                                    onClick={() => beginEditing(classroom)}> 
                                                    
                                                    Edit 
                                                    
                                                </button>

                                                <button
                                                    className="delete-lesson-btn"
                                                    onClick={() => performDelete(classroom)}> 
                                                    
                                                    Delete 
                                                    
                                                </button>
                                            </span>
                                        )
                                        }  
                                    </div>
                            
                                }
                            
                        </div>
                        
                    </li>
                    ))}
                </ul>
        </div>
        
)}



const mapState = (state, ownProps) => ({
    user: state?.users?.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    classroomsLoading: state.classrooms.classroomsLoading,
    onClassRoomError: state.classrooms.onClassRoomError,
    sessions: Object.values(state.sessions.sessions)
})

export default connect(mapState, { saveClassRoom, deleteClassRoom, loadClassRooms, unSubscribe })(ClassRoomGroupComponent);