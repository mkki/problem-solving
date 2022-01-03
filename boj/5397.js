const input = require('fs').readFileSync(0, 'utf-8').split('\n');

const [_, ...tasks] = input;

for (const task of tasks) {
  (function (password) {
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

    for (const value of password) {
      if (value === '>') {
        if (next[address] !== -1) {
          address = next[address];
        }
      } else if (value === '<') {
        if (previous[address] !== -1) {
          address = previous[address];
        }
      } else if (value === '-') {
        if (previous[address] !== -1) {
          remove(address);
          address = previous[address];
        }
      } else {
        add(address, value);
        address = next[address];
      }
    }

    console.log(traverse());
  })(task);
}
