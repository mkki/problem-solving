
var MyQueue = function() {
    this.stack = [];
    this.current = 0;
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stack[this.current++] = x;
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (this.current > 0) {
      const front = this.stack[0];
      this.current--;
      this.stack = this.stack.slice(1);
      return front;
    }

    return null;
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (this.current === 0) return null;
    return this.stack[0];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.current === 0;
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */