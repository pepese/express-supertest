"use strict";

const pdf = require("../pdf");

describe("token.js", () => {
  test("create token", () => {
    return expect(pdf.getPdf()).toEqual("xxx");
  });
});
