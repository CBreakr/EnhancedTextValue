
//
// tests for parsing and running calculations
//

const EnhancedTextValue = require("./EnhancedTextValue");

describe("calculation tests", () => {
  test("no calculations", () => {
    runTest(
      "aaaa bbb ccc",
      "aaaa bbb ccc"
    );
  });

  test("one addition", () => {
    runTest(
      "aaaa2+1+3bbb",
      "aaaa6bbb"
    );
  });

  test("one subtraction", () => {
    runTest(
      "aaaa2-1-3bbb",
      "aaaa-2bbb"
    );
  });

  test("subtract negative", () => {
    runTest(
      "aaaa2--1-3bbb",
      "aaaa0bbb"
    );
  });

  test("two additions", () => {
    runTest(
      "aaaa2+1+3bbb10.1-2.32ddd",
      "aaaa6bbb7.78ddd"
    );
  });

  test("negative to start", () => {
    runTest(
      "-1+1",
      "0"
    );
  });

  test("add a negative", () => {
    runTest(
      "2+-1",
      "1"
    );
  });

  test("invalid negative", () => {
    runTest(
      "2+ - 1",
      "2+ - 1"
    );
  });

  test("invalid expression", () => {
    runTest(
      "aaaa2++1+bbb",
      "aaaa2++1+bbb"
    );
  });

  test("misleading numbers", () => {
    runTest(
      "aaaa2.1.2+1.33.12bbb",
      "aaaa2.2.53.12bbb"
    );
  });
});

function runTest(startString, matchString){
  const etext = new EnhancedTextValue(startString);
  expect(etext.getValue()).toBe(matchString);
}
