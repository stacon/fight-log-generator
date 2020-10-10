const expect = require("expect");

const getNumberBetweenMinAndMax = require("./getNumberBetweenMinAndMax")
  .default;

describe("getNumberBetweenMinAndMax", () => {
  it("return a number within the range", () => {
    // GIVEN
    const randomNumber = getNumberBetweenMinAndMax(1, 3);

    // WHEN
    const validResult = randomNumber >= 1 && randomNumber <= 3;

    // THEN
    expect(validResult).toBeTruthy();
  });
});
