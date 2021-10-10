function getGCD(a, b) {
  if (!b) {
    return a;
  }

  return getGCD(b, a % b);
}

/**
 * JavaScript math is such a fucking broken shit because it sees floats as
 * divisions. Therefore inaccuracies occur. Look at the code to facepalm!
 *
 * Why JavaScript math is broken:
 *
 * https://stackoverflow.com/questions/588004/is-floating-point-math-broken
 *
 * How to implement a workaround:
 *
 * https://stackoverflow.com/questions/12511057/float-sum-with-javascript
 *
 * @param {float} a
 * @param {float} b
 */
function sumFloats(a, b, fractionDigits) {
  if (fractionDigits === undefined) {
    fractionDigits = 1;
  }

  var result = parseFloat(a) + parseFloat(b);
  return result.toFixed(fractionDigits);
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}