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

export async function upvoteSong(req: Request, res: Response) {
  try {
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
