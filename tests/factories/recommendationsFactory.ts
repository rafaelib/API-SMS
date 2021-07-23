import connection from "../../src/database";

export function addSongBody(name: string, youtubeLink: string) {
  return { name, youtubeLink };
}

export async function populateRecommendations() {
  const result = await connection.query(
    `
    INSERT 
    INTO recommendations 
    (name,"youtubeLink") 
    VALUES ($1,$2)
    RETURNING *
    `,
    [
      "nome_musica",
      "https://www.youtube.com/watch?v=zeWNULP82SI&ab_channel=BoleiragemGols"
    ]

  );

  return result.rows[0];
}

