import { 
navigate } from '@reach/router';

import {
v4 as uuidv4 } from 'uuid';

import {
formTypes } from 'services/course/pages/FormBuilder/helpers';

    const generateUuid = () => {
        const uuid = uuidv4();
        return uuid;
    };

export const forms = ( lesson, typeOfForm, formProps ) => {

    let {
        operatorBusinessName,
        currentUser,
    } = formProps;

    let uuid = generateUuid(),
        userId = currentUser?._id, 
        formUuId = uuid, 
        formId = lesson?._id, 
        formName = "", 
        formType = "";

    switch ( typeOfForm ) {

        case formTypes.quizzwithpoints:   
        formName = `${lesson?.title}-quizz_${uuid}`;
        formType = formTypes?.quizzwithpoints;
        navigate(`/${operatorBusinessName}/${formType}/${formName}/${formId}/${formUuId}/${userId}`);
            break;

        case formTypes.homework: 
        formName = `${lesson?.title}-${formTypes?.homework}_${uuid}`; 
        formType = formTypes?.homework; 
        navigate(`/${operatorBusinessName}/${formType}/${formName}/${formId}/${formUuId}/${userId}`);
            break;

        default:
            break;
    };
};