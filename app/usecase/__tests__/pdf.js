"use strict";

const pdf = require("../pdf");

describe("token.js", () => {
  test("create token", async () => {
    return expect(await pdf.getPdf()).not.toEqual(null);
  });
});
