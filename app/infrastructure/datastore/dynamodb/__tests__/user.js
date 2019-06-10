"use strict";

const UserRepository = require("../user");
const repository = new UserRepository();

describe("user.js", () => {
  test("Table Creation Error", async () => {
    try {
      const result = await repository.createTable();
      expect(result).toEqual(null);
    } catch (e) {
      expect(e.name).toEqual("ResourceInUseException");
      expect(e.message).toEqual("Cannot create preexisting table");
    }
  });
  test("createUser", async () => {
    try {
      const result = await repository.createUser("1", "Ichiro");
      expect(result).not.toEqual(null);
    } catch (e) {
      console.log("error: %s", e);
    }
  });
  test("createUser error", async () => {
    try {
      const result = await repository.createUser("1", "Ichiro");
      expect(result).toEqual(null);
    } catch (e) {
      console.log("error.name: %s", e.message);
      expect(e).not.toEqual(null);
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
