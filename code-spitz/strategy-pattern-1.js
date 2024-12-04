/**
 * 상속 위임의 전략 클래스 구현
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
      this._parser(content);
    });
    const s = document.createElement('script');
    s.src = `${this._base + path}?callback=Github.${id}`;
    document.head.appendChild(s);
  }
  setParser(loader) {
    this._parser = loader.parse.bind(loader);
  }
};

Github._id = 0;

const Loader = class {
  constructor(el) {
    this._el = document.querySelector(el);
  }

  parse(v) {
    console.log(this);
    this._parse(v);
  }

  _parse(v) {
    throw 'must be overridden';
  }
};

const ImageLoader = class extends Loader {
  _parse(v) {
    this._el.src = 'data:text/plain;base64,' + v;
  }
};

const MdLoader = class extends Loader {
  _parse(v) {
    this._el.innerHTML = this._d64(v)
      .split('\n')
      .map(v => {
        let i = 3;
        while (i--) {
          if (v.startsWith('#'.repeat(i + 1))) {
            return `<h${i + 1}>${v.substring(i + 1)}</h${i + 1}>`;
          }
        }
        return v;
      })
      .join('<br>');
  }
  _d64(v) {
    return decodeURIComponent(
        atob(v).split('').map(c =>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
  }
};

const loader = new Github('mkki', 'test-repo');

const img = new ImageLoader('#a');
loader.setParser(img);
loader.load('test-png.png');

requestAnimationFrame(() => {
  const md = new MdLoader('#b');
  loader.setParser(md);
  loader.load('md-test.md');
});
