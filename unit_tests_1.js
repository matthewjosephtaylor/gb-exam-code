function testExam1() {
  runAllTests("examReport1", (runTest) => {
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
    for (let i = 0; i < 5; i++) {
      let randomValue = Math.floor((Number.MAX_SAFE_INTEGER * Math.random()) / 321);
      runTest(321 * randomValue, () => multiplyBy321(randomValue));
    }

    // random negative integer value testing 
    for (let i = 0; i < 5; i++) {
      let randomValue = -Math.floor((Number.MAX_SAFE_INTEGER * Math.random()) / 321);
      runTest(321 * randomValue, () => multiplyBy321(randomValue));
    }

    // test floating point numbers
    runTest(321, () => multiplyBy321(1.1));
    runTest(321, () => multiplyBy321(1.9));
    runTest(0, () => multiplyBy321(0.1));
    runTest(0, () => multiplyBy321(0.9));

  });

}

testExam1();