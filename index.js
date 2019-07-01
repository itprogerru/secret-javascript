//1. Получить длину объекта

const obj = {a:1, b:2, c:3}
const length = Object.keys(obj).length;

//2. Список ключь значение Iterating over an object

const username = {
  first: 'join',
  last: 'ded'
}
// 1 method
for (let key in username) {
  if(username.hasOwnProperty(key)) {
    console.log(key, username[key])
  }
}
// 2 method
Object.entries(username).forEach(([key, value]) => console.log(key, value));

//3. Convert object to array

const person = {name: 'Amy', age: 40};
const arr = [];
Object.keys(person).forEach(key => arr.push([key, person[key]]));
console.log(arr); // [['name', 'Amy'], ['age', 40]];
const resultObjToArr = Object.keys(person).map(key => [key, person[key]]); // [['name', 'Amy'], ['age', 40]];
Object.entries(person) // [['name', 'Amy'], ['age', 40]];


// 4. check if a property exists in object
const user = {
  name: 'john',
  address: {
    street: 'main',
    city: 'Moscow'
  }
}

const property41 = 'name' in user;  console.log(property41) // true
const property42 = 'street' in user;  console.log(property42) // false
const property43 = 'street' in user.address; console.log(property43) // true
const property44 = user.hasOwnProperty('street'); console.log(property44) // true

//5. Prevent Object Properties from Being Added нельзя добавить новое свойство

Object.preventExtensions(user) // запрещает добавлять в объект новое свойство не не запрещает удалять
Object.isExtensible(user)// определяет, является ли объект расширяемым
//5.1 Prevent Object Properties from Being Added/ deleted нельзя добавить или удалить свойство
Object.seal(user) // запрещает добовлять удалять  Object.getOwnPropertyDescriptors  - configurable: false
Object.isSealed(user) // проверяет на configurable
//5.2 Prevent Object Properties from Being Changed At All запрещает удалять модифицировать и добавлять
Object.freeze(user) // запрещает добовлять удалять и модифицирвать  Object.getOwnPropertyDescriptors  - configurable: false, writable: false
Object.isFrozen(user) // проверка на Заммарозку объекта


// 6. Merge Multiple Objects into One Object

const defaultUser = { name: '', email: '', sub: true }
const actualUser = { name: 'test', email: 'test@teest' }
const user2 = {phone: '5555'};
const userData = Object.assign(defaultUser, actualUser); // { name: 'test', email: 'test@teest', sub: true }
const userData2 = Object.assign(defaultUser, actualUser, user2 ); // { name: 'test', email: 'test@teest', sub: true, phone: '5555' }
//spreed
const userData3 = {...defaultUser, ...actualUser}; // { name: 'test', email: 'test@teest', sub: true }
const userData4 = {...actualUser, ...defaultUser, }; // { name: '', email: '', sub: true }

// 7. Computed Object Properties Работа с формами

const userNameInput = document.querySelector('[name="username"]')


const state = {}
const onKeyUp = event => {
  const value = event.target.value;
  const name = event.target.name;
  state[name] = value;
}

userNameInput.addEventListener('keyup', onKeyUp);

// 8. Delete or Filter Property of Object Фильтрация объекта на свойства
function filterObj(obj, prop) {
  const filterObj = {};
  Object.keys(obj)
    .filter(key => key !== prop)
    .map(key => filterObj[key] = obj[key]);
  return filterObj;
}

// 9. Get All values in Object вернет массив значений

const name9 = {
  first: 'join',
  last: 'ded'
}

Object.keys(name).map(key => name[key]); // ['join', 'ded']
Object.values(name); // ['join', 'ded']

// 10. Shallow Copy / Clone Array новый массив не ссылка

const fruits = ['apple', 'banana'];
//10.1 slice
const newFruits = fruits.slice(0);
//10.2 concat
const newFruits = [].concat(fruits); // or fruits.concat('cherry') новый элемент
//10.3 spreed
const newFruits = [...fruits]; // or [...fruits, 'chery'] новый элемент

// 11. Get Random Element from Array

const age = [10,21,33,43,543,234, 53]
const randomAge = age[Math.round(Math.random()*ages.length)];

// 12. Remove Falsy Values in Array
//falsy values = values which, when converted to a boolean always become false
//Five falsy values in JS = '', 0, null, undefined, Nan

