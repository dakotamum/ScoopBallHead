const velocityConstant = 4;

function moveIt(direction, elapsedTime, snakePositions) {
  let angle = 0;
  switch (direction) {
    case "up":
      angle = (3 * Math.PI) / 2;
      break;
    case "down":
      angle = Math.PI / 2;
      break;
    case "left":
      angle = Math.PI;
      break;
    case "right":
      angle = 0;
      break;
  }

  const snakeCopy = snakePositions.map(seg => ({...seg}));
  snakePositions[0].y += (elapsedTime / 1000) * velocityConstant * Math.sin(angle);
  snakePositions[0].x += (elapsedTime / 1000) * velocityConstant * Math.cos(angle);
  snakePositions[0].heading = direction;
  for (let i = 1; i < snakePositions.length; i++) {
    snakePositions[i] = snakeCopy[i - 1];
  }
}

// Check if running in Node.js (CommonJS)
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = { moveIt };
}
