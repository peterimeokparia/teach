import { 
connect } from 'react-redux';

import { 
SET_USER_BIO_MARKDOWN } from 'services/course/actions/users';

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor';

import {
editor_upload_url,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';

import {
role } from 'services/course/helpers/PageHelpers';

import EditorComponent  from 'services/course/pages/components/EditorComponent';

const UserBioEditor = ({ 
    user,  
    saveEditorMarkDownObjectToMw }) => {

return (    
    <div> 
        <div>
            <EditorComponent
                content={ user?.markDownContent }  
                handleChange={(editor) => handleChange({ ...user, markDownContent: editor }, SET_USER_BIO_MARKDOWN, `/users/`, saveEditorMarkDownObjectToMw )}
                upload_url={editor_upload_url}
                read_only={ user?.role === role.Student ? true : false } 
            />    
        </div>    
    </div>   
); };

export default connect(null, { saveEditorMarkDownObjectToMw } )(UserBioEditor);