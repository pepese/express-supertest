"use strict";

const app = require("../express");
const request = require("supertest");
//const UserRepository = require("../../datastore/dynamodb/user");
//const repository = new UserRepository();

describe("express.js", () => {
  /*
  beforeAll(async () => {
    try {
      const result = await repository.createTable();
      expect(result.TableDescription.TableStatus).toEqual("ACTIVE");
    } catch (e) {
      console.log("error: %s", e);
    }
  });
  afterAll(async () => {
    try {
      const result = await repository.deleteTable();
      expect(result.TableDescription.TableStatus).toEqual("ACTIVE");
    } catch (e) {
      console.log("error: %s", e);
    }
  });*/
  test("PUT /user", () => {
    return request(app)
      .put("/user")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ id: "2", name: "Jiro" })
      .expect(200);
    //.expect("Content-Type", "application/json; charset=utf-8")
    //.then(response => {
    //  expect(response.body).toEqual({ message: "POST called !" });
    //});
  });
  test("GET /user", () => {
    return request(app)
      .get("/user")
      .query({id: "2"})
      .set("Accept", "application/json")
      .expect(200);
    //.expect("Content-Type", "application/json; charset=utf-8")
    //.expect({ message: "GET called !" });
  });
});
