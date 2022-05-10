import { 
useState,
useEffect }from 'react';

import { 
deleteFileByFileName } from 'services/course/api';

function useFormFileUploadHook( props ){

    let {
        saveFormField,
        fileUploadUrl,
        formFieldElement
    } = props;

    let formFieldElementShallowCopy = { ...formFieldElement };

    const [ fileToRemove, setFileToRemove ] = useState( undefined );
    
    useEffect(() => {

        if ( fileToRemove ) {
            
            formFieldElementShallowCopy = {...formFieldElementShallowCopy, files: formFieldElement?.files?.filter( files => files !== fileToRemove ) };

            saveFormField( formFieldElementShallowCopy );

            deleteFileByFileName( fileToRemove?.split('/files/')[1]);    
            
            saveFormField( undefined );
        }

    }, [ fileToRemove  ])

    function selectedFileToRemove(file){

        setFileToRemove( file );
    }

    return {
        selectedFileToRemove,
        fileUploadUrl
    }
}

export default useFormFileUploadHook;