// This module contains functions 
// for handling requests


// required dependencies
import { Request, Response, NextFunction } from 'express';
import pool from './../dtb';
import { deleteFileFromDisk, setError } from './mdw';
import nodeMailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { 
    createOneUser, 
    getAllFiles, 
    getAllUsers,
    getOneUserByUsernameAndPassword,
    getOneUserByUsernameAndEmail,
    deleteOneUser, 
    updateOneUserUsername,
    updateOneUserPassword,
    getOneUserById,
    uploadOneFile,
    uploadAdminFile,
    getPrivateFilesForUser,
    getAllPublicFiles,
    verifyAccount,
} from './queries';



// Interacting with the Users table

// verifyAccount
/**
 * verify a user
 * @param req requet object
 * @param res response object
 * @param next push to next
 */
export const verifyOneUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, token } = req.body;
    const errorMessage = 'Broken link. You have two options. Contact Documents Hub or register with a different email';

    jwt.verify(token, 'documentwebstore', function(err: any, decoded: any) {
        if (err) {
            setError(errorMessage, next, 422);
        }
        else if (decoded) {
            try {
                pool.query(verifyAccount, [username, email], (error, results) => {
                    if (error) {
                        setError(errorMessage, next, 422);
                    }
                    else if (results.rows[0]) {
                        res.status(200).json({
                            ok: true,
                            message: 'Successfully verified your account. You can log in with your credentials'
                        })
                    } else setError(errorMessage, next, 422);
                })
            } catch (error) {
                setError(errorMessage, next, 422);
            }
            
        } else {
            setError(errorMessage, next, 422);
        }
      });
}

/**
 * Gets all users in the db
 * @param req requet object
 * @param res response object
 * @param next push to next
 */
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    try {

        pool.query(getAllUsers, (error, results) => {
            if (error) {
                setError(error, next, 400);
            }
            else res.status(200).json(results.rows);
        })
        
    } catch (error) {
        next(error)
    }
}



export const createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const token = jwt.sign({
            data: username
          }, 'documentwebstore', { expiresIn: '365d' });

        if (!username || !email || !password) {
            const errorMessage = 'username and email and password are required fields. At least one of them is missing or wrong';
            setError(errorMessage, next, 422);
        }
        else {
            pool.query(createOneUser, [username, email, password], (error, results) => {
                if (error) {
                    setError(error, next, 400);
                }
                else {
                    try {
                        sendVerificationMail(res, token, email, username, next);
                        res.status(201).json({
                            ok: true,
                            message: `Account was created Successfully. Instructions has been sent to your email (${email}). Follow it to verify your account`,
                            user: {
                                username: username,
                                email: email
                            }               
                        });
                    } catch (error) {
                        next(error);
                    }

                    
                }
            })
        }
        
    } catch (error) {
        next(error);
    }
}

