import pg from "pg";

const {Pool} = pg;

const dbConfig={
    host:"localhost",
    port: 5432,
    user:"postgres",
    database:"sms",
    password:"123456"
}

const connection = new Pool(dbConfig);

export default connection;