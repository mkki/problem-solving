const parser = input => {
  input = input.trim();

  const result = {
    name: 'ROOT',
    type: 'node',
    children: [],
  };

  const stack = [{ tag: result }];

  let current,
    i = 0,
    j = input.length;

  while ((current = stack.pop())) {
    while (i < j) {
      const cursor = i;

      if (input[cursor] === '<') {
        const idx = input.indexOf('>', cursor);
        i = idx + 1;
        if (input[cursor + 1] === '/') {
          current = current.back;
        } else {
          if (elementNode(input, cursor, idx, current, stack)) break;
        }
      } else {
        i = textNode(input, cursor, current);
      }
    }
  }

  return result;
};

const textNode = (input, cursor, current) => {
  const idx = input.indexOf('<', cursor);
  current.tag.children.push({
    type: 'text',
    text: input.substring(cursor, idx),
  });
  return idx;
};

const elementNode = (input, cursor, idx, current, stack) => {
  const isClose = input[idx - 1] === '/';
  const tag = {
    name: input.substring(cursor + 1, idx - (isClose ? 1 : 0)),
    type: 'node',
    children: [],
  };
  current.tag.children.push(tag);

  if (!isClose) {
    stack.push({ tag, back: current });
    return true;
  }

  return false;
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
