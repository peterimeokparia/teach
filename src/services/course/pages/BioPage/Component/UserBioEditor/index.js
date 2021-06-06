import React from 'react';

import { 
connect } from 'react-redux';

import { 
saveUser } from 'Services/course/Actions/Users';

import { 
setMarkDown } from 'Services/course/Actions/Lessons';

import { 
SET_USER_BIO_MARKDOWN } from 'Services/course/Actions/Users';

import {
role } from 'Services/course/helpers/PageHelpers';

import {
placeHolder } from 'Services/course/helpers/EditorHelpers';

import EditorComponent  from 'Services/course/Pages/Components/EditorComponent';

import './style.css';

// const plugins = {
//   // Define plugins for content cells.

//   // To import multiple plugins, use [slate(), image, spacer, divider]
//   content: [slate()],

//   // Define plugins for layout cells
//   layout: [background({ defaultPlugin: slate() })],
// };

const UserBioEditor = ({ 
user,  
setMarkDown 
}) => {
    return (    
        <div> 
            <div>
                <EditorComponent
                    content={ ( user?.markDown === undefined || user?.markDown === "" ) ? placeHolder : JSON.parse(user?.markDown) } 
                    onChange={ ( editor ) => setMarkDown(user, JSON.stringify( editor.emitSerializedOutput() ), "users", SET_USER_BIO_MARKDOWN, saveUser )} 
                    read_only={ user?.role === role.Student ? true : false } 
                />    
            </div>    
        </div>   
    );
};

export default connect(null, { setMarkDown, saveUser } )(UserBioEditor);