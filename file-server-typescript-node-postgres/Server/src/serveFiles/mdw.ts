// This module contains all
// homebrew middleware functions

import { Request, Response, NextFunction } from 'express';
import pool from '../dtb';
import { getAdmin } from './queries';

export interface ErrorWithStatusCode extends Error{
    statusCode?: number;
};

export type Cb = (error: Error | null, filename: string | boolean) => void;


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