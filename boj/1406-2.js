/**
 * Simple Linked List
 */
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [values, _, ...tasks] = input;

const data = [-1];
const previous = [-1];
const next = [-1];
let index = 1;

const add = (address, value) => {
  data[index] = value;
  previous[index] = address;
  next[index] = next[address];

  if (next[address] !== -1) {
    previous[next[address]] = index;
  }

  next[address] = index;

  index++;
};

const remove = (address) => {
  next[previous[address]] = next[address];
  if (next[address] !== -1) {
    previous[next[address]] = previous[address];
  }
};

const traverse = () => {
  let result = '';
  let current = next[0];

  while (current !== -1) {
    result += data[current];
    current = next[current];
  }

  return result;
};

let address = 0;

for (const value of values.split('')) {
  add(address, value);
  address = next[address];
}

for (const task of tasks) {
  const [command, value] = task.split(' ');

  if (command === 'P') {
    add(address, value);
    address = next[address];
  } else if (command === 'L') {
    if (previous[address] !== -1) {
      address = previous[address];
    }
  } else if (command === 'D') {
    if (next[address] !== -1) {
      address = next[address];
    }
  } else {
    if (previous[address] !== -1) {
      remove(address);
      address = previous[address];
    }
  }
}

console.log(traverse());
