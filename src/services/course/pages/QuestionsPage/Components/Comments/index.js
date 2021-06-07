import 
React, { 
useState } from 'react';

import {
manageCommentsFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import EditorComponent  from '../../../Components/EditorComponent';
import './style.css';

const Comments = ({ config, commentsConfig, onlineQuestionId }) => {

    const [ comments, setComments ] = useState( [] ); 

    const addNewComment = () => {

        if ( comments ) {    
           commentsConfig.updateEditorComments(comments);
        }

        let commentsFieldCollection = [ ...comments?.filter( obj => obj.questionNumber === config?.questionNumber &&
                obj.editorName === config?.editorName &&
                    obj.name === commentsConfig?.name ), manageCommentsFieldCollection( { ...commentsConfig, comments } ) ];

        setComments( [ ...comments, ...commentsFieldCollection ] );

        if ( commentsFieldCollection ) {
            commentsConfig.updateEditorComments( commentsFieldCollection );
        }
    };

    const removeComments = () => {
        let lastCommentField = comments[ ( comments?.length - 1 ) ];
        let decrementedCommentSet = comments?.filter( input => input?.name !== lastCommentField?.name );
        setComments(
        [
            ...decrementedCommentSet
        ]);
    }

   const handleChange = ( editor, name, type ) => {
   }   

    return (
        <>
        {comments?.map( comment => (

            <EditorComponent
                className={"answerDisplay"}
                key={ comment?.id }
                id={ comment?.id }
                name={ comment?.name } 
                onChange={(editor) => handleChange(editor, comment?.name, commentsConfig?.editorContentType )} // editor, editors?.length, commentsConfig?.editorContentType, commentsConfig?.element
                content={JSON.parse( comment?.markDownContent ) }
                upload_url={commentsConfig.upload_url}
                upload_handler={( file, imageBlock ) => commentsConfig?.uploadImageUrl( file, imageBlock, comments?.length )}
                readOnly={config.previewMode? true : false }
            />
        ))

        }
          
        {
            <div>
                <input className="form-builder-btn" type="button" onClick={ addNewComment } value="+" />
                <input className="form-builder-btn" type="button" onClick={ removeComments } value="-" />
            </div>   
        }       
        </>
    );
}

export default Comments;