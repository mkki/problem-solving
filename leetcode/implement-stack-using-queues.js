
var MyStack = function() {
    this.stack = [];
    this.current = 0;
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.stack[this.current++] = x;
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    if (this.current > 0) {
      this.stack = this.stack.slice(0, this.current);
      return this.stack[--this.current];
    }

    return null;
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.stack[this.current - 1];
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.current === 0;
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */