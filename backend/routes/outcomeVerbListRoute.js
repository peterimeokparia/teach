const express = require('express');

const outcomeVerbListModel = require('../model/outcomeVerbListModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const outcomeVerbListRoute = express.Router();

outcomeVerbListRoute.use(logRouteInfo);

outcomeVerbListRoute.get('/', getRoute( outcomeVerbListModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomeVerbListRoute.get('/:outcomeVerbListId', getByIdRoute( outcomeVerbListModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomeVerbListRoute.post('/', postRoute( outcomeVerbListModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomeVerbListRoute.put('/:outcomeVerbListId', putRoute( outcomeVerbListModel, 'outcomeVerbListId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

outcomeVerbListRoute.delete('/:outcomeVerbListId', deleteRoute(outcomeVerbListModel, 'outcomeVerbListId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = outcomeVerbListRoute;