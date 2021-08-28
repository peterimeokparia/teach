import express from 'express';

import whiteBoardModel from '../model/whiteBoardModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
WHITEBOARDROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const whiteBoardRoute = express.Router();

whiteBoardRoute.use(logRouteInfo);

whiteBoardRoute.get('/', (req, res) => {
    whiteBoardModel.find( { } )
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( WHITEBOARDROUTE, error );
        return res.status(400).json({ error });
    });
});

whiteBoardRoute.get('/byId', (req, res) => {
    whiteBoardModel.find( { _id: req.query.id } )
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( WHITEBOARDROUTE, error );
        return res.status(400).json({ error });
    });
});

whiteBoardRoute.get('/byWid', (req, res) => {
    whiteBoardModel.find( { wid: req.query.wid } )
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( WHITEBOARDROUTE, error );
        return res.status(400).json({ error });
    });
});

whiteBoardRoute.post('/', (req, res) => {
    let whiteBoardData = getPostData( req );
    let whiteBoard = new whiteBoardModel(whiteBoardData);  
    whiteBoard.save()
    .then(data => {
        return res.status(200).json(data)
    })
    .catch( error => {
        handleBackEndLogs( WHITEBOARDROUTE, error );
        return res.status(400).json({ error });
    });
});

whiteBoardRoute.put('/:id', (req, res) => {
    saveUpdatedData(req, whiteBoardModel, req.params.id)
    .then( data => {
        return res.status(200).json(data)
    })
    .catch( error => {
        handleBackEndLogs( WHITEBOARDROUTE, error );
        return res.status(400).json({ error })
    });
});

whiteBoardRoute.delete('/:id', (req, res) => {
    whiteBoardModel.remove({ _id: req.params.id }, ( error, result ) => {
        if ( error ) {
            return res.status(400).send(error);
        }else {
            return res.status(200).json(result);
        }
    });
});

export default whiteBoardRoute;
