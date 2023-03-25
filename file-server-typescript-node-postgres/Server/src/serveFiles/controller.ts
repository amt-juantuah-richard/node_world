// This module contains functions 
// for handling requests


// required dependencies
import { Request, Response, NextFunction } from 'express';
import pool from './../dtb';
import { getAllFiles, getAllUsers } from './queries';


// Interacting with the Users table

/**
 * Gets all users in teh db
 * @param req requet object
 * @param res response object
 * @param next push to next
 */
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    try {

        pool.query(getAllUsers, (error, results) => {
            if (error) {
                console.log("Error executing Postgresql query");
                throw error;
            }
            res.status(200).json(results.rows);
        })
        
    } catch (error) {
        next(error)
    }
}


// interacting with the files table


// ### change this function to an async one
/**
 * For Getting All files from db
 * @param req requet object
 * @param res response object
 */
export const getFiles = (req: Request, res: Response, next: NextFunction) => {
    try {

        pool.query(getAllFiles, (error, results) => {
            if (error) {
                console.log("Error executing Postgresql query");
                throw error;
            }
            res.status(200).json(results.rows);
        })
        
    } catch (error) {
        next(error);
    }
} 