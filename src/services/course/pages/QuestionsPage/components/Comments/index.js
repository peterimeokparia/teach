import { 
useState } from 'react';

import { 
connect } from 'react-redux';

import {
handleChange,
editor_upload_url } from 'services/course/pages/OnlineQuestionsPage/helpers';
    
import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor';

import {
SET_ONLINECOMMENTS_MARKDOWN } from 'services/course/actions/comments';

import {
manageCommentsFieldCollection } from 'services/course/pages/QuestionsPage/helpers';

import EditorComponent  from '../../../Components/EditorComponent';
import './style.css';

const Comments = ({ config, commentsConfig, onlineQuestionId, saveEditorMarkDownObjectToMw }) => {

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

    return (
        <>
        {comments?.map( comment => (

            <EditorComponent
                className={"answerDisplay"}
                key={ comment?.id }
                id={ comment?.id }
                name={ comment?.name } 
                upload_url={ editor_upload_url }
                handleChange={(editor) => handleChange({ ...comment, markDownContent: editor }, SET_ONLINECOMMENTS_MARKDOWN, `/onlinecomments/`, saveEditorMarkDownObjectToMw )}
                content={comment?.markDownContent }
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

export default connect(null, { saveEditorMarkDownObjectToMw })(Comments);