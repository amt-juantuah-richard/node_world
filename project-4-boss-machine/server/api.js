const express = require('express');
const url = require('url');
const apiRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea')
const { 
    addToDatabase, 
    createMeeting, 
    getAllFromDatabase, 
    getFromDatabaseById, 
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('./db')


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
    const urlPath = req.path.split('/');
    const itemMatchingId = getFromDatabaseById(urlPath[1], urlPath[2]);
    resolveRequest(itemMatchingId, req, res, next); 
}

const addNewItemToDb = (req, res, next) => {
    const objItem = req._parsedUrl.path.split('/')[1];
    const createdItem = objItem !== 'meetings' ? 
            addToDatabase(objItem, req.body) :
            addToDatabase(objItem, createMeeting())
    resolveRequest(createdItem, req, res, next);
}

const updateItemInDb = (req, res, next) => {
    const urlPath = req.path.split('/');
    const updatedItem = updateInstanceInDatabase(urlPath[1], req.body);
    resolveRequest(updatedItem, req, res, next);
}

const deleteItemFromDb = (req, res, next) => {
    const urlPath = req.path.split('/')[1];
    const itemDeleted = deleteFromDatabasebyId(urlPath, req.params.minionId);
    resolveRequest(itemDeleted, req, res, next);
}

const deleteAllFromDb = (req, res, next) => {
    const deletedArray = deleteAllFromDatabase(req.path.split('/')[1]);
    resolveRequest(deletedArray, req, res, next);
}


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
apiRouter.get('/minions', sendItem, (req, res, next) => {
    res.json(req.item);
})

// GET /api/minions/:minionId
apiRouter.get('/minions/:minionId', sendById, (req, res, next) => {
    res.json(req.item);
})

// POST /api/minions
apiRouter.post('/minions/', addNewItemToDb, (req, res, next) => {
    res.json(req.item);
})

// PUT /api/minions/:minionId
apiRouter.put('/minions/:minionId', updateItemInDb, (req, res, next) => {
    res.json(req.item);
})

// DELETE /api/minions/:minionId
apiRouter.delete('/minions/:minionId', deleteItemFromDb, (req, res, next) => {
    res.send();
})




/** 
 * These are routes to
 * IDEAS
 */

// GET /api/ideas
apiRouter.get('/ideas', sendItem, (req, res, next) => {
    res.json(req.item);
})

// GET /api/ideas/:ideaId
apiRouter.get('/ideas/:ideaId', sendById, (req, res, next) => {
    res.json(req.item);
})

// POST /api/ideas
apiRouter.post('/ideas/', addNewItemToDb, checkMillionDollarIdea, (req, res, next) => {
    res.json(req.item);
})

// PUT /api//ideas/:ideaId
apiRouter.put('/ideas/:ideaId', updateItemInDb, checkMillionDollarIdea, (req, res, next) => {
    res.json(req.item);
})

// DELETE /api/ideas/:ideaId
apiRouter.delete('/ideas/:ideaId', deleteItemFromDb, (req, res, next) => {
    res.send();
})




/** 
 * These are routes to
 * MEETINGS
 */

// GET /api/minions
apiRouter.get('/meetings', sendItem, (req, res, next) => {
    res.json(req.item);
})

// POST /api/meetings
apiRouter.post('/meetings/', addNewItemToDb, (req, res, next) => {
    res.json(req.item);
})

// DELETE /api/meetings
apiRouter.delete('/meetings', deleteAllFromDb, (req, res, next) => {
    res.send();
})


module.exports = apiRouter;
