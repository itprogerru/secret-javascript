const yoshi = {skulk: true};
const hattory = {sneak: true };
const kuma = {creep: true};

Object.setPrototypeOf(yoshi, hattory);

console.log(yoshi.sneak);
console.assert("sneak" in yoshi );
Object.setPrototypeOf(hattory, kuma);
console.assert("creep" in yoshi );
console.log(yoshi.creep);

console.log(yoshi);

function Ninja () {
  this.swung = false;
  this.swingSword = function() {
    return !this.swung;
  }
  Ninja.prototype.swingSword = function() {
    return this.swung;
  }
}
const ninja = new Ninja();
console.log(ninja);
console.assert(ninja.swingSword(), "called the method, not the prototype method")


// наследование
function Person() {
  Person.prototype.age = function(){}
}
function Man() {}
Man.prototype = new Person();

Object.defineProperties(Man.prototype, "constructor", {
  enumerable: false,
  value: Man,
  writable: true
})

const igor = new Man();
console.assert(igor instanceof Man, "наследуюет прототип от Man" );
console.assert(igor instanceof Person, "наследуюет прототип от Person" );
console.assert(igor instanceof Object, "наследуюет прототип от Object" );
console.assert(typeof igor.age === "function", "есть функция age" );

