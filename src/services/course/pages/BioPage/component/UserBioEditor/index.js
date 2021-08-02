import { 
    connect } from 'react-redux';
    
    import { 
    saveUser } from 'services/course/actions/users';
    
    import { 
    setMarkDown } from 'services/course/helpers/EditorHelpers';
    
    import { 
    SET_USER_BIO_MARKDOWN } from 'services/course/actions/users';
    
    import {
    role } from 'services/course/helpers/PageHelpers';
    
    import EditorComponent  from 'services/course/pages/components/EditorComponent';
    
    const UserBioEditor = ({ 
        user,  
        setMarkDown,
        saveUser }) => {
    function handleChange( editor, element ){
        let duration = 2000;  
        
        setMarkDown(
            element, 
            editor.getHTML(), 
            { propNameOne: "users",  propNameTwo: "users" }, 
            SET_USER_BIO_MARKDOWN, 
            saveUser, 
            duration
        );
    };  
    return (    
        <div> 
            <div>
                <EditorComponent
                    content={ user?.markDown } 
                    handleChange={(editor) => handleChange(editor,  user)}
                    read_only={ user?.role === role.Student ? true : false } 
                />    
            </div>    
        </div>   
    ); };
    
    export default connect(null, { setMarkDown, saveUser } )(UserBioEditor);