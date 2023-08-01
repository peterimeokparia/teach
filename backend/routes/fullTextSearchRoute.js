const express = require('express');

const fullTextSearchModel = require('../model/fullTextSearchModel.js');

const { 
FULLTEXTSEARCHROUTE,
handleBackEndLogs } = require('../helpers/logHelper.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
paginatedResults,
paginatedSearchResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const fullTextSearchRoute = express.Router();

fullTextSearchRoute.use(logRouteInfo);

fullTextSearchRoute.get('/pagedRoute', paginatedSearchResults( fullTextSearchModel, 'searchTerm' ), (req, res) => {
    console.log('res?.paginatedResults res?.paginatedResults res?.paginatedResults res?.paginatedResults res?.paginatedResults')
    console.log(JSON.stringify( res?.paginatedResults ))
    res.json(res?.paginatedResults);
 });

fullTextSearchRoute.get('/', getRoute( fullTextSearchModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

fullTextSearchRoute.get('/', getByIdRoute( fullTextSearchModel, 'contentId' ),  (req, res) => {
    console.log('contentId newResult newResult newResult newResult')
    console.log(JSON.stringify(res?.newResult))
    return res.status(200).json(res?.newResult);
});

fullTextSearchRoute.get('/search', getByObjectIdRoute( fullTextSearchModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

fullTextSearchRoute.get('/user', getByIdRoute( fullTextSearchModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

fullTextSearchRoute.post('/', postRoute( fullTextSearchModel ), (req, res) => {
    console.log('newResult newResult newResult newResult')
    console.log(JSON.stringify(res?.newResult))
    return res.status(200).json(res?.newResult);
});

fullTextSearchRoute.put('/:searchId', putRoute( fullTextSearchModel, 'searchId' ), (req, res) => {
    console.log('saved result saved result')
    console.log(JSON.stringify(res?.savedResult))
    return res.status(200).json(res?.savedResult);
});

fullTextSearchRoute.delete('/:searchId', deleteRoute(fullTextSearchModel, 'searchId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = fullTextSearchRoute;