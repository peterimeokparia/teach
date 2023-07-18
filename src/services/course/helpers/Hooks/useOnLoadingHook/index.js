import { useEffect } from 'react';
import Loading from 'services/course/pages/components/Loading';

export const useOnLoadingHook = (onLoading, onError ) => {
    useEffect(() => {
        return () => {
            if ( onLoading  ) {
                return <Loading />;
            }
            if ( onError ) {
                return <div>{ onError?.message }</div>;
            }
        };
    }, [ onLoading, onError ]);
};



    
    