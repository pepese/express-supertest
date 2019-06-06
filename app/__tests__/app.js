"use strict";

const app = require("../app");
const request = require("supertest");

describe("result.ts", () => {
  test("GET /", () => {
    return request(app)
      .get("/")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(200)
      .expect("Content-Type", 'application/json; charset=utf-8')
      .expect({ "message": "GET called !" });
  });
  test("POST /", () => {
    return request(app)
      .post("/")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ hoge: "hoge" })
      .expect(200)
      .expect("Content-Type", 'application/json; charset=utf-8')
      .then(response => {
        expect(response.body).toEqual({ "message": "POST called !" });
      });
  });
});
