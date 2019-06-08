"use strict";

const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require("../user-schema");
const validate = ajv.compile(schema);

describe("user.json", () => {
  test("check OK", () => {
    const data = { id: "1", name: "ichiro" };
    const valid = validate(data);
    expect(valid).toEqual(true);
    //if (!valid) console.log(validate.errors);
  });
  test("check NG", () => {
    const data = { id: 1, name: "ichiro" };
    const valid = validate(data);
    expect(valid).toEqual(false);
  });
});
