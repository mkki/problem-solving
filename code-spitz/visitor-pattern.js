const Task = class {
  constructor(title, date) {
    this._title = title;
    this._date = date;
    this._isComplete = false;
    this._list = [];
  }
  isComplete () {
    return this._isComplete
  }
  toggle() {
    this._isComplete = !this._isComplete;
  }
  add(title, date = null) {
    this._list.push(new Task(title, date));
  }
  remove(task){
    const list = this._list;
    if (list.includes(task)) {
      list.splice(list.indexOf(task), 1);
    }
  }
  byTitle(stateGroup = true) {
    return this.list('title', stateGroup);
  }
  byDate(stateGroup = true) {
    return this.list('date', stateGroup);
  }
  list(sort, stateGroup = true) {
    const list = this._list;
    const f = (a, b) => a[sort] > b[sort];
    const map = task => task.list(sort, stateGroup);
    return {
      task: this,
      list: !stateGroup ? [...list].sort(f).map(map) : [
        ...list.filter(v => !v.isComplete()).sort(f).map(map),
        ...list.filter(v => v.isComplete()).sort(f).map(map)
      ]
    }
  }
};

const el = (tag, attr = {}) => Object.entries(attr).reduce((el, v) => {
  typeof el[v[0]] === 'function' ? el[v[0]](...v[1]) : (el[v[0]] = v[1]);
  return el;
}, document.createElement(tag));


const Renderer = class {
  constructor(visitor) {
    this.visitor = visitor;
  }

  render({ task, list }) {
    const v = this.visitor.folder(task);
    if (list.length === 0) return;
    this.subTask(this.visitor.parent(v, task), list);
  }

  subTask(parent, list) {
    list.forEach(({ task, list }) => {
      const v = this.visitor.task(parent, task);
      if (list.length === 0) return;
      this.subTask(this.visitor.parent(v, task), list);
    });
  }
}

const Visitor = class {
  folder(task) { throw 'override'; }
  parent(v, task) { throw 'override'; }
  task(v, task) { throw 'override'; }
}

const DOMVisitor = class extends Visitor {
  constructor(parent) {
    super();
    this._parent = parent;
  }

  toggle(task, statusElement) {
    task.toggle();
    statusElement.innerHTML = task.isComplete() ? '완료' : '미완료';
  }

  folder(task) {
    const parent = document.querySelector(this._parent);
    parent.innerHTML = '';
    parent.appendChild(el('h1', { innerHTML: task._title }));
    return parent;
  }

  parent(v, _) {
    return v.appendChild(el('ul'));
  }

  task(v, task) {
    const li = v.appendChild(el('li'));
    const toggleButton = el('button', {
      innerHTML: task.isComplete() ? '완료' : '미완료',
      setAttribute: ['type', 'button'],
      addEventListener: ['click', () => this.toggle(task, toggleButton)]
    });
    li.appendChild(el('div', { innerHTML: task._title }));
    li.appendChild(toggleButton);
    return li;
  }
}

const folder = new Task('s3-4');
folder.add('b');
folder.add('c');
folder.add('a');
const { list } = folder.list('title');
list[1].task.add('ppt정리');
list[1].task.add('코드정리');
const { list: sublist } = list[1].task.list('title');
sublist[1].task.add('슬라이드마스터 정리');
sublist[1].task.add('디자인개선');

const todo = new Renderer(new DOMVisitor('#a'));
todo.render(folder.list('title'));
