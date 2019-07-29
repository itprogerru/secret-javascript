// Функция вычисляет сумму произвольнных чисел
const assert = require('assert');

function sum() {
  return Object.entries(arguments)
    .reduce((acc, [key, value]) => acc + value, 0);
}

function sumRest(...rest) {
  return rest.reduce((acc, value) => acc+value, 0)
}

assert(sum(1,2) === 3, "Сумма 2 аргументов 2 + 1");
assert(sum(1,2,3) === 6, "Сумма 2 аргументов 2 + 1");
assert(sum(1,2,3,4) === 10, "Сумма 2 аргументов 2 + 1");
assert(sumRest(1,2) === 3, "Сумма 2 аргументов 2 + 1");
assert(sumRest(1,2,3) === 6, "Сумма 3 аргументов 2 + 1");
assert(sumRest(1,2,3,4) === 10, "Сумма 4 аргументов 2 + 1");


// apply и call

function juggle() {
  let result = 0;
  for (let n = 0; n < arguments.length; n++ ) {
    result += arguments[n];

  }
  this.result = result;
}
const ninja1 = {};
const ninja2 = {};

juggle.apply(ninja1,[1,2,3,4]); //- масив аргументов
juggle.call(ninja2, 5,6,7,8); // список аргументов

console.log(ninja1, ninja2);
assert(ninja1.result === 10, " apply err ");
assert(ninja2.result === 26, " call err ");


// функция foreach
function forEach(list, callback) {
  for (let n =0; n < list.length; n++) {
    callback.call(list[n],n);
  }
}
const weapons = [ { type: 'test1'}, { type: 'test2'}, { type: 'test3'}]

forEach(weapons, function (index) {
  console.log(index);
  assert (this === weapons[index], "got the expected value of "+ weapons[index].type)
})

/*
* forEach своими руками
Теперь, когда вы знаете, как работает forEach, настало время написать функцию, которая делает всё тоже самое. При создании функции each будем руководствоваться тремя правилами:

Функция принимает три аргумента: массив, по которому будет происходить итерация, callback фунцию, которая будет выполнена для каждого элемента массива, и значение, которое будет использовано callback функцией в качестве this.
callback функция, в свою очередь, также работает с тремя аргументами: текущий элемент массива, индекс элемента, ссылка на сам массив.
Функция ничего не возвращает.
Самое очевидное решение: используя цикл for перебрать каждый элемент массива и выполнить передаваемую callback функцию с каждым. Сделать это очень просто:
* */



var each = function(arr, callback, thisArg) {
  var i, length = arr.length;
  for (i = 0; i < length; i = i + 1) {
    callback.call(thisArg, arr[i], i, arr);
  }
};


/*
* map своими руками
Как и при создании аналога forEach напишем небольшие правила, которыми будем руководствоваться при создании функции map:

Функция возвращает новый массив, оставляя исходный без изменений.
Всё, что возвращает callback функция добавляется в новый массив.
Функция принимает три аргумента: массив, по которому будет происходить итерация, callback фунцию, которая будет выполнена для каждого элемента массива, и значение, которое будет использовано callback функцией в качестве this.
callback функция, в свою очередь, также работает с тремя аргументами: текущий элемент массива, индекс элемента, ссылка на сам массив.

* Правил стало больше, но последними двумя мы уже пользовались при создании функции each, а, значит, вы уже знаете, как с ними справиться.
*
* */
var map = function(arr, callback, thisArg) {
  var i, length = arr.length, results = [];
  for (i = 0; i < length; i = i + 1) {
    results.push(callback.call(thisArg, arr[i], i, arr));
  }
  return results;
};
var objMap = {};

var pows = map([10, 20, 30], Math.pow, objMap);
var frameworks = map(['Knockout', 'Backbone', 'Angular'], function(framework) {
  return framework.slice(0, 5);
});

console.log(pows, objMap); // [1,20,900]
console.log(frameworks); // ["Knock","Backb","Angul"]
/**
 * filter своими руками
 *Как и для прошлых функций map и forEach напишем небольшой свод правил:

 Функция возвращает новый массив, оставляя исходный без изменений.
 Данные исходного массива передаются в callback функцию. Результат выполнения callback функции решает будет ли добавлен данный элемент в новый массив.
 Функция принимает три аргумента: массив, по которому будет происходить итерация, callback фунцию, которая будет выполнена для каждого элемента массива, и значение, которое будет использовано callback функцией в качестве this.
 callback функция, в свою очередь, также работает с тремя аргументами: текущий элемент массива, индекс элемента, ссылка на сам массив.
 *
 */

var filter = function(arr, callback, thisArg) {
  var i, length = arr.length, results = [];
  for (i = 0; i < length; i = i + 1) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      results.push(arr[i]);
    }
  }
  return results;
};

/**reduce своими руками
Вы уже знаете — у нас есть правила:

  Функция принимает три аргумента: массив, callback функцию, начальное значение.
  После каждой итерации в промежуточное значение перезаписывается значением, полученным в результате выполнения callback функции. 3.callback функция принимает четыре аргумента: промежуточное значение, текущий элемент массива, индекс элемента, ссылка на сам массив.
  Явно указать значение this нельзя.
 */
var reduce = function(arr, callback, startValue) {
  var i, length = arr.length, result = startValue;
  for (i = 0; i < length; i = i + 1) {
    result = callback.call(null, result, arr[i], i, arr);
  }
  return result;
};

/**
 * Функция дебаунс
 * @param fn
 * @param time
 * @return {Function}
 */
function deb (fn, time) {
  let timer;

  return function (...args) {
    const onComplete = () => {
      fn.apply(args)
      time = null;
    }

    if (timer) {
      clearTimeout(time)
    }
    timer = setTimeout(onComplete, time)
  }
}
