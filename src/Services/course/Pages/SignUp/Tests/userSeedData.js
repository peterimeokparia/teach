
import {
jabraTutorTestPassword,
testToken } from 'Services/course/Api/__mocks__/token.js';

import {
role } from 'Services/course/helpers/PageHelpers';

import SiteUser from 'Services/course/helpers/SiteUser';

let newSiteUser = new SiteUser();

export let userSeedData = [
    {
        ...newSiteUser,
        firstname:"JabraTutor",
        email:"JabraTutor@gmail.com",
        role: role.Tutor,
        password:jabraTutorTestPassword,
        token: testToken,
        _id: "5fab4846c2a96278c56381c9"
    },
    {
        ...newSiteUser,
        firstname:"JabraTutorUpdateMe",
        email:"JabraTutorUpdateMe@gmail.com",
        role: role.Tutor,
        password:jabraTutorTestPassword,
        token: testToken,
        _id: "5fab4846c2a96278c56381c7"
    },
];