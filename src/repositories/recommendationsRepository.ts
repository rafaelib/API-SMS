import connection from "../database";

export async function addSong(name :string, link :string){
await connection.query(
    `INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2)`,
    [name, link]
);
}
