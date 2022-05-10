import {
useEffect } from 'react';

import { 
Redirect } from '@reach/router';

export const useUserVerificationHook = ( user, operatorBusinessName ) => {

    useEffect(() => {
          
        if ( !user || !user?.userIsValidated  ) {
            return <Redirect to={`${operatorBusinessName}/login`} noThrow/>
        }

    }, [ user, operatorBusinessName ]);
};

