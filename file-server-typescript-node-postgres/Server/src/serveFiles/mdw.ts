// This module contains all
// homebrew middleware functions

import { Request, Response, NextFunction } from 'express';
import pool from '../dtb';
import { getAdmin } from './queries';

interface ErrorWithStatusCode extends Error{
    statusCode?: number;
}

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
        success: false,
        status: errStatus,
        message: errMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
} 

/**
 * Checks if the user is an administrator
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const checkAdminStatus = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.adminId;

        pool.query(getAdmin, [id], (error, results) => {
            if (error) {
                const er: ErrorWithStatusCode = error;
                er.statusCode = 400;
                next(er)
            }
            else if (!results.rows.length) {
                const er: ErrorWithStatusCode = new Error('You are not authorized to perform this action');
                er.statusCode = 401;
                next(er)
            }
            else next();
        })
    } catch (error) {
        next(error);
    }
}