import {
updateUser } from 'Services/course/Api';

import { 
LAST_LOGGEDIN_USER } from 'Services/course/Actions/Users';

export const addNewClassRoomIdToStudentsAndTutors = ( classRoom, store ) => {
    classRoom?.classRoomUsers.forEach(classroomuser => {
        let student = classroomuser?.value;

        updateUser( { ...student, classRooms: [ ...student?.classRooms, classRoom?.classroom?._id  ] });
    });

    let tutor = { ...classRoom.user, classRooms: [ ...classRoom.user.classRooms, classRoom?.classroom?._id ]};

    updateUser( tutor );
    store?.dispatch({ type: LAST_LOGGEDIN_USER, payload: tutor }); 
}; 



