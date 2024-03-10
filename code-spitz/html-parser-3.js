const parser = input => {
  input = input.trim();

  const result = {
    name: 'ROOT',
    type: 'node',
    children: [],
  };

  let current = { tag: result };
  let i = 0;
  let j = input.length;

  traverse(input, current, i, j);

  return result;
};

const traverse = (input, current, i, j) => {
  if (i >= j) {
    return;
  }

  const cursor = i;

  if (input[cursor] === '<') {
    const idx = input.indexOf('>', cursor);

    if (input[cursor + 1] === '/') {
      current = current.back;
    } else {
      elementNode(input, cursor, idx, current);
    }

    traverse(input, current, idx + 1, j);
  } else {
    const idx = textNode(input, cursor, current);

    traverse(input, current, idx, j);
  }
};

const textNode = (input, cursor, current) => {
  const idx = input.indexOf('<', cursor);
  current.tag.children.push({
    type: 'text',
    text: input.substring(cursor, idx),
  });
  return idx;
};

const elementNode = (input, cursor, idx, current) => {
  const isClose = input[idx - 1] === '/';
  const tag = {
    name: input.substring(cursor + 1, idx - (isClose ? 1 : 0)),
    type: 'node',
    children: [],
  };
  current.tag.children.push(tag);

  if (!isClose) {
    current.back = { ...current };
    current.tag = tag;
  }
};

const htmlString = `
<div>a
  <a>b</a>
  c
  <img/>
  d
</div>
`;
console.log(JSON.stringify(parser(htmlString), null, 2));
