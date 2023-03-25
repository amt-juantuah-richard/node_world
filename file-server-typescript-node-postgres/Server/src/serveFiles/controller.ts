// This module contains functions 
// that control what happens 
// when requests are sent

// required dependencies
import { Request, Response } from 'express';
import pool from './../dtb';
import { getAllFiles, getAllUsers } from './queries';


// Interacting with the Users table

/**
 * Gets all users in teh db
 * @param req requet object
 * @param res response object
 * @param next push to next
 */
export const getUsers = (req: Request, res: Response, next: any) => {
    try {

        pool.query(getAllUsers, (error, results) => {
            if (error) {
                console.log("Error executing Postgresql query");
                throw error.stack;
            }
            res.status(200).json(results.rows);
        })
        
    } catch (error) {
        res.send({
            message: "an error occurred",
            error: error
        })
    }
}


// interacting with the files table


// ### change this function to an async one
/**
 * For Getting All files from db
 * @param req requet object
 * @param res response object
 */
export const getFiles = (req: Request, res: Response) => {
    try {

        pool.query(getAllFiles, (error, results) => {
            if (error) {
                console.log("Error executing Postgresql query");
                throw error.stack;
            }
            res.status(200).json(results.rows);
        })
        
    } catch (error) {
        res.send({
            message: "an error occurred",
            error: error
        })
    }
} 