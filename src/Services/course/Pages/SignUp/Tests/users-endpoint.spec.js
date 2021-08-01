import {
get, 
add,
update,
getById, 
signUp} from 'services/course/api';

import {
role } from 'services/course/helpers/PageHelpers';

const PREFIX = "http://localhost:3000/api/v1";

jest.mock('../../../api');

let user = {
    firstname:"JabraTutorNewSignupENDPOINT",
    email:"JabraTutorNewSignupENDPOINT@gmail.com",
    role: role.Tutor,
    password:"jabraTutorTestPassword"
};

let userToUpdate = {
    firstname:"JabraTutorEndPoint",
    email:"JabraTutorEndPointp@gmail.com",
    role: role.Tutor,
    password:"jabraTutorTestPassword",
    _id: "5fab4846c2a96278c56381c7"
};

describe('USER ENDPOINTS', () => {
    it('Adds A New User.', async () => {
        const res = await signUp(user, '/users/register'); 
        expect(res?.firstname).toEqual( user?.firstname );
        expect(res?.email).toEqual( user?.email );
    });

    it('Gets All Users.', async () => {
        const res = await get('/users/register', PREFIX );
        expect(res[res.length - 1 ]?.firstname).toEqual( user?.firstname );
        expect(res.length).toEqual( 3 );
    });

    it('Updates The Selected User.', async () => {
        const res = await update(userToUpdate, '/users/', PREFIX);
        expect(res.data['/users/'][res.data['/users/'].length - 1 ]?.firstname).toEqual( userToUpdate?.firstname );
        expect(res.data['/users/']?.find( _user => _user?._id === userToUpdate?._id).firstname).toEqual( userToUpdate?.firstname );
        expect(res.data['/users/'].length).toEqual( 2 );
    });
});