import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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

export async function hashPasswordField( req, res, next ){
    const passwordField = req.body['password'];
    if( req.body['password'] ) {
        try {

            const salt = await bcrypt.genSalt();

            req.body['password'] = await bcrypt.hash( passwordField, salt );
           
        } catch (error) {
            return res.status(403).json({ error });
        }
    } else {
        return res.status(401).json({ error: 'Authorization header not set'});
    }
};


export async function verifyToken( token, key ){
  let verificationResult = Jwt.verify(token, key, (err, data) => {
      if (err) {
          console.log(err);
      }
      else {
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


// MyModel.find({$text: {$search: searchString}})
//        .skip(20)
//        .limit(10)
//        .exec(function(err, docs) { ... });

export function paginatedSearchResults( model, Id ){
    return async ( req, res, next ) => {
    
        const searchString = req.query[Id];
        const page = parseInt( req.query.page );
        const limit = parseInt( req.query.limit );

        const startIndex = (( page - 1 ) * limit );
        const endIndex = ( page * limit );

        const result = {};

        if ( endIndex < await model.find( {$text: {$search: searchString}} )?.countDocuments().exec() ) {
            result.next = { page: ( page + 1 ), limit };
        }

        if ( startIndex > 1 ) {
            result.previous = { page: ( page - 1 ), limit };
        }

        try {
            result.total = await model.find( {$text: {$search: searchString}} )?.countDocuments().exec();
            result.page = page;
            result.pages = Math.ceil( await model.find( {$text: {$search: searchString}} )?.countDocuments().exec() / limit );
            result.resultTest = model;
            result.results = await model.find( {$text: {$search: searchString}} ).limit( limit ).skip( startIndex ).exec();
            res.paginatedResults =  result;
            console.log( JSON.stringify(result) )
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
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

        let field = {};

        field[param] = req.query[ param ];

        //let id = { param: req.query[ param ] }

        try {
            let result = await model.find(field);      
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
            let result = await model.findById(id);
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

        let formData = getPostData(req);
        let form = new model( formData );

        try {
            let savedResult = await form.save();
            res.newResult = savedResult;
            next();
        } catch (error) {
            console.log('@@@@@ERROR@@@@@')
            console.log(error);
            const collectionName = model.collection.collectionName;
            handleBackEndLogs(collectionName, error );
            res.status(500).json({ message: error.message });
        }
    }
};

export function putRoute(model, param){
    return async ( req, res, next ) => {

        let Id = req.params[ param ];

            console.log('putRoute putRoute')
            console.log(JSON.stringify(req?.body))
       
        try {
            let savedResult = await saveUpdatedData(req, model, Id);
            console.log('await saveUpdatedData')
            console.log(JSON.stringify(savedResult))
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
            console.log(' delete route ')
            console.log(JSON.stringify(result))
            next();
        } catch (error) {
            console.log( error?.message )
            const collectionName = model.collection.collectionName;
            handleBackEndLogs(collectionName, error );
            res.status(500).json({ message: error.message });
        }
    }
};
