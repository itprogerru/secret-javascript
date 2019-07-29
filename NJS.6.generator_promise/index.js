// generator simple

function* TestGenerator() {
  yield "test1";
  yield "test2";
}

function* TestGenerator2() {
  yield "test3";
  yield "test4";
}

for ( let item of TestGenerator()) {
  console.log(item);
  console.assert(item !== undefined, item);
}
const testIterator  = TestGenerator();

const result1 = testIterator.next();
console.log(result1);
console.assert(typeof result1 === "object" && result1.value === 'test1' && !result1.done, "test1 получен" )

const result2 = testIterator.next();
console.log(result2);
console.assert(typeof result2 === "object" && result2.value === 'test2' && !result2.done, "test2 получен" )

const result3 = testIterator.next();
console.log(result3);
console.assert(typeof result3 === "object" && result3.value === undefined && result3.done, "Больше нет" )

const testIterator2  = TestGenerator();
let item2;
while(!(item2 = testIterator2.next()).done) {
  console.log(item2);
  console.assert(item2 !== null, item2.value);
}


function* FunGenAll() {
  yield* TestGenerator();
  yield* TestGenerator2();
}
for ( let item of FunGenAll()) {
  console.log(item);
  console.assert(item !== undefined, item);
}

// Генерирование уникального генератора
function *IdGenerator() {
  let id =0;
  while(true){   // тут бесконечный цикл как только доходит до yield цикл останавливаеться
    yield ++id;
  }
}
const idIterator = IdGenerator();

const arrElement = Array.from({length: 2}, (value, index)=> { return { id: idIterator.next().value}});
console.log(arrElement);
arrElement.forEach((item, i) => {
  console.log(item.id, i+1);
  console.assert(item.id === i+1, 'Проверка на совподение индекса');
})


// обход dom дерева
function traverseDom (element, callback) {
  callback(element);
  element = element.firstElementChild;
  while (element) {
    traverseDom(element, callback);
    element = element.nextElementSibling;
  }
}
const subTree = document.getElementById("subTree");
traverseDom(subTree, function (element){
  console.log(element.nodeName);
  console.assert(element !== null, element.nodeName);
  })

function* Domtraverse (element) {
  yield element;
  element = element.firstElementChild;
  while (element) {
    yield* Domtraverse(element);
    element = element.nextElementSibling;
  }
}

for (let elem of Domtraverse(subTree)) {
  console.log(elem.nodeName);
  console.assert(elem !== null, elem.nodeName);
}


// передача параметорв
function* ActionsGenerator(action) {
  const imposter = yield ("Кто то сделал " + action);
  // Строковое значение удар задаетсья в качестве значения всего выражения yield в целом поэтому imposter второй раз будет иметь значение Пинок
  const imposter2 = yield ("Кто то ответил ("+ imposter + ") на " + action);
  yield ("Кто то всем ("+ imposter2 + ") на " + imposter + " и " + action);
}
const ninjaGenerator = ActionsGenerator("Пинок");
const action1 = ninjaGenerator.next();
console.log(action1.value);
const action2 = ninjaGenerator.next("Удар");
console.log(action2.value);
const action3 = ninjaGenerator.next("Пизды дал");
console.log(action3.value);



// обещания
const ninjaPromise = new Promise(resolve, reject) => {
  resolve("Hattori");
  // reject(" An error resolving a promise")
}

ninjaPromise.then(ninja => {console.assert(ninja === 'Hattori')}, err => {fail("Общение не выполненолсь")};


function getJson (url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () { // Зарегестрировать обработчик собыий загрузки, который будет вызываться если сервер ответит на запрос
      try {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject (this.status + " " +this.statusText);
        }
      } catch (e) {
        reject(e.message)
      }
    }
   request.onerror = function () { // отклонить обещание если при обменен данными с сервером возникает ошибка
     reject (this.status + " " +this.statusText);
   }
   request.send(); // отправить запрос
  })
}

// цепочка обещаний
getJson("test.json")
  .then(item => getJson(item.url))
  .then(item2 => getJson(item2.url))
  .catch(e => console.log(e))

Promise.all([getJson("test.json"),getJson("test2.json")])
  .then(result =>  {const [result1, result2] = result; console.log(result)})

// генераторы и обещания для примера
async(function* () {
  try {
    const respon1 = yield getJson("test.json");
    const respons2 = yield getJson("test.json");
  }catch (e) {

  }
})
function async (generator) {
  var iterator = generator();
  function handle (iteratorResult) {
    if (iteratorResult.done) {return ;}
    const  iteratorValue = iteratorResult.value;
    if (iteratorValue instanceof Promise) {
      iteratorValue.then(res => handle(iterator.next(res)))
        .catch(err => iterator.throw(err))
    }
  }
  try {
    handle(iterator.next());
  }
  catch (e) {
    iterator.throw(e);
  }
}

function promiseAll (promises) {
  return new Promise((resolve,reject) => {
    const result = [];
    let complete = 0;
    promises.forEach(promise => {
      Promise.resolve(promise).then(response => {
        complete++;
        result[complete] = response;
        if (complete === promises.length) {
          resolve(result)
        }
      }).catch(error => reject(error))
    })
  })
}

const rPromiseAll = (promises) => {
}

const all = (...promises) => {
  const results = [];
  const merged = promises.reduce((acc, promise) => acc.then(() => promise).then(response => results.push(response)),Promise.resolve(null))
  return merged.then(()=> results);
}


Promise.all([
  fetch('/api/a'),
  fetch('/api/b'),
  fetch('/api/c')
]).then([responseA, responseB, responseC] => {
  // Use the responses from all three async requests.
});

/**
 * Итеративный метод
 * @param values
 * @return {Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>}
 */
Promise.all = function promiseAllIterative(values) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    values.forEach((value, index) => {
      Promise.resolve(value).then(result => {
        results[index] = result;
        completed += 1;

        if (completed === values.length) {
          resolve(results);
        }
      }).catch(err => reject(err));
    });
  });
}

/**
 * Рекурсивный метод
 * @param values
 * @return {Promise<Array>|Promise<any[] | Array>}
 */
Promise.all = function promiseAllRecursive(values) {
  // Base case.
  if (values.length === 0) {
    return Promise.resolve([]);
  }

  const [first, ...rest] = values;

  // Calling Promise.resolve on the first value because it could
  // be either a Promise or an actual value.
  return Promise.resolve(first).then(firstResult => {
    return promiseAllRecursive(rest).then(restResults => {
      return [firstResult, ...restResults];
    });
  });
}
/**
 * Reducer Solution
 * @param values
 * @return {*}
 */
Promise.all = function promiseAllReduce(values) {
  return values.reduce((accumulator, value) => {
    return accumulator.then(results => {
      return Promise.resolve(value).then(result => {
        return [...results, result];
      });
    });
  }, Promise.resolve([]));
}
