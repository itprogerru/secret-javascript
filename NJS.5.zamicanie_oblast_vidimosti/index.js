// Самое просто замыкание
//const console.assert = require('console.assert');
let value = 'test';
function values() {
  console.assert(value === 'test', "Работает")
}
values();

// по сложнеее
let testValue  = 'test';
let later;
function outerTest() {
  let innterValue = 'test2';
  function inter () {
    console.assert(testValue === 'test', "Проверка глобальной переменой" )
    console.assert(innterValue  === 'test2', "Проверка переменой в функции" )
  }
  later = inter;
}
outerTest();
later();

// имитация закрытых переменных
function imitashion() {
  let feints = 0;
  this.getFeints = function () {
    return feints
  };
  this.add = function () {
    feints ++;
  }
}
let valueTest = new imitashion();
valueTest.add();
console.assert(valueTest.feints === undefined, "Проверка на приватную переменю feints");
console.assert(valueTest.getFeints() === 1, "Значение переменой через функцию");
let valueTest2 = new imitashion();
console.assert(valueTest2.getFeints() === 0, "Значение переменой в другой функции");


// поиск суммы элементов массива с замыканием через рекурсию;
function sumArr (arr) {
  let acc = [];
  this.sum = function(arr2) {
    if (arr2.length === 0) {
      return false;
    }
    acc.push(arr2[0]*2);
    let item = arr2.shift();
    return this.sum(arr2);
  }
  this.sum(arr);
  return acc;
}
const testArr = [1,2,3,4];
const testSumma = testArr.map(item=>item*2);
console.log(sumArr([1,2,3,4]), testSumma);
//console.assert.eq(sumArr(testArr),testSumma, "Умножение на 2")



function animateIt(elementId) {
  let elem = document.getElementById(elementId);
  let tick = 0;
  let timer = setInterval(function(){
    if (tick < 100) {
      elem.style.left = elem.style.top = tick + 'px';
      tick ++;
    } else {
      clearInterval(timer)
      console.assert(tick === 100, 'tick accessed via a closure');
      console.assert(elem, "elemen also accessed via a closure");
      console.assert(timer, 'timer reference also obtainde via');
    }
  }, 10)
}

