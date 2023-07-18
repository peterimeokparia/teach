import { useEffect } from 'react';
import { Redirect } from '@reach/router';

export const useUserVerificationHook = ( user, operatorBusinessName ) => {
    useEffect(() => { 
        return () => {
            if ( !user || !user?.userIsValidated  ) {
                return <Redirect to={`${operatorBusinessName}/login`} noThrow/>;
            }
        };
    }, []);
};