/**
 * Get a user by username and password
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const getAUserByUsernameAndPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            const errorMessage = 'username and password are required fields. At least one of them is missing or wrong';
            setError(errorMessage, next, 422);
        }
        else {
            await pool.query(getOneUserByUsernameAndPassword, [username, password], (error, results) => {
                if (error) {
                    setError(error, next, 400);
                } else if (results.rows[0] && results.rows[0].verified === false) {
                    const errorMessage = `An instruction was sent to your email (${results.rows[0].email}) for account verification. Follow the instructions to verify your account`;
                    setError(errorMessage, next, 401);
                }
                else if (results.rows[0] && results.rows[0].verified === true) {
                    const {password, ...user} = results.rows[0];
                    res.status(200).json({
                        ok: true,
                        message: "Welcome Back",
                        user: user
                    });
                }
                else next(new Error("Either Username or Password is wrong"))
            })
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Get a user by id && must be authorized
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const getAUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id;

        if (!id) {
            const errorMessage = 'id in params is required field';
            setError(errorMessage, next, 400);
        }
        else {
            await pool.query(getOneUserById, [id], (error, results) => {
                if (error) {
                    setError(error, next, 400);
                }
                else {
                    const {password, ...user} = results.rows[0];
                    res.status(200).json(user);
                };
            })
        }
    } catch (error) {
        next(error);
    }
}

/**
 * delete a user account by administrator
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const deleteAUserById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { email, password, username } = req.body;

        if (!id || !email || !password || !username) {
            const errorMessage = 'id, email, password, and username are required fields for deletion';
            setError(errorMessage, next, 400);
        }
        else {
            pool.query(getOneUserById, [id], (error, results) => {
                if (error) {
                    setError(error, next, 400);
                } else if (!results.rows.length) {
                    const errorMessage = 'Deletion unsuccessful. User not found';
                    setError(errorMessage, next, 404);
                }
                else {
                    pool.query(deleteOneUser, [id, email, password, username], (error, results) => {
                        if (error) {
                            setError(error, next, 400);
                        }
                        else if (!results.rowCount) {
                            const errorMessage = 'Some of the credentials provided was invalid';
                            setError(errorMessage, next, 400);
                        } 
                        else if (results.rowCount) {
                            res.status(200).json({
                                ok: true,
                                message: "Account deleted successfully"              
                            });
                        }
                        else {
                            const errMessage = 'Something broke. Our Engineers are checking it!';
                            setError(errMessage, next, 500);
                        }
                    })
                };
            })
        }

    } catch (error) {
        next(error);
    }
}


/**
 * update the username of a user account
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const updateAUserUsername = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, newUsername } = req.body;

        if (!username || !password || !newUsername) {
            const errorMessage = 'old username, password, and new username are required fields for username updates';
            setError(errorMessage, next, 400);
        }
        else {
            pool.query(getOneUserByUsernameAndPassword, [username, password], (error, results) => {
                if (error) {
                    setError(error, next, 400);
                } else if (!results.rows.length) {
                    const errorMessage = 'Update unsuccessful. Record not found';
                    setError(errorMessage, next, 404);
                } else if (results.rows[0] && results.rows[0].verified === false) {
                    const errorMessage = `An instruction was sent to your email (${results.rows[0].email}) to verify your account. Follow the instructions to verify your email and account`;
                    setError(errorMessage, next, 401);
                }
                else {
                    pool.query(updateOneUserUsername, [newUsername, password, username], (error, results) => {
                        if (error) {
                            setError(error, next, 400);
                        }
                        else if (!results.rowCount) {
                            const errorMessage = 'Some of the credentials provided was invalid';
                            setError(errorMessage, next, 400);
                        } 
                        else if (results.rowCount) {
                            res.status(200).json({
                                ok: true,
                                message: "Account updated successfully"              
                            });
                        }
                        else {
                            const errMessage = 'Something broke. Our Engineers are checking it!';
                            setError(errMessage, next, 500);
                        }
                    })
                };
            })
        }

    } catch (error) {
        next(error);
    }
}


/**
 * update the password of a user account
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const updateAUserPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, newPassword } = req.body;

        if (!username || !email || !newPassword) {
            const errorMessage = 'username, email, and new password are required fields for username updates';
            setError(errorMessage, next, 400);
        }
        else {
            await pool.query(getOneUserByUsernameAndEmail, [username, email], async (error, results) => {
                if (error) {
                    setError(error, next, 400);
                } else if (!results.rows.length) {
                    const errorMessage = 'Update unsuccessful. Username or password might be wrong. Check again';
                    setError(errorMessage, next, 404);
                } else if (results.rows[0] && results.rows[0].verified === false) {
                    const errorMessage = `An instruction was sent to your email (${results.rows[0].email}) to verify your account. Follow the instructions to verify your email and account`;
                    setError(errorMessage, next, 401);
                }
                else {
                    await pool.query(updateOneUserPassword, [newPassword, username, email], (error, results) => {
                        if (error) {
                            setError(error, next, 400);
                        }
                        else if (!results.rowCount) {
                            const errorMessage = 'Some of the credentials provided was invalid';
                            setError(errorMessage, next, 400);
                        } 
                        else if (results.rowCount) {
                            res.status(200).json({
                                ok: true,
                                message: "Account updated successfully"              
                            });
                        }
                        else {
                            const errMessage = 'Something broke. Our Engineers are checking it!';
                            setError(errMessage, next, 500);
                        }
                    })
                };
            })
        }

    } catch (error) {
        next(error);
    }
}

// TODO: Move this section to a separate controller

// interacting with the files table



/**
 * Gets All files from db
 * @param req requet object
 * @param res response object
 */
export const getFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {

        await pool.query(getAllFiles, (error, results) => {
            if (error) {
                setError(error, next, 400);
            }
            else res.status(200).json(results.rows);
        })
        
    } catch (error) {
        next(error);
    }
};


/**
 * Upload one file as public file for all user
 * @param req requet object
 * @param res response object
 */
export const uploadOneAdminFile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { 
            file_title,
            file_name,
            file_description,
            file_format,
            file_url,
            email,
            privacy
        } = req.body;
        if (!file_title || !file_name || !file_description || !file_format || !file_url || !email || !privacy) {
            req.file? deleteFileFromDisk(req.file?.path) : '';
            const errorMessage = 'Document not saved in DB. Something went wrong';
            setError(errorMessage, next, 400);
        }
        else {

            await pool.query(uploadAdminFile,[file_name, file_description, file_format, file_url, email, file_title, privacy], (error, results) => {
                if (error) {                    
                    req.file? deleteFileFromDisk(req.file?.path) : '';
                    setError(error, next, 400);
                }
                else {
                    res.status(201).json({
                        ok: true,
                        message: "Document was saved Successfully with the following information",
                        document: {
                            file_description: file_description,
                            file_title: file_title,
                            file_name: file_name,
                            file_format: file_format,
                            file_url: file_url,   
                            user_email: email
                        }               
                    });
                }
            })
        }
        
    } catch (error) {
        deleteFileFromDisk(req.file?.path || '');
        next(error);
    }
};


