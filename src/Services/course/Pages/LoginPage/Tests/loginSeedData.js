
import {
jabraTutorTestPassword,
testToken } from '../Tests/token.js';

import {
role } from 'Services/course/helpers/PageHelpers';

import SiteUser from 'Services/course/helpers/SiteUser';

let newSiteUser = new SiteUser();
    
export let userSeedData = [
    {
        //...newSiteUser,
        firstname:"JabraTutor",
        email:"JabraTutor@gmail.com",
        role: role.Tutor,
        password:jabraTutorTestPassword,
        token: testToken,
        loginCount: 1, 
        userIsValidated: true,
        userIsVerified: true,
        operatorId: "OPSfab4846c2a96278c56381c9",
        unHarshedPassword = jabraTutorTestPassword,
        _id: "5fab4846c2a96278c56381c9"
    }
];