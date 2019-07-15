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



//Статистические методы в es6

class NinjsClass {
  constructor (name,level) {
    this.name = name;
    this.level= level;
  }
  swingSword() {
    return true;
  }

  static compare(ninja1,ninjs2) {
    return ninja1.level - ninjs2.level;
  }
}

const ninja1 = new NinjsClass("Youshi", 4);
const ninja2 = new NinjsClass("Hatori", 3);

console.assert(!("compare" in ninja1) && !("compare" in ninja2), "A ninja instance doesnt know hot to compare");
console.assert(NinjsClass.compare(ninja1,ninja2)>0, "Класс имеет внутренее свойство compare");
console.assert(!("swingSword" in NinjsClass), "Клсаа не имеет данного свойства");

//Преобразовать код

class Warrior {
  constructor (weapon) {
    this.weapon = weapon;
  }
  wield() {
    return "Wielding" + this.weapon
  }
  static duel (war1, war2) {
    return war1.wield() +" "+ war2.wield();
  }
}

function Warrior (weapon) {
  this.weapon = weapon;
  Warrior.prototype.wield = function() {
    return "Wielding" + this.weapon
  }
  Warrior.duel = function (war1, war2) {
    return war1.wield() +" "+ war2.wield();
  }

}
