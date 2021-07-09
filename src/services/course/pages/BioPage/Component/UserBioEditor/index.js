import { 
connect } from 'react-redux';

import { 
saveUser } from 'Services/course/Actions/Users';

import { 
setMarkDown } from 'Services/course/helpers/EditorHelpers';

import { 
SET_USER_BIO_MARKDOWN } from 'Services/course/Actions/Users';

import {
role } from 'Services/course/helpers/PageHelpers';

import EditorComponent  from 'Services/course/Pages/Components/EditorComponent';

const UserBioEditor = ({ 
user,  
setMarkDown 
}) => {
    let teachObject = { propNameOne: "users", propNameTwo: "users" };
    
    return (    
        <div> 
            <div>
                <EditorComponent
                    content={ user?.markDown } 
                    onChange={ ( editor ) => setMarkDown(user, editor.getHTML(), teachObject, SET_USER_BIO_MARKDOWN, saveUser )} 
                    read_only={ user?.role === role.Student ? true : false } 
                />    
            </div>    
        </div>   
    );
};

export default connect(null, { setMarkDown, saveUser } )(UserBioEditor);