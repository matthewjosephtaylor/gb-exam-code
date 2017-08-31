function createTestData(numItems) {
  let itemsTable = [];
  for (let i = 0; i < numItems; i++) {
    itemsTable.push("Item: " + i);
  }
  return itemsTable;
}

function mockRandomFunction(alwaysReturns) {
  return () => alwaysReturns;
}

/**
 * Returns a random integer between zero and max (inclusive)
 * code borrowed from https://stackoverflow.com/a/1527820/5306554
 */
function getRealRandomInt(max) {
  let min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// relies on unit testing framework found here https://github.com/matthewjosephtaylor/gb-exam-code/blob/master/unit_test_framework.js
function testExam2() {
  runAllTests("examReport2", (runTest) => {

    // test min sized table functionality
    {
      let singleItemTable = createTestData(1);
      runTest(singleItemTable[0], () => randomlyPickItem(mockRandomFunction(0), singleItemTable));

      // test that a correctly implemented randomFunction behaves as expected
      runTest(singleItemTable[0], () => randomlyPickItem(getRealRandomInt, singleItemTable));
    }

    // test large sized table functionality
    {
      // testing with 2 million, spec is unclear and states only 'over a million'.
      // TODO ask what the actual expected maximum size is and make sure test covers it.
      let largeTable = createTestData(2000000);
      runTest(largeTable[0], () => randomlyPickItem(mockRandomFunction(0), largeTable));
      runTest(largeTable[1], () => randomlyPickItem(mockRandomFunction(1), largeTable));
      runTest(largeTable[42], () => randomlyPickItem(mockRandomFunction(42), largeTable));
      runTest(largeTable[largeTable.length - 1], () => randomlyPickItem(mockRandomFunction(largeTable.length - 1), largeTable));

      // test that a correctly implemented randomFunction behaves as expected
      for (let i = 0; i < 5; i++) {
        runTest((item) => largeTable.indexOf(item) != -1, () => randomlyPickItem(getRealRandomInt, largeTable));
      }
    }

    // test bad input to function
    {
      let itemsTable = createTestData(100);

      // null for items table
      runTest((v) => v instanceof Error, () => {
        try {
          return randomlyPickItem(mockRandomFunction(10), null);
        } catch (e) {
          return e;
        }
      });

      // wrong object for items table
      runTest((v) => v instanceof Error, () => {
        try {
          return randomlyPickItem(mockRandomFunction(10), {});
        } catch (e) {
          return e;
        }
      });

      // no items table
      runTest((v) => v instanceof Error, () => {
        try {
          return randomlyPickItem(mockRandomFunction(10));
        } catch (e) {
          return e;
        }
      });

      // no random function
      runTest((v) => v instanceof Error, () => {
        try {
          return randomlyPickItem(null, itemsTable);
        } catch (e) {
          return e;
        }
      });

      // no arguments at all
      runTest((v) => v instanceof Error, () => {
        try {
          return randomlyPickItem();
        } catch (e) {
          return e;
        }
      });

    }

  });

}

testExam2();