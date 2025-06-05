import {Pool} from 'pg';

let conn: any;

if(!conn){

   conn= new Pool({
        user: 'br',
        password: 'mysecretpassword',
        host: 'localhost',
        port: 5432,
        database: 'acero'
    });
}

export {conn};