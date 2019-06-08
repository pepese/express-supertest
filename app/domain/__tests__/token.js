"use strict";

const Token = require("../token");
const token = new Token();
let temp = null;

describe("token.js", () => {
  test("create token", () => {
    const payload = { id: "1", password: "password" };
    temp = token.create(payload);
    expect(temp).not.toEqual(null);
  });
  test("verify token", () => {
    const payload = token.verify(temp);
    expect(payload.id).toEqual("1");
    expect(payload.password).toEqual("password");
  });
});
