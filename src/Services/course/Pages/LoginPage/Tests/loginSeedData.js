
import {
jabraTutorTestPassword,
testToken } from './token.js';

import {
role } from 'teach/src/services/course/helpers/PageHelpers';

import SiteUser from 'teach/src/services/course/helpers/SiteUser';

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
    },
    {
        //...newSiteUser,
        firstname:"UserToDelete",
        email:"UserToDelete@gmail.com",
        role: role.Tutor,
        password:"UserToDelete@gmail.com",
        token: testToken,
        loginCount: 1, 
        userIsValidated: true,
        userIsVerified: true,
        operatorId: "OPSfab4846c2a96278c56381c9",
        unHarshedPassword = jabraTutorTestPassword,
        _id: "DELETE5fab4846c2a96278c56381c9"
    }
];