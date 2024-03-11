const Parser = class {
  constructor(input) {
    this.input = input.trim();
    this.i = 0;
  }

  static parseJSON(input) {
    return new Parser(input).traverse();
  }

  traverse() {
    if (this.i >= this.input.length) {
      return;
    }

    this.skipWhiteSpace();
    const current = this.getCurrent();

    if (current === '{') {
      return this.parseObject();
    } else if (current === '[') {
      return this.parseArray();
    } else if (current === '"') {
      return this.parseString();
    } else if (current === '-' || (current >= '0' && current <= '9')) {
      return this.parseNumber();
    } else {
      return this.parseValue();
    }
  }

  getCurrent() {
    return this.input[this.i];
  }

  progress(count = 1) {
    this.i += count;
  }

  skipWhiteSpace() {
    while (/\s/.test(this.getCurrent())) {
      this.progress();
    }
  }

  hasValue(value) {
    return this.input.startsWith(value, this.i);
  }

  parseObject() {
    const obj = {};

    this.progress();
    this.skipWhiteSpace();
    while (this.getCurrent() !== '}') {
      this.skipWhiteSpace();
      const key = this.parseString();
      this.skipWhiteSpace();

      if (this.getCurrent() !== ':') {
        throw new Error('Invalid JSON');
      }

      this.progress();
      this.skipWhiteSpace();
      const value = this.traverse();
      obj[key] = value;
      this.skipWhiteSpace();

      if (this.getCurrent() === ',') {
        this.progress();
      }
    }

    this.progress();

    return obj;
  }

  parseArray() {
    let arr = [];

    this.progress();
    this.skipWhiteSpace();
    while (this.getCurrent() !== ']') {
      this.skipWhiteSpace();
      const value = this.traverse();
      arr.push(value);
      this.skipWhiteSpace();
      if (this.getCurrent() === ',') {
        this.progress();
      }
    }

    this.progress();

    return arr;
  }

  parseString() {
    let str = '';

    this.progress();
    while (this.getCurrent() !== '"') {
      if (this.getCurrent() === '\\') {
        let escapedString = '';

        this.progress();
        if (this.getCurrent() === 'n') {
          escapedString = '\n';
        } else {
          if (this.getCurrent() === 't') {
            escapedString = '\t';
          } else {
            escapedString = this.getCurrent();
          }
        }
        str += escapedString;
      } else {
        str += this.getCurrent();
      }

      this.progress();
    }

    this.progress();

    return str;
  }

  parseNumber() {
    let number = '';

    while (this.getCurrent() === '-' || (this.getCurrent() >= '0' && this.getCurrent() <= '9')) {
      number += this.getCurrent();
      this.progress();
    }

    if (Number.isNaN(number)) {
      throw new Error('Invalid JSON');
    }

    return Number(number);
  }

  parseValue() {
    let value;

    if (this.hasValue('true')) {
      this.progress(4);
      value = 'true';
    } else if (this.hasValue('false')) {
      this.progress(5);
      value = 'false';
    } else if (this.hasValue('null')) {
      this.progress(4);
      value = 'null';
    } else {
      throw new Error('Invalid JSON');
    }

    return value;
  }
};

const jsonString = `
{
  "string"   :     "string,./{}^^\\"\\"",
  "number": -39994,
  "string{}": "a-b-s",
  "arr": [1, "1", {"a": 1, "b": 2}],
  "obj": {
    "one": 1,
    "nested object": {"a": 1, "b": "ddd"}
  },
  "boolean": true
}
`;

const emptyArrayValueJSONString = `
{
  "a": [
  ]
}`;

const emptJSONString = `
{

}
`;

console.log(Parser.parseJSON(jsonString));
console.log(Parser.parseJSON(emptyArrayValueJSONString));
console.log(Parser.parseJSON(emptJSONString));
