"use strict";

const UserRepository = require("../user-repo-impl");
const repository = new UserRepository();
let tmpID;

describe("app/infrastructure/datastore/mongodb/user-repo-impl.js", () => {
  // 該当データが存在しない場合はエラーではなく空データが返却される
  test("getUser miss match", async () => {
    try {
      const result = await repository.getUser("1");
      expect(result).toEqual({});
    } catch (e) {
      console.log("error.name: %s", e.name);
      console.log("error.message: %s", e.message);
      throw e;
    }
  });
  test("createUser", async () => {
    try {
      const result = await repository.createUser("Ichiro");
      tmpID = result._id;
      expect(result).not.toEqual(null);
    } catch (e) {
      console.log("error.name: %s", e.name);
      console.log("error.message: %s", e.message);
      throw e;
    }
  });
  test("getUser match", async () => {
    try {
      const result = await repository.getUser(tmpID);
      expect(result).toEqual({__v: 0, _id: tmpID, name: "Ichiro" });
      // expect(result["_id"]).toEqual(tmpID);
      // expect(result.name).toEqual("Ichiro");
    } catch (e) {
      console.log("error.name: %s", e.name);
      console.log("error.message: %s", e.message);
      throw e;
    }
  });
});
