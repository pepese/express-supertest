"use strict";

const app = require("../express");
const request = require("supertest");
let auth_token = null;

describe("express.js", () => {
  test("POST /auth", () => {
    return request(app)
      .post("/auth")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ id: "id", password: "password" })
      .expect(200)
      .then(res => {
        auth_token = res.body.token;
      });
  });
  test("PUT /user", () => {
    return request(app)
      .put("/user")
      .set("Authorization", `Bearer ${auth_token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ id: "2", name: "Jiro" })
      .expect(200);
      /* res.locals.id に "id" が入ってるか確認したい！！！
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.locals.id).to.be.equal("id");
          return done();
        });*/
  });
  test("GET /user", () => {
    return request(app)
      .get("/user")
      .set("Authorization", `Bearer ${auth_token}`)
      .set("Accept", "application/json")
      .query({ id: "2" })
      .expect(200);
  });
});
