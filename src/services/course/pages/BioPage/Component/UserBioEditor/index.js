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

import Dante from 'Dante2';
// Load some exemplary plugins:
// The rich text area plugin
import slate from '@react-page/plugins-slate';

// A plugin for background images
import background from '@react-page/plugins-background';

// Stylesheets for the rich text area plugin
import '@react-page/plugins-slate/lib/index.css';

// Stylesheets for  background layout plugin
import '@react-page/plugins-background/lib/index.css';

import './style.css';

// Define which plugins we want to use.
// We only have slate and background available, so load those.

const plugins = {
  // Define plugins for content cells.

  // To import multiple plugins, use [slate(), image, spacer, divider]
  content: [slate()],

  // Define plugins for layout cells
  layout: [background({ defaultPlugin: slate() })],
};

const UserBioEditor = ({ 
user,  
setMarkDown 
}) => {
    return (    
        <div> 
            <div>
                <Dante
                    content={ ( user?.markDown === undefined || user?.markDown === "" ) ? placeHolder : JSON.parse(user?.markDown) } 
                    onChange={ ( editor ) => setMarkDown(user, JSON.stringify( editor.emitSerializedOutput() ), "users", SET_USER_BIO_MARKDOWN, saveUser )} 
                    read_only={ user?.role === role.Student ? true : false } 
                />    
            </div>    
        </div>   
    );
}

export default connect(null, { setMarkDown, saveUser } )(UserBioEditor);