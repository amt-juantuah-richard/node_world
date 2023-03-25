import { Pool } from 'pg';

export default new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'filesdb',
    password: 'postgres',
    port: 5432
})