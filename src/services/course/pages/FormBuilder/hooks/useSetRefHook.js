import { useRef, useEffect } from 'react';
    
const useSetRefHook = ( previewMode ) => {
    const fieldRef = useRef( null );

    useEffect(() => {
        fieldRef?.current?.focus();
    }, [ previewMode  ]);

    return{
        fieldRef
    };
};

export default  useSetRefHook;