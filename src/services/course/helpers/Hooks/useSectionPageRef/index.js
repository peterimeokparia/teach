import { useEffect } from 'react';

const useSectionPageRef = ( condition, inputRef ) => {
    useEffect(() => {  
        if ( inputRef?.current && condition ) {
            inputRef?.current?.focus();
        }
    }, [ ( inputRef?.current && condition ) ]);

    function setPageSectionRef( condition, sectionRef){
        return <input ref={ condition ? sectionRef : null } style={{ opacity: 0.01 }} disabled={ condition ? false : true } />
    }

    return {
        setPageSectionRef
    }
};

export default useSectionPageRef;

    