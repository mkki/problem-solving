/**
 * 라우팅 테이블을 2단으로 확장하여 저장소별 매핑이 가능한 로더 구현
 */
const Github = class {
  constructor(id, repo) {
    this._base = `https://api.github.com/repos/${id}/${repo}/contents/`;
  }
  load(path) {
    if (!this._parser) return;
    const id = `callback${Github._id++}`;
    const f = (Github[id] = ({ data: { content } }) => {
      delete Github[id];
      document.head.removeChild(s);
      this._parser[0](content, ...this._parser[1]);
    });
    const s = document.createElement('script');
    s.src = `${this._base + path}?callback=Github.${id}`;
    document.head.appendChild(s);
  }
  setParser(f, ...arg) {
    this._parser = [f, arg];
  }
};

Github._id = 0;

const Loader = class {
  constructor() {
    this._router = new Map();
  }
  addRepo(k, id, repo) {
    const git = new Github(id, repo);
    const loaderRouter = new Map();
    this._router.set(k, [git, loaderRouter]);
  }
  addRouter(k, ext, f, ...arg) {
    const [_, loaderRouter] = this._router.get(k);
    ext.split(',').forEach(v => loaderRouter.set(v, [f, ...arg]));
  }
  load(k, v) {
    const [git, loaderRouter] = this._router.get(k);
    const ext = v.split('.').pop();
    if (!loaderRouter.has(ext)) return;
    git.setParser(...loaderRouter.get(ext));
    git.load(v);
  }
};

const el = (el) => document.querySelector(el);

const img = (v, el) => el.src = 'data:text/plain;base64,' + v;

const md = (v, el) => el.innerHTML = d64(v).split('\n').map(v=>{
  let i = 3;
  while(i--){
      if(v.startsWith('#'.repeat(i + 1))) {
          return `<h${i + 1}>${v.substr(i + 1)}</h${i + 1}>`;
      }
  }
  return v;
}).join('<br>');

const d64 = v => decodeURIComponent(
  atob(v).split('').map(
      c =>'%'+('00'+c.charCodeAt(0).toString(16)
  ).slice(-2)).join('')
);

const loader = new Loader();
loader.addRepo('test1', 'mkki', 'test-repo');
loader.addRouter('test1', 'jpg,png,gif', img, el('#a'));
loader.addRouter('test1', 'md', md, el('#b'));

loader.addRepo('test2', 'mkki', 'test-repo-2');
loader.addRouter('test2', 'jpg,png,gif', img, el('#c'));
loader.addRouter('test2', 'md', md, el('#d'));

loader.load('test1', 'test-png.png');
loader.load('test2', 'test-png.png');

setTimeout(() => {
  loader.load('test1', 'md-test.md');
  loader.load('test2', 'md-test.md')
}, 100);
