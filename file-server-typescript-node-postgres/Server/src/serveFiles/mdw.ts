// This module contains all
// homebrew middleware functions

import { Request, Response, NextFunction } from 'express';
import pool from '../dtb';
import { getAdmin, getOneUserById } from './queries';
import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';


// UTILS AND INTERFACES /////////////////////////////////////

export interface ErrorWithStatusCode extends Error{
    statusCode?: number;
};

export type Cb = (error: Error | null, filename: string | boolean) => void;

export const deleteFileFromDisk = (filePath: string) => {
    fs.unlink(filePath, (error) => {
        if (error) console.log(error);
    });
};

/**
 * set errors and pass them to the next function
 * @param err error to pass
 * @param code code to set as status code
 * @param next next function
 */
export const setError = (err: Error | string, next: NextFunction, code?: number) => {
    const er: ErrorWithStatusCode = typeof err === 'string' ? new Error(err) : err;
    er.statusCode = code || undefined;
    next(er);
};


// ERRORHANDLERS ////////////////////////////////////////////
/**
 * All inclusive Error Handling function
 * @param err Any error item
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const errStatus = err.statusCode || 500;
    const errMessage = err.message || 'An error occurred.Something went wrong!!';
    res.status(errStatus).json({
        ok: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
        // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
} 




// AUTHORIZATION FUNCTIONS //////////////////////////////
/**
 * Checks if the user is an administrator
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const checkAdminStatus = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.adminId || req.params.id;

        pool.query(getAdmin, [id], (error, results) => {
            if (error) {
                setError(error, next, 400);
            }
            else if (!results.rows.length) {
                const errorMessage = 'You are not authorized to perform this action';
                setError(errorMessage, next, 401);
            }
            else next();
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Checks if the user id is valid
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const checkUserStatus = (req: Request, res: Response, next: NextFunction) => {
    // TODO: get the user email here and pass it to the next function as req.body.email; 
    try {
        const id = req.params.id;

        pool.query(getOneUserById, [id], (error, results) => {
            if (error) {
                setError(error, next, 400);
            }
            else if (!results.rows.length) {
                const errorMessage = 'Only registered users are allowed to perform this action';
                setError(errorMessage, next, 403);
            }
            else {
                req.body.email = results.rows[0].email;
                next();
            }
        })
    } catch (error) {
        next(error);
    }
}


// MULTER FUNCTIONS //////////////////////////////////

// set the storage engine to use
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, file, cb) {
        const fileNameStart = file.originalname.split(".")[0].length < 50 ? file.originalname.split(".")[0] : 'document';
        
        const newFileName = typeof fileNameStart === 'string' ? fileNameStart.split('/').join('_').split(" ").join("") : 'document';

        cb(null, newFileName + '_' + Date.now() + path.extname(file.originalname));
    }
})

// check file type
function checkFileType(file: any, cb: FileFilterCallback) {

    // Allowed extensions
    const filetypes = /doc|docx|html|htm|odt|pdf|xls|xlsx|ods|ppt|pptx|txt|jpeg|jpg|png|gif|text/;

    // Check file extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // check file mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) { 
        return cb(null, true);
    } else {
        cb(new Error('Unkown file type: ' + file.mimetype + '. Only document and image files are allowed'));
    }
}

// upload entry point
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('document')

export const upLoadOneFile = (req: Request, res: Response, next: NextFunction) => {
    try {
        upload(req, res, function(er) {
            if (er instanceof multer.MulterError) {
                setError(er, next, parseInt(er.code) || 400);
            }
            else if (er) {
                const errMessage = er.message || 'An unknown error occurred while uploading file';
                setError(errMessage, next, parseInt(er.code) || 400);
            }
            else {
                
                // console.log('File uploaded successfully');
                // console.log("this is the req body: ", req.body);
                // console.log("this is the req file: ", req.file);
                req.body.file_name = req.file?.filename;
                req.body.file_format = req.file?.mimetype;
                req.body.file_url = req.file?.path;
                // req.body.user_email = req.body.email;
                next();
            };

        })
        
    } catch (error) {
        next(error);
    }
}
