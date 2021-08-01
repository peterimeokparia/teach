
import {
jabraTutorTestPassword,
testToken } from 'services/course/pages/SignUp/tests/node_modules/services/course/api/__mocks__/token.js.js';

import {
role } from 'services/course/pages/SignUp/tests/node_modules/services/course/helpers/PageHelpers';

import SiteUser from 'services/course/pages/SignUp/tests/node_modules/services/course/helpers/SiteUser';

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