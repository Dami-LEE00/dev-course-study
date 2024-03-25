let obj1 = {};
let obj2 = { name: 'dami', phone: '010-2222-3333' };

console.log(Object.keys(obj1));   // []
console.log(Object.keys(obj2));   // [ 'name', 'phone' ]

let objKeys = Object.keys(obj2);
// obj1에 값이 존재하면 length가 1 이상이 나옴 or 존재하지 않으면 0
if(objKeys) {
  console.log(true, objKeys.length);    // true 2
} else {
  console.log(false, objKeys.length);
}