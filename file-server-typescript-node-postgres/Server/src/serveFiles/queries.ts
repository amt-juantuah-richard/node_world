// files queries
export const getAllFiles = 'SELECT * FROM files';


// users queries
export const getAllUsers = 'SELECT * FROM users';
export const getAdmin = 'SELECT * FROM users WHERE id=$1 AND isadmin=\'t\'';