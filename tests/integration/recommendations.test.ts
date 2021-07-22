import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import * as recommendationsFactory from "../factories/recommendationsFactory";
import faker from "faker/locale/pt_BR";
import { resetDatabase, endConnection } from "../utils/database";

const agent = supertest(app);

beforeEach(resetDatabase);

describe("POST /recommendations", () => {

  it("should return 400 for undefined link", async () => {
    const body = recommendationsFactory.addSongBody(
      faker.name.title(),
      undefined
    );
    const res = await agent.post("/recommendations").send(body);
    expect(res.status).toEqual(400);
  });
  it("should return 400 for non youtube link", async () => {
    const body = recommendationsFactory.addSongBody(
        faker.name.title(),
        "https://www.globo.com/"
      );
      const res = await agent.post("/recommendations").send(body);
      expect(res.status).toEqual(400);
  });
  it("should return 400 for undefined name", async () => {
    const body = recommendationsFactory.addSongBody(
        undefined,
        "https://www.youtube.com/watch?v=zeWNULP82SI&ab_channel=BoleiragemGols"
      );
      const res = await agent.post("/recommendations").send(body);
      expect(res.status).toEqual(400);  
  });
  it("should return 400 for empty name", async () => {
    const body = recommendationsFactory.addSongBody(
        "",
        "https://www.youtube.com/watch?v=zeWNULP82SI&ab_channel=BoleiragemGols"
      );
      const res = await agent.post("/recommendations").send(body);
      expect(res.status).toEqual(400);  
  });

  it("should return 201 for valid body", async () => {
    const body = recommendationsFactory.addSongBody(
      faker.name.title(),
      "https://www.youtube.com/watch?v=zeWNULP82SI&ab_channel=BoleiragemGols"
    );
    const res = await agent.post("/recommendations").send(body);
    expect(res.status).toEqual(201);
  });

});

afterAll(endConnection);
