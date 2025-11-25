const velocityConstant = 2;

function moveIt(direction, elapsedTime, center) {
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
  center.y += (elapsedTime / 1000) * velocityConstant * Math.sin(angle);
  center.x += (elapsedTime / 1000) * velocityConstant * Math.cos(angle);
}

// Check if running in Node.js (CommonJS)
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = { moveIt };
}
