
//
// tests for replacing potentially harmful
// tags and attributes
//

const EnhancedTextValue = require("./EnhancedTextValue");

describe("script tag tests", () => {

  test("no tags", () => {
    runTest(
      "lorem ipsum blah blah blah",
      "lorem ipsum blah blah blah"
    );
  });

  test("simple single script tag", () => {
    runTest(
      "<script>AAAAA</script>",
      "<code>AAAAA</code>"
    );
  });

  test("multiple script tags", () => {
    runTest(
      "<script>AAAAA</script> BBB CC <script> DDDD </script>",
      "<code>AAAAA</code> BBB CC <code> DDDD </code>"
    );
  });

  test("non-script tag", () => {
    runTest(
      "<a href='g.com'>AAAAA</a>",
      "<a href='g.com'>AAAAA</a>"
    );
  });

  test("misleading non-script tag", () => {
    runTest(
      "<ascript href='g.com'>AAAAA</a>",
      "<ascript href='g.com'>AAAAA</a>"
    );
  });

  test("script tag with spaces", () => {
    runTest(
      "<  script>AAAAA</  script>",
      "<code>AAAAA</code>"
    );
  });

  test("unclosed script tag", () => {
    runTest(
      "<script>AAAAA",
      "<code>AAAAA"
    );
  });
});

describe("inline event handlers tests", () => {
  test("onClick in tag", () => {
    runTest(
      "<a href='link' onClick='blah' style='blah'>LINK</a>",
      "<a href='link'>LINK</a>"
    );
  });

  test("onClick NOT in tag", () => {
    const startString = "aaaa onClick='blah' bbb";
    const matchString = "aaaa onClick='blah' bbb";
    const etext = new EnhancedTextValue(startString);
    expect(etext.getValue()).toBe(matchString);
  });
});

function runTest(startString, matchString){
  const etext = new EnhancedTextValue(startString);
  expect(etext.getValue()).toBe(matchString);
}
