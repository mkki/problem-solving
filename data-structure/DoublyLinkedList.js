class Node {
  constructor(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }

    this.length += 1;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;

    return this;
  }

  insert(index, value) {
    if (index < 0 || index > this.length + 1) {
      return this;
    }

    const newNode = new Node(value);

    if (index === 0) {
      this.prepend(value);

      return this;
    }

    if (index === this.length) {
      this.append(value);

      return this;
    }

    let previousNode = this.head;

    for (let i = 0; i < index - 1; i++) {
      previousNode = previousNode.next;
    }

    let nextNode = previousNode.next;

    previousNode.next = newNode;
    newNode.previous = previousNode;
    newNode.next = nextNode;
    nextNode.previous = newNode;

    this.length += 1;

    return this;
  }

  remove(index) {
    if (index < 0 || index > this.length) {
      return this;
    }

    if (index === 0) {
      this.head = this.head.next;
      this.head.previous = null;

      this.length -= 1;

      return this;
    }

    if (index === this.length - 1) {
      this.tail = this.tail.previous;
      this.tail.next = null;
      this.length -= 1;

      return this;
    }

    let previousNode = this.head;

    for (let i = 0; i < index - 1; i++) {
      previousNode = previousNode.next;
    }

    let deleteNode = previousNode.next;
    let nextNode = deleteNode.next;

    previousNode.next = nextNode;
    nextNode.previous = previousNode;

    this.length -= 1;

    return this;
  }
}
