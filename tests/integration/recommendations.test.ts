import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import * as recommendationsFactory from "../factories/recommendationsFactory";
import faker from "faker/locale/pt_BR";
import { resetDatabase, endConnection } from "../utils/database";
import * as recommendationsRepository from "../../src/repositories/recommendationsRepository";

const agent = supertest(app);

beforeEach(resetDatabase);

describe("POST /recommendations", () => {
  it("should return 400 for undefined link", async () => {
    const body = recommendationsFactory.addSongBody(
      faker.name.title(),
      undefined
    );
    const result = await agent.post("/recommendations").send(body);
    expect(result.status).toEqual(400);
  });
  it("should return 400 for non youtube link", async () => {
    const body = recommendationsFactory.addSongBody(
      faker.name.title(),
      "https://www.globo.com/"
    );
    const result = await agent.post("/recommendations").send(body);
    expect(result.status).toEqual(400);
  });
  it("should return 400 for undefined name", async () => {
    const body = recommendationsFactory.addSongBody(
      undefined,
      "https://www.youtube.com/watch?v=zeWNULP82SI&ab_channel=BoleiragemGols"
    );
    const result = await agent.post("/recommendations").send(body);
    expect(result.status).toEqual(400);
  });
  it("should return 400 for empty name", async () => {
    const body = recommendationsFactory.addSongBody(
      "",
      "https://www.youtube.com/watch?v=zeWNULP82SI&ab_channel=BoleiragemGols"
    );
    const result = await agent.post("/recommendations").send(body);
    expect(result.status).toEqual(400);
  });

  it("should return 201 for valid body", async () => {
    const body = recommendationsFactory.addSongBody(
      faker.name.title(),
      "https://www.youtube.com/watch?v=zeWNULP82SI&ab_channel=BoleiragemGols"
    );
    const result = await agent.post("/recommendations").send(body);
    expect(result.status).toEqual(201);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  beforeEach(recommendationsFactory.populateRecommendations);
  afterEach(resetDatabase);

  it("should return 200 for valid id", async () => {
    const result = await agent.post("/recommendations/1/downvote");
    expect(result.status).toEqual(200);
  });

  it("should return 400 for invalid id", async () => {
    const result = await agent.post("/recommendations/100/downvote");
    expect(result.status).toEqual(400);
  });

  it("should decrease the score of the item with given id", async () => {
    await agent.post("/recommendations/1/downvote");
    const result = await connection.query(`SELECT * FROM recommendations`);

    expect(result.rows[0].score).toEqual(-1);
  });

  it("should delete the item if score is lesser than -5", async () => {
    await recommendationsRepository.updateSongScore(1, -5);
    await agent.post("/recommendations/1/downvote");
    const result = await connection.query(`SELECT * FROM recommendations`);
    expect(result.rows.length).toEqual(0);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  beforeEach(recommendationsFactory.populateRecommendations);
  afterEach(resetDatabase);

  it("should return 200 for valid id", async () => {
    const result = await agent.post("/recommendations/1/upvote");
    expect(result.status).toEqual(200);
  });

  it("should return 400 for invalid id", async () => {
    const result = await agent.post("/recommendations/100/upvote");
    expect(result.status).toEqual(400);
  });

  it("should decrease the score of the item with given id", async () => {
    await agent.post("/recommendations/1/upvote");
    const result = await connection.query(`SELECT * FROM recommendations`);

    expect(result.rows[0].score).toEqual(1);
  });
});

describe("GET /recommendations/random", () => {
  it("should return 404 if table is empty", async () => {
    const result = await agent.get("/recommendations/random");

    expect(result.status).toEqual(404);
  });

  it("should return recommendation if there's a row in the table", async () => {
    const body = await recommendationsFactory.populateRecommendations();
    const result = await agent.get("/recommendations/random");

    expect(result.body).toEqual(body);
  });
});

describe("GET /recommendations/random", () => {
  it("should return 404 if table is empty", async () => {
    const result = await agent.get("/recommendations/random");

    expect(result.status).toEqual(404);
  });

  it("should return recommendation if there's a row in the table", async () => {
    const body = await recommendationsFactory.populateRecommendations();
    const result = await agent.get("/recommendations/random");

    expect(result.body).toEqual(body);
  });
});

describe("GET /recommendations/random", () => {
  it("should return 400 if invalid amount", async () => {
    const result = await agent.get("/recommendations/top/0");

    expect(result.status).toEqual(400);
  });

  it("should return 400 if amount is greater than the number of recommendations", async () => {
    await recommendationsFactory.populateRecommendations();
    const result = await agent.get("/recommendations/top/2");

    expect(result.status).toEqual(400);
  });

  it("should return proper number of recommendations for given amount", async () => {
    await recommendationsFactory.populateRecommendations();
    await recommendationsFactory.populateRecommendations();
    await recommendationsFactory.populateRecommendations();

    const result = await agent.get("/recommendations/top/2");
    expect(result.body.length).toEqual(2);
  });
});

afterAll(endConnection);
