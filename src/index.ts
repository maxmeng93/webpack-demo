import person from './person';
console.log(person);

let str: string = '';
str = "2";

const app = document.getElementById('app');
(app as HTMLElement).innerText = '这是一个网页';

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}

const { a, b, ...z } = obj;
console.log(a);
console.log(b);
console.log(z);
