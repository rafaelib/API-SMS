import pg from "pg";

const {Pool} = pg;

const dbConfig={
    host:process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user:process.env.DB_USER,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD
}

const connection = new Pool(dbConfig);

export default connection;