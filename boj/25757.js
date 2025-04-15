const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [_, t] = f.trim().split(' ');

const GAME_TYPE = {
  'Y': 1,
  'F': 2,
  'O': 3,
}

const players = new Set(inputs);

console.log(Math.floor(players.size / GAME_TYPE[t]));
