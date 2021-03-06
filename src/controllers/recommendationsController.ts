import nameValidation from "../validations/nameValidation";
import matchYoutubeUrl from "../validations/linkValidation";
import { Request, Response } from "express";
import * as recommendationsService from "../services/recommendationsService";

export async function addSong(req: Request, res: Response) {
  const { name, youtubeLink } = req.body;
  try {
    if (
      !youtubeLink ||
      !matchYoutubeUrl(youtubeLink) ||
      !nameValidation(name)
    ) {
      return res.sendStatus(400);
    }
    await recommendationsService.addSong(name, youtubeLink);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updateSongScore(req: Request, res: Response) {
  const isUpvote = req.path.includes("upvote");
  const { id } = req.params;
  try {
    const song = await recommendationsService.getSongById(parseInt(id));
    if (!song) return res.sendStatus(400);
    await recommendationsService.updateSongScore(
      parseInt(id),
      isUpvote,
      song.score
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function sendRecommendation(req: Request, res: Response) {
  try {
    const result = await recommendationsService.drawSong();
    if (result === false) return res.sendStatus(404);
    return res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function sendTopSongs(req: Request, res: Response) {
  try {
    const amount  = Number(req.params.amount);
    if(amount <= 0) return res.sendStatus(400);
    const result = await recommendationsService.sendTopSongs(amount);
    if(!result) return res.sendStatus(400);
    res.send(result)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
