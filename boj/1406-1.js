/**
 * Linked List 정석 구현
 */
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [values, _, ...tasks] = input;

class Node {
  constructor(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    const dummyNode = new Node(-1);

    this.head = dummyNode;
    this.tail = dummyNode;
    this.currentNode = dummyNode;
  }

  add(value) {
    const newNode = new Node(value);

    if (this.currentNode.next === null) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;

      this.currentNode = newNode;

      return;
    }

    const nextNode = this.currentNode.next;

    this.currentNode.next = newNode;
    newNode.previous = this.currentNode;
    newNode.next = nextNode;
    nextNode.previous = newNode;

    this.currentNode = newNode;
  }

  remove() {
    const previousNode = this.currentNode.previous;

    if (this.currentNode.next === null) {
      previousNode.next = null;
      this.tail = previousNode;

      this.currentNode = previousNode;

      return;
    }

    const nextNode = this.currentNode.next;

    previousNode.next = nextNode;
    nextNode.previous = previousNode;

    this.currentNode = previousNode;
  }

  traverse() {
    let result = '';
    let current = this.head.next;

    while (!!current) {
      result += current.value;
      current = current.next;
    }

    return result;
  }
}

const list = new LinkedList();

for (const value of values.split('')) {
  list.add(value);
}

for (const task of tasks) {
  const [command, value] = task.split(' ');

  if (command === 'P') {
    list.add(value);
  } else if (command === 'L') {
    if (list.currentNode.previous !== null) {
      list.currentNode = list.currentNode.previous;
    }
  } else if (command === 'D') {
    if (list.currentNode.next !== null) {
      list.currentNode = list.currentNode.next;
    }
  } else {
    if (list.currentNode.previous !== null) {
      list.remove();
    }
  }
}

console.log(list.traverse());
