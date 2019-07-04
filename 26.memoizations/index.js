const assert = require('assert')

const isPrima = (value) => {
  if (!isPrima.answers) {
    isPrima.answers = {}
  }
  if (isPrima.answers[value] !== undefined) {
    return isPrima.answers[value];
  }
  var prime = value !==0 && value !==1;
  for (var i = 2; i < value; i++) {
    if (value % i === 0) {
      prime= false;
      break
    }
  }
  return isPrima.answers[value] = prime;
}
assert(isPrima(5), "5 is prime");
assert(isPrima.answers[5], "The answer was cached");
