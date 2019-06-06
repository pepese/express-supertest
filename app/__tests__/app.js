"use strict";

const app = require("../app");
const request = require("supertest");

describe("result.ts", () => {
  test("get /", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("post /", () => {
    return request(app)
      .post("/")
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ hoge: "hoge" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ "message": "POST!" });
      });
  });
});
