import express from 'express';

import onlineCommentModel from '../Model/onlineCommentModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';

const onlineQuestionAnswersCommentsRoute = express.Router();

onlineQuestionAnswersCommentsRoute.get('/', (req, res) => {
    onlineCommentModel.find({})
    .then(data => {
        console.log('onlineComment onlineComment Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error })
    });
 });

onlineQuestionAnswersCommentsRoute.get('/', (req, res) => {
    let id = { _id: req.query.commentId };
    onlineCommentModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error =>{    
        return res.status(400).json({ error }); 
    });
});

onlineQuestionAnswersCommentsRoute.get('/comment/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    onlineCommentModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error => { 
        return res.status(400).json({ error })
    });
})

onlineQuestionAnswersCommentsRoute.post('/', (req, res) => {
    console.log('in onlineComment onlineComment saved saved');
    let answerData = getPostData( req );
    console.log( 'commentData' )
    console.log( answerData )
    let onlineComment = new onlineCommentModel(answerData);
    onlineComment.save()
    .then(data => {
        console.log('onlineComment onlineComment saved saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersCommentsRoute.put('/:commentId', (req, res) => {
    saveUpdatedData(req, onlineCommentModel, req.params.commentId)
    .then( data => {
        console.log('onlineCommentsRoute onlineCommentsRoute onlineCommentsRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersCommentsRoute.delete('/:commentId', (req, res) => {
    console.log('onlineQuestionAnswersCommentsRoute.delete')
    console.log(req)
    console.log(req.params.commentId)
    onlineCommentModel.remove({ _id: req.params.commentId }, ( error, result ) => {
        if ( error ) {
            console.log(error)
            return res.status(400).send(error);
        }
        else {
            console.log(result)
            return res.status(200).json(result);
        }
    });
});

export default onlineQuestionAnswersCommentsRoute;