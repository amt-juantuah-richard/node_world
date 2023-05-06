// TABLE SCHEMA & SQL QUERIES

// Create a file type definition
export const fileTypeDefinition = "CREATE TYPE file_type AS ENUM ('private', 'public')";

// CREATING #users# TABLE
export const createUsersTable = "create table users (id uuid DEFAULT uuid_generate_v4(), username varchar(50) unique not null, email varchar(100) unique not null, isAdmin bool not null default 'f', primary key (id, email, username))";

// CREATING #files# TABLE
export const createFilesTable = "create table files (file_id uuid DEFAULT uuid_generate_v4(),file_name varchar(200) not null, file_description varchar(1000) not null, file_format varchar(50) not null, file_url varchar(200) not null, date_added TIMESTAMP default now(), user_email varchar(200) references users(email), privacy file_type default 'private', primary key(file_id))"



// files queries
export const getAllFiles = 'SELECT * FROM files';

export const uploadOneFile = 'INSERT INTO files (file_name, file_description, file_format, file_url, user_email, file_title) VALUES ($1, $2, $3, $4, $5, $6)';

export const uploadAdminFile = 'INSERT INTO files (file_name, file_description, file_format, file_url, user_email, file_title, privacy) VALUES ($1, $2, $3, $4, $5, $6, $7)';

export const getPrivateFilesForUser = 'SELECT * FROM files where user_email=$1 and privacy=\'private\' order by date_added desc';

export const getAllPublicFiles = 'SELECT * FROM files WHERE privacy=\'public\'';


// users queries
export const getAllUsers = 'SELECT * FROM users';
export const getAdmin = 'SELECT * FROM users WHERE id=$1 AND isadmin=\'t\'';
export const getOneUserById = 'SELECT * FROM users WHERE id=$1';
export const getOneUserByEmail = 'SELECT * FROM users WHERE email=$1';
export const getOneUserByIdAndEmail = 'SELECT * FROM users WHERE id=$1 AND email=$2';
export const getOneUserByUsernameAndPassword = 'SELECT * FROM users WHERE username=$1 AND password=$2';
export const getOneUserByUsernameAndEmail = 'SELECT * FROM users WHERE username=$1 AND email=$2';
export const createOneUser = 'INSERT INTO users (username, email, password) values ($1, $2, $3)';
export const deleteOneUser = 'DELETE FROM users WHERE id=$1 AND email=$2 AND password=$3 AND username=$4';
export const updateOneUserPassword = 'UPDATE users SET password=$1 WHERE username=$2 AND email=$3';
export const updateOneUserUsername = 'UPDATE users SET username=$1 WHERE password=$2 AND username=$3';
