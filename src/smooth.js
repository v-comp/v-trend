// https://gielberkers.com/drawing-a-smooth-bezier-line-through-several-points/
const calc = function (points, i) {
  const pCurr = points[i];
  const pNext = points[i + 1] || points[i - 1];
  const pNeNe = points[i + 2] || points[i - 2];
  const dirX  = pNeNe['x'] - pCurr['x'];
  const dirY  = pNeNe['y'] - pCurr['y'];
  const distance = Math.sqrt(
    Math.pow(dirX, 2) + Math.pow(dirY, 2)
  );
  const unitX = dirX / distance;
  const unitY = dirY / distance;
  const normal1 = { x: -unitY, y: unitX };
  const normal2 = { x: unitY, y: -unitX };
  const normal = i < points.length - 2 ? normal1 : normal2;
  const angle = Math.atan2(normal['y'], normal['x']) + Math.PI / 2;

  const s = 9;

  return {
    x: pNext['x'] + Math.cos(angle) * (distance / s),
    y: pNext['y'] + Math.sin(angle) * (distance / s)
  }
};

export default function getSmoothPath(points) {
  let path = `M `;
  for (var i = 0; i < points.length - 1; i++) {
    let elem = points[i];
    let ctrl = calc(points, i);
    path += `${elem.x} ${elem.y} S ${ctrl.x} ${ctrl.y} `;
  }
  let elem = points[points.length - 1];
  path += `${elem.x} ${elem.y}`;
  return path;
};
