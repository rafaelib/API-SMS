import * as recommendationsRepository from "../repositories/recommendationsRepository";

export async function addSong(name: string, link: string) {
  await recommendationsRepository.addSong(name, link);
  return true;
}

export async function getSongById(id: number) {
  const result = await recommendationsRepository.getSongById(id);
  if (!result) return false;
  return result;
}

export async function updateSongScore(
  id: number,
  isUpvote: boolean,
  score: number
) {
  isUpvote ? score++ : score--;
  if (score > -6) {
    await recommendationsRepository.updateSongScore(id, score);
  } else {
    await recommendationsRepository.deleteSong(id);
  }
}
/*
export async function getAllSongs() {
  const result = await recommendationsRepository.getAllSongs();
  if (result.length === 0) return false;
  return result;
}

export async function getHigherSongs(){
  const result = await recommendationsRepository.getHigherSongs();
  return result;
}*/

export async function drawSong() {
  const higherSongs = await recommendationsRepository.getHigherSongs();
  const lowerSongs = await recommendationsRepository.getLowerSongs();
  const allSongs = await recommendationsRepository.getAllSongs();
  const availableIds = [];
  let drawnId: number;

  if (allSongs.length === 0) return false;

  if (higherSongs.length === 0 || lowerSongs.length === 0) {
    for (let i = 0; i < allSongs.length; i++) {
      availableIds.push(allSongs[i].id);
    }
    drawnId = Math.floor(Math.random() * (Math.floor(allSongs.length - 1) + 1));
    const result = await recommendationsRepository.getSongById(
      availableIds[drawnId]
    );
    return result;
  } else {
    if (Math.random() > 0.3) {
      for (let i = 0; i < higherSongs.length; i++) {
        availableIds.push(higherSongs[i].id);
      }
      drawnId = Math.floor(
        Math.random() * (Math.floor(higherSongs.length - 1) + 1)
      );
      const result = await recommendationsRepository.getSongById(
        availableIds[drawnId]
      );
      return result;
    } else {
      for (let i = 0; i < lowerSongs.length; i++) {
        availableIds.push(lowerSongs[i].id);
      }
      drawnId = Math.floor(
        Math.random() * (Math.floor(lowerSongs.length - 1) + 1)
      );
      const result = await recommendationsRepository.getSongById(
        availableIds[drawnId]
      );
      return result;
    }
  }
}
