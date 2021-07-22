import * as recommendationsRepository from "../repositories/recommendationsRepository";

export async function addSong (name :string, link :string)  {
    await recommendationsRepository.addSong(name,link);
    return true;
}