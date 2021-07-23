import connection from "../database";

export async function addSong(name: string, link: string) {
  await connection.query(
    `INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2)`,
    [name, link]
  );
}

export async function getSongById(id: number) {
  const result = await connection.query(
    `SELECT * FROM recommendations WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function updateSongScore(id: number, score: number) {
  await connection.query(
    `
    UPDATE recommendations
    SET score=$2
    WHERE id=$1
    `,
    [id, score]
  );
}

export async function deleteSong(id: number) {
  await connection.query(
    `
        DELETE FROM recommendations WHERE id=$1
    `,
    [id]
  );
}

export async function getAllSongs() {
  const result = await connection.query(`SELECT * FROM recommendations`);
  return result.rows;
}

export async function getHigherSongs() {
  const result = await connection.query(
    `SELECT * FROM recommendations WHERE score > 10`
  );
  return result.rows;
}

export async function getLowerSongs() {
  const result = await connection.query(
    `SELECT * FROM recommendations WHERE score < 10`
  );
  return result.rows;
}
