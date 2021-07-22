import express, { Request, Response } from "express";
import cors from "cors";
import * as recommendationsController from "./controllers/recommendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationsController.addSong)
app.post("/recommendations/:id/upvote", recommendationsController.upvoteSong)


export default app;
