const express = require('express');
const url = require('url');
const apiRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById } = require('./db')


const resolveRequest = (item, req, res, next) => {
    if (!item) {
        const err = new Error("Requested resource not found");
        err.status = 404;
        next(err);
    } else {
        req.item = item;
        next();
    }
}

// apiRouter middlewares
const sendItem = (req, res, next) => {
    const objItem = req._parsedUrl.path.split('/')[1];
    const allItem = getAllFromDatabase(objItem);
    // console.log(req._parsedUrl.path);
    resolveRequest(allItem, req, res, next);
}

const sendById = (req, res, next) => {
    const baseUrl = req.baseUrl.split('/');
    const itmMatchingId = getFromDatabaseById(baseUrl[2], baseUrl[3]);
    resolveRequest(itmMatchingId, req, res, next); 
}


apiRouter.use(['/minions', '/ideas', '/meetings'], sendItem);
apiRouter.use(['/minions/:minionId', '/ideas/:ideaId'], sendById);

// Error handling middleware
apiRouter.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || "Something went wrong");
})

// GET /api
apiRouter.get('/', (req, res) => {
    res.send("hi there. This is a dead end road")
})


/** 
 * These are routes to
 * MINIONS
 */

// GET /api/minions
apiRouter.get('/minions', (req, res, next) => {
    res.json(req.item);
})

// GET /api/minions/:minionId
apiRouter.get('/minions/:minionId', (req, res, next) => {
    res.json(req.item);
})

/** 
 * These are routes to
 * IDEAS
 */

// GET /api/ideas
apiRouter.get('/ideas', (req, res, next) => {
    res.json(req.item);
})

// GET /api/ideas/:ideaId
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    res.json(req.item);
})


/** 
 * These are routes to
 * MEETINGS
 */

// GET /api/minions
apiRouter.get('/meetings', (req, res, next) => {
    res.json(req.item);
})


module.exports = apiRouter;
