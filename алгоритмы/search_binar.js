//заполним массив случайными данными
// найдем индекс в массиве

const range = Array.from({length: 1000000}, (value, index)=> index + 1);
let iter = 0;
const search_binary = (arr, findValue) => {
  iter+=1;
 let low = 0;
 let high = arr.length - 1;
 let mid = Math.floor(high/2);
 if (findValue === arr[mid]) {
   return mid;
 }
 if (arr[mid] >  findValue ) {
   high = mid - 1;
 } else {
   low = mid + 1;
 }
console.log(low, high);

 let new_arr = arr.slice(low,high);
 console.log(new_arr)
  debugger
 return search_binary(new_arr, findValue);

}




function binarySearch(value, list) {

  let first    = 0;                // начальный индекс в массиве
  let last     = list.length - 1;  // конечный индекс
  let position = -1;
  let found    = false;
  let middle;


  while (found === false && first <= last) {
    iter++;
    middle = Math.floor((first + last) / 2);

    if (list[middle] === value) {
      found = true;
      position = middle;
    } else if (list[middle] > value){ // значение в нижней части списка
      last = middle - 1;
    } else {  // значение в верхней части списка
      first = middle + 1;
    }

  }

  return position;

}
let iter2=0;
console.time("biserach");
const result = binarySearch( 999999,range);
console.timeEnd("biserach");

console.time("finderach");
const finder = range.find((item) => { iter2++; return item === 999999});
console.timeEnd("finderach");

console.log('resultat:', result, 'итерация', iter, 'find:' ,finder, 'iter2:', iter2);

