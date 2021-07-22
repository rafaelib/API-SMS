import connection from "../../src/database";

export async function resetDatabase(){
    await connection.query('TRUNCATE recommendations RESTART IDENTITY')
}

export async function endConnection () {
    await connection.end();
}