/**
 * Upload one file as private file for a user
 * @param req requet object
 * @param res response object
 */
export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { 
            file_title,
            file_name,
            file_description,
            file_format,
            file_url,
            email
        } = req.body;
        if (!file_title || !file_name || !file_description || !file_format || !file_url || !email) {
            req.file? deleteFileFromDisk(req.file?.path) : '';;
            const errorMessage = 'Document not saved in DB. Required fields not provided';
            setError(errorMessage, next, 400);
        }
        else {
           
            await pool.query(uploadOneFile,[file_name, file_description, file_format, file_url, email, file_title], (error, results) => {
                if (error) {                    
                    req.file? deleteFileFromDisk(req.file?.path) : '';
                    setError(error, next, 400);
                }
                else {
                    res.status(201).json({
                        ok: true,
                        message: "Document was saved Successfully",
                        document: {
                            file_description: file_description,
                            file_title: file_title,
                            file_name: file_name,
                            file_format: file_format,
                            file_url: file_url,   
                            user_email: email
                        }               
                    });
                }
            })
        }
        
    } catch (error: any | Error) {
        deleteFileFromDisk(req.file?.path || '');
        setError(error, next, 500);
    }
};

export const getPrivateFilesForOneUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        await pool.query(getPrivateFilesForUser, [email], function (error, results) {
            if (error) {
                setError(error, next, 400);
            }
            else {
                res.status(200).json(results.rows);
            }
        })
    } catch (error) {
        next(error);
    }
}

export const getPublicFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {

        await pool.query(getAllPublicFiles, (error, results) => {
            if (error) {
                setError(error, next, 400);
            }
            else res.status(200).json(results.rows);
        })
        
    } catch (error) {
        next(error);
    }
}

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    const { file_name } = req.body;
    try {
        await res.download(`./public/uploads/${file_name}`, async function (error) {
            if (error) {
                console.log(error);
                next(error);
            } else  {
                await pool.query("UPDATE files SET downloads=downloads+1 WHERE file_name=$1", [file_name], function (error, results) {
                    if (error) {
                        setError(error, next, 400);
                    }
                    else {
                        console.log("file sent");
                    }
                });                
            }
        })
    } catch (error) {
        next(error);
    }
}



export const sendFileAsMail = async (req: Request, res: Response, next: NextFunction) => {
    const {username, fileName, senderEmail, receiverEmail } = req.body;
    try {
        let testAccount = await nodeMailer.createTestAccount();
        const transporter = await nodeMailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "documenthubmailer@gmail.com",
                pass: 'myovcduqfoeamcdp',
            }
        });
        let info = await transporter.sendMail({
            from: `<--| ${senderEmail} |-->`,
            to: `${receiverEmail}`,
            subject: "Sent You a New File From Document Hub",
            text: `You have recieved a new file from ${senderEmail}`,
            html: `<p> You have recieved a new file from ${senderEmail}. The file is attached this mail <br/>Visit <a href="https://documenthub.onrender.com/">Document Hub Store</a> to: <ol><li>Save your files in <b>your private file store</b></li><li>Easily download your saved files</li> <li>Share documents with others via email</li> <li>...and more</li> </ol>  </p>`,
            attachments: [{ path: `./public/uploads/${fileName}`}]
            }, 
            (error, data) => {
                if (error) console.log(error)
                else res.send("Email Sent")
            }
        )

    } catch (error) {
        next(error);
    }
}

export const sendVerificationMail = async (res: Response, token: string, email: string, username: string, next: NextFunction) => {

    try {
        let testAccount = await nodeMailer.createTestAccount();
        const transporter = await nodeMailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "documenthubmailer@gmail.com",
                pass: 'myovcduqfoeamcdp',
            }
        });
        let info = await transporter.sendMail({
            from: 'documenthubmailer@gmail.com',
            to: `${email}`,
            subject: "Account Verification: Documents Hub",
            text: '',
            html: `<div style="margin: auto; padding: 20px; width: 90%; height: auto; border-radius: 8px; border: 1px solid black; background-color: #c2e7ff3d; color: black">
                <p>Hello,</p><br/><br/>
                <p>You recently registered for an account with Documents Hub. To activate your account, kindly click on the link below for account verification</p><b /><b /><b />
                <a href="https://documenthub.onrender.com/verify/${username}/${email}/${token}">documenthub.onrender.com/verify/${username}/${email}/${token}</a><b /><b /><b />
                <p>In case you can not click on the link, copy the link below and paste it in the address bar of your browser</p><b /><b /><b />
                <span>https://documenthub.onrender.com/verify/${username}/${email}/${token}</span>
            </div>`
            }, 
            (error, data) => {
                if (error) next(error)
                else next();
            }
        )

    } catch (error) {
        next(error);
    }
}





