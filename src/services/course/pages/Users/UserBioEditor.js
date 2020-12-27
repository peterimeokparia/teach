import React from 'react';

import { 
connect } from 'react-redux';

import { 
setMarkDown, 
saveUser } from '../../actions';

import { 
SET_USER_BIO_MARKDOWN } from '../../actions';

import './LessonEditor.css';


const UserBioEditor = ({ user,  setMarkDown }) => {

    return (    
        <div> 
            <div>
                <textarea
                    className="Editor"
                    rows="10"
                    cols="65"
                    value={user?.markDown || ''}
                    onChange={ ( e ) => setMarkDown(user, e.target.value, "users", SET_USER_BIO_MARKDOWN, saveUser )}
                >
               </textarea>
            </div>    
        </div> 
       
    );

}




export default connect(null, { setMarkDown, saveUser } )(UserBioEditor);