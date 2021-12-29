import Jwt from 'jsonwebtoken';
//export const privateKey = "secret_nsa_key"; 
import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
FORMFIELDROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

export function verifyRoute( req, res, next ){
    if( req.headers['authorization'] ) {
        try {
            let authorizationHeader = req.headers['authorization'].split(" ");
            if ( authorizationHeader[0] !== "Bearer" ) {
                return res.status(401).json({ error: 'Bearer not set in header'});
            } else {
                let result = verifyToken( authorizationHeader[1], process.env.NSAKEY );
                return next();
            }
        } catch (error) {
            return res.status(403).json({ error });
        }
    } else {
        return res.status(401).json({ error: 'Authorization header not set'});
    }
};

export async function verifyToken( token, key ){
  let verificationResult = await Jwt.verify(token, key, (err, data ) => {
      if ( err ){
         console.log(err); 
         } else {
         console.log(data);
      }
   });   
   return verificationResult
};

export function logRouteInfo( req, res, next ){
    console.log('Request Method:', req?.method);
    console.log('Request Route:',req?.originalUrl);
    console.log('Request Body:',req?.body);
    console.log('Full Request:',req);
    next();
};

export function paginatedResults( model, Id ){
    return async ( req, res, next ) => {
        const id = {};

        id[Id] = req.query.id;
        const page = parseInt( req.query.page );
        const limit = parseInt( req.query.limit );

        const startIndex = (( page - 1 ) * limit );
        const endIndex = ( page * limit );

        const result = {};

        if ( endIndex < await model.find( id )?.countDocuments().exec() ) {
            result.next = { page: ( page + 1 ), limit };
        }

        if ( startIndex > 1 ) {
            result.previous = { page: ( page - 1 ), limit };
        }

        try {
            result.total = await model.find( id )?.countDocuments().exec();
            result.page = page;
            result.pages = Math.ceil( await model.find( id )?.countDocuments().exec() / limit );
            result.resultTest = model;
            result.results = await model.find( id ).limit( limit ).skip( startIndex ).exec();
            res.paginatedResults =  result;
            console.log( '@@@@@@@ getting result' )
            console.log( JSON.stringify(result) )
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export function getRoute(model){
    return async ( req, res, next ) => {
        try {
            let result = await model.find({});
            res.newResult = result;
            next();
        } catch (error) {
            const collectionName = model.collection.collectionName;
            handleBackEndLogs(collectionName, error );
            res.status(500).json({ message: error.message });
        }
    }
};

export function getByIdRoute(model, param){
    return async ( req, res, next ) => {

        let id = { param: req.query[ param ] }

        try {
            let result = await model.find(id);
            res.newResult = result;
            next();
        } catch (error) {
            const collectionName = model.collection.collectionName;
            handleBackEndLogs(collectionName, error );
            res.status(500).json({ message: error.message });
        }
    }
};

export function getByObjectIdRoute(model, param){
    return async ( req, res, next ) => {

        let id = { _id: req.query[ param ] }

        try {
            let result = await model.find(id);
            res.newResult = result;
            next();
        } catch (error) {
            const collectionName = model.collection.collectionName;
            handleBackEndLogs(collectionName, error );
            res.status(500).json({ message: error.message });
        }
    }
};

export function postRoute(model){
    return async ( req, res, next ) => {

        let formData = getPostData( req );
        let form = new model( formData );

        try {
            let savedResult = await form.save();
            res.newResult = savedResult;
            next();
        } catch (error) {
            const collectionName = model.collection.collectionName;
            handleBackEndLogs(collectionName, error );
            res.status(500).json({ message: error.message });
        }
    }
};

export function putRoute(model, param){
    return async ( req, res, next ) => {

        let Id = req.params[ param ];
       
        try {
            let savedResult = await saveUpdatedData(req, model, Id);
            res.savedResult = savedResult;
            next();
        } catch (error) {
            const collectionName = model.collection.collectionName;
            handleBackEndLogs(collectionName, error );
            res.status(500).json({ message: error.message });
        }
    }
};

export function deleteRoute(model, param){
    return async ( req, res, next ) => {

        let id = { _id: req.params[ param ] }

        try {
            let result = await model.remove(id);
            res.newResult = result;
            next();
        } catch (error) {
            const collectionName = model.collection.collectionName;
            handleBackEndLogs(collectionName, error );
            res.status(500).json({ message: error.message });
        }
    }
};
