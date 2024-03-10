const parser = input => {
  input = input.trim();

  const result = {
    name: 'ROOT',
    type: 'node',
    attribute: [],
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
  const tagContent = input.substring(cursor + 1, idx - (isClose ? 1 : 0));

  const matches = tagContent.match(/^(\w+)(?:\s+([^>]+))?$/);
  const tagName = matches[1];
  const attribute = [];

  if (matches[2]) {
    const attrRegex = /(\w+)(?:="([^"]*)")?/g;
    let attrMatches;
    while ((attrMatches = attrRegex.exec(matches[2]))) {
      const [, attrName, attrValue] = attrMatches;
      attribute.push({ [attrName]: attrValue || true });
    }
  }

  const tag = {
    name: tagName,
    type: 'node',
    attribute,
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
  <button disabled>button text 4</button>
  <div href="#" class="temp-button-wrap">
    <button disabled>button text 4</button>
    <button class="temp-button large-button" disabled>button text</button>
    <button type="button" class="temp-button large-button" disabled>button text</button>
    <button disabled type="button" class="temp-button large-button">button text 2</button>
    <button type="button" disabled class="temp-button large-button">button text 2</button>
  </div>
  c
  <span style="background: #red; color: #fff">span text</span>
  <img/>
  d
</div>
`;
console.log(JSON.stringify(parser(htmlString), null, 2));
