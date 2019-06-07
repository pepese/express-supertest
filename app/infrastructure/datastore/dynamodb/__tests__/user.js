"use strict";

const UserRepository = require("../user");
const repository = new UserRepository();

describe("user.js", () => {
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
  test("createUser", async () => {
    try {
      const result = await repository.createUser("1", "Ichiro");
      expect(result).not.toEqual(null);
    } catch (e) {
      console.log("error: %s", e);
    }
  });
  test("getUser", async () => {
    try {
      const result = await repository.getUser("1");
      expect(result).toEqual({ id: "1", name: "Ichiro" });
    } catch (e) {
      console.log("error: %s", e);
    }
  });
});
