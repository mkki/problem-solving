function solution(wallpaper) {
  var answer = [];
  const MAX = 50;
  let x1 = MAX;
  let x2 = 0;
  let y1 = MAX;
  let y2 = 0;

  for (let i = 0; i < wallpaper.length; i++) {
    const row = wallpaper[i];

    for (let j = 0; j < row.length; j++) {
      const char = row[j];

      if (char === '#') {
        const positionX = j;
        const positionY = i;
        x1 = Math.min(x1, positionX);
        x2 = Math.max(x2, positionX);

        y1 = Math.min(y1, positionY);
        y2 = Math.max(y1, positionY);
      }
    }
  }

  answer.push(y1);
  answer.push(x1);
  answer.push(y2 + 1);
  answer.push(x2 + 1);

  return answer;
}
