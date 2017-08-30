
/**
 * Multiplies any value that can be parsed into an integer by 321 without / * or loops
 * NOTE: floating point numbers input values converted to integers prior to multiplication
 * @param {*} value
 * returns an integer value
 */
function multiplyBy321(value) {
  return _recursivelyAdd(321, parseInt(value), 0, 0);
}

function _recursivelyAdd(a, b, index, register) {
  if (a == index) {
    return register;
  }
  // ECMAScript 6 has tail call optimization
  return _recursivelyAdd(a, b, index + 1, register + b);
}
