/**
 * In the real world a testing framework would be used.
 * For the purposes of the exam I'm choosing to also hand craft
 * a simple testing framework that leaves much to be desired but 
 * gets the job done.
 */

function runTest(expected, testFunction) {

  let actual = testFunction();
  let metExpectations = false;
  if (expected instanceof Function) {
    metExpectations = expected(actual);
  } else {
    metExpectations = actual == expected;
  }
  let testResult;
  if (metExpectations) {
    testResult = "<p style=\"color:#00FF00\">PASS</p>";
  } else {
    testResult = "<p style=\"color:#FF0000\">FAIL</p>";
  }
  writeResults(testResult, testFunction, expected, actual);
}

function writeResults(testResult, testFunction, expected, actual) {
  let table = document.getElementById("testResults");
  let row = table.insertRow();
  row.insertCell().innerHTML = testResult;
  row.insertCell().innerHTML = expected;
  row.insertCell().innerHTML = actual;
  row.insertCell().innerHTML = testFunction;
}

function runTests() {
  try {
    // test boundaries
    runTest(0, () => multiplyBy321(0));
    runTest(321, () => multiplyBy321(1));
    runTest(-321, () => multiplyBy321(-1));

    // test extremes
    runTest(Math.floor(Number.MAX_SAFE_INTEGER / 321) * 321,
      () => multiplyBy321(Math.floor(Number.MAX_SAFE_INTEGER / 321)));
    runTest(-Math.floor(Number.MAX_SAFE_INTEGER / 321) * 321,
      () => multiplyBy321(-Math.floor(Number.MAX_SAFE_INTEGER / 321)));

    // In javascript NaN == NaN evaluates to false. 
    // So a lambda has to be used instead of a value for the expected result.
    runTest((n) => isNaN(n), () => multiplyBy321(Number.NaN));

    // One might think tha the proper result of multiplying by infinity is infinity,
    // this is wrong because infinity is not a number. 
    // https://math.stackexchange.com/a/36298
    // Note that in javascript, if one were to use the built-in mathematical operator '*' one would get +/- Infinity.
    // I've chosen in the multiplyBy321 function to return what I believe to be the more 'correct' result of 'Nan',
    // but this is largely open to interpretation and context as to which value is actually 'correct'.
    runTest((n) => isNaN(n), () => multiplyBy321(Number.NEGATIVE_INFINITY));
    runTest((n) => isNaN(n), () => multiplyBy321(Number.POSITIVE_INFINITY));

    // test string input 
    runTest(0, () => multiplyBy321("0"));
    runTest(321, () => multiplyBy321("1"));
    runTest(-321, () => multiplyBy321("-1"));

    // random positive integer value testing 
    for(let i=0; i < 5; i++) {
      let randomValue = Math.floor((Number.MAX_SAFE_INTEGER * Math.random()) / 321);
      runTest(321 * randomValue, () => multiplyBy321(randomValue));
    }

    // random negative integer value testing 
    for(let i=0; i < 5; i++) {
      let randomValue = -Math.floor((Number.MAX_SAFE_INTEGER * Math.random()) / 321);
      runTest(321 * randomValue, () => multiplyBy321(randomValue));
    }

    // test floating point numbers
    runTest(321, () => multiplyBy321(1.1));
    runTest(321, () => multiplyBy321(1.9));
    runTest(0, () => multiplyBy321(0.1));
    runTest(0, () => multiplyBy321(0.9));


  } catch (e) {
    writeResults("FAILURE IN TEST FRAMEWORK!");
    console.log(e);
    return "Unexpected error in testing framework: " + e;
  }
}

runTests();