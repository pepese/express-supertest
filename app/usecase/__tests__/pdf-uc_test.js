"use strict";

const pdfUC = require("../pdf-uc");

describe("token.js", () => {
  test("create token", async () => {
    return expect(await pdfUC.getPdf()).not.toEqual(null);
  });
});
