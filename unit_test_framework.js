/**
 * In the real world a testing framework would be used.
 * For the purposes of the exam I'm choosing to also hand craft
 * a simple testing framework that leaves much to be desired but 
 * gets the job done.
 */

function runAllTests(reportElementId, testRunner) {
  try {
    testRunner(function (expected, testFunction) {
      _runTest(expected, testFunction, reportElementId);
    });
  } catch (e) {
    console.log(e);
    writeResults("<p style=\"color:#FF0000\">ERROR</p>", testRunner, null, e, reportElementId);
  }
}


function writeResults(testResult, testFunction, expected, actual, reportElementId) {
  let table = document.getElementById(reportElementId);
  let row = table.insertRow();
  row.insertCell().innerHTML = testResult;
  row.insertCell().innerHTML = expected;
  row.insertCell().innerHTML = actual;
  row.insertCell().innerHTML = testFunction;
}

function _runTest(expected, testFunction, reportElementId) {

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
  writeResults(testResult, testFunction, expected, actual, reportElementId);
}