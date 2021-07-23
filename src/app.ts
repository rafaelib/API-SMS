import express from "express";
import cors from "cors";
import * as recommendationsController from "./controllers/recommendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationsController.addSong)
app.post("/recommendations/:id/upvote", recommendationsController.updateSongScore)
app.post("/recommendations/:id/downvote", recommendationsController.updateSongScore)
app.get("/recommendations/random", recommendationsController.sendRecommendation)
app.get("/recommendations/top/:amount", recommendationsController.sendTopSongs)

export default app;