const temps = [72, 68, 65, undefined, 80, '', 0 ,NaN, null]
const newTemps = temp.filter( temp=> temp); // or .filter(temp=> Boolean(temp));  result: [ 72, 68, 65, 80,]


//13. remove Items from Array
const nums = [48,29, 30];
const removedValue = nums.splice(1,1)  // nums = [ 48, 30] removeValue = [29]
const removedValue2 = nums.slice(1,2) // nums = [ 48, 30] removeValue = [29]
const removedValue3 = nums.splice(1,1, 'new item', '2 item')  // nums = [ 48,  'new item', '2 item', 30] removeValue = [29]
const str = 'hello world'.split('') // разабъет на масив букв ['h', 'l', 'l',.....,'d']
str.splice(0,1); str.splice(str.length - 1, 1); // удалит первую и последнию букву из масива

function removeItems(arr, fn) {
  return nums.filter(fn).map(el => {
    arr.splice(arr.indexOf(el),1);
    return el
  });
}
const res131 = removeItems(nums, num => num> 29); // res131 - [48, 30] nums [29]

// 14. Fill Array with Values

const phoneNumber = '555-525-5234';
const newNumber = phoneNumber.split().filter(num => num !== '-');
newNumber.fill('*', 0 , 2) // ['*','*', '5'..., '4'] or .fill('*', 2) заменит первые 2 символа на звоздочку


//15. Find Certain Element / Index / Indices of Array

const people = ['jouen', 'marthy', 'ded', 'jouen']
function findIndexAll(arr, value) {
  let indices = [];
  arr.forEach((el,i)=> (el === value) && indices.push(i));
  return indices
}
const res150 = people.reduce((acc, value, index) => {if (value === 'jouen') acc.push(index);return acc} , []) // [0,3]
const res151 = findIndexAll(people, 'jouen'); // [0,3]


// 16. Make Range of Numbers within Array
var range = Array.from({length: 2}, (value, index)=> index +1); // [1,2,3] заполнения масива числами


// 17. Get Unique Values in an Array

const peoples = ['jouen', 'marthy', 'ded', 'jouen'];
// filter method
const newUnicPeople = peoples.filter((name, index, array)=> array.indexOf(name) === index ? name : '') // ['jouen', 'marthy', 'ded'];
// set
const newSetUnicPeople = [... new Set(peoples)];  // ['jouen', 'marthy', 'ded'];

// 18. Find Difference Between Two Arrays
const arr181 = ['jouen', 'mdsf', 'sdfdsf', 'tewtewt'];
const arr182 = ['jouen', 'marthy', 'ded', 'jouen'];
[...new Set(arr181)].filter(el=> !arr182.includes(el));

//19. Remove Items from Left / Right Side of Array
function offsetArray(arr, offset) {
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}
offsetArray([1,2,3,4], 2); // [3,4,1,2]

// 20. Find Shared Values Between Two Arrays

const arr_20_1 = ['jouen', 'mdsf', 'sdfdsf', 'tewtewt'];
const arr_20_2 = ['jouen', 'marthy', 'ded', 'jouen'];
const sharedValues = arr_20_2.filter(el=> arr_20_1.includes(el)); // [jouen]

// 21. 'Once' Function
// Отслеживание нажатие функции если нажато то больше нажиматсья не будет

const once = (fn, ...args)=> {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      return fn(...args);
    }
  }
}
const onClick = (text, time)=> console(`${text} at ${time}`);
const button = document.querySelector('button');
button.addEventListener('click', once(onClick, 'form submitted', new Date(Date.now())));

// 22. Measure Time For Function to Run
const getUserData = async (user) => await fetch(`https://api.github.com/user/${user}`);
const time = (fn, ...args )=> {
  console.time('time');
  let result = fn(...args);
  console.timeEnd('time');
  return result;
}
time(()=> getUserData('tom'))


// 23. Check if String Contains Substring
const URL = 'https://api.github.com/user/';
const containsWord = URL.startsWith('https'); // true   есть ещё endsWith с конца слова.


// 24. Capitalize First Word of String с большой буквы первое слово предложения и все слова в предложении
const capitalize = ([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`;
const capitalizeWords = (str) => str.split(' ').map(word => `${word[0].toUpperCase()}${word.slice(0,1)}`).join(' ');

//25. Get Random Integer in Range случайное целое число и дробное
const getRandomInt = (min,max) => Math.round(Math.random()*(max-min) + min);
const getRandomDecimal = (min,max) => Math.random()*(max-min) + min;

