function roundToThousandth(value) {
  return Math.round(value * 1000) / 1000;
}

let tileMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let radius = 0.05;
const velocityConstant = 0.000175;

function moveIt(message, center) {
  let angle = 0;
  switch (message.direction) {
    case "up-left":
      angle = (5 * Math.PI) / 4;
      break;
    case "up-right":
      angle = (7 * Math.PI) / 4;
      break;
    case "down-left":
      angle = (3 * Math.PI) / 4;
      break;
    case "down-right":
      angle = Math.PI / 4;
      break;
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

  let tileSize_w = 1.0 / 16; // TODO: combine into one global variable
  let buffer = tileSize_w * 0.01;
  let rad = radius / 2; // TODO: change 'radius' to be 'diameter'
  // find tiles that the player is overlapping
  // get tile touching player center
  let playerTileCenterX = Math.floor(center.x / tileSize_w);
  let playerTileCenterX_w = playerTileCenterX * tileSize_w;

  let playerTileCenterY = Math.floor(center.y / tileSize_w);
  let playerTileCenterY_w = playerTileCenterY * tileSize_w;

  let xMin = 0.0;
  let xMax = 1.0;
  let yMin = 0.0;
  let yMax = 1.0;

  if (Math.cos(angle) > 0.001) {
    if (tileMap[playerTileCenterY][playerTileCenterX + 1] === 1) {
      xMax = (playerTileCenterX + 1) * tileSize_w - rad - buffer;
    } else if (
      Math.sqrt(
        Math.pow(playerTileCenterX_w + tileSize_w - center.x, 2) +
          Math.pow(center.y - playerTileCenterY_w, 2),
      ) < rad &&
      tileMap[playerTileCenterY - 1][playerTileCenterX + 1] === 1
    ) {
      xMax =
        playerTileCenterX_w +
        tileSize_w -
        Math.sqrt(
          Math.abs(
            Math.pow(rad, 2) - Math.pow(center.y - playerTileCenterY_w, 2),
          ),
        ) -
        buffer;
    } else if (
      Math.sqrt(
        Math.pow(playerTileCenterX_w + tileSize_w - center.x, 2) +
          Math.pow(playerTileCenterY_w + tileSize_w - center.y, 2),
      ) < rad &&
      tileMap[playerTileCenterY + 1][playerTileCenterX + 1] === 1
    ) {
      xMax =
        playerTileCenterX_w +
        tileSize_w -
        Math.sqrt(
          Math.abs(
            Math.pow(rad, 2) -
              Math.pow(playerTileCenterY_w + tileSize_w - center.y, 2),
          ),
        ) -
        buffer;
    }
  } else if (Math.cos(angle) < -0.001) {
    if (tileMap[playerTileCenterY][playerTileCenterX - 1] === 1) {
      xMin = playerTileCenterX * tileSize_w + rad + buffer;
    } else if (
      Math.sqrt(
        Math.pow(center.x - playerTileCenterX_w, 2) +
          Math.pow(center.y - playerTileCenterY_w, 2),
      ) < rad &&
      tileMap[playerTileCenterY - 1][playerTileCenterX - 1] === 1
    ) {
      xMin =
        Math.sqrt(
          Math.abs(
            Math.pow(rad, 2) - Math.pow(center.y - playerTileCenterY_w, 2),
          ),
        ) +
        playerTileCenterX_w +
        buffer;
    } else if (
      Math.sqrt(
        Math.pow(center.x - playerTileCenterX_w, 2) +
          Math.pow(playerTileCenterY_w + tileSize_w - center.y, 2),
      ) < rad &&
      tileMap[playerTileCenterY + 1][playerTileCenterX - 1] === 1
    ) {
      xMin =
        Math.sqrt(
          Math.abs(
            Math.pow(rad, 2) -
              Math.pow(playerTileCenterY_w + tileSize_w - center.y, 2),
          ),
        ) +
        playerTileCenterX_w +
        buffer;
    }
  }
  if (Math.sin(angle) > 0.001) {
    if (tileMap[playerTileCenterY + 1][playerTileCenterX] === 1) {
      yMax = (playerTileCenterY + 1) * tileSize_w - rad - buffer;
    } else if (
      Math.sqrt(
        Math.pow(playerTileCenterY_w + tileSize_w - center.y, 2) +
          Math.pow(center.x - playerTileCenterX_w, 2),
      ) < rad &&
      tileMap[playerTileCenterY + 1][playerTileCenterX - 1] === 1
    ) {
      yMax =
        playerTileCenterY_w +
        tileSize_w -
        Math.sqrt(
          Math.abs(
            Math.pow(playerTileCenterX_w - center.x, 2) - Math.pow(rad, 2),
          ),
        ) -
        buffer;
    } else if (
      Math.sqrt(
        Math.pow(playerTileCenterX_w + tileSize_w - center.x, 2) +
          Math.pow(playerTileCenterY_w + tileSize_w - center.y, 2),
      ) < rad &&
      tileMap[playerTileCenterY + 1][playerTileCenterX + 1] === 1
    ) {
      yMax =
        playerTileCenterY_w +
        tileSize_w -
        Math.sqrt(
          Math.abs(
            Math.pow(rad, 2) -
              Math.pow(playerTileCenterX_w + tileSize_w - center.x, 2),
          ),
        ) -
        buffer;
    }
  } else if (Math.sin(angle) < -0.001) {
    if (tileMap[playerTileCenterY - 1][playerTileCenterX] === 1) {
      yMin = playerTileCenterY * tileSize_w + rad + buffer;
    } else if (
      Math.sqrt(
        Math.pow(center.x - playerTileCenterX_w, 2) +
          Math.pow(center.y - playerTileCenterY_w, 2),
      ) < rad &&
      tileMap[playerTileCenterY - 1][playerTileCenterX - 1] === 1
    ) {
      yMin =
        Math.sqrt(
          Math.abs(
            Math.pow(rad, 2) - Math.pow(center.x - playerTileCenterX_w, 2),
          ),
        ) +
        playerTileCenterY_w +
        buffer;
    } else if (
      Math.sqrt(
        Math.pow(playerTileCenterX_w + tileSize_w - center.x, 2) +
          Math.pow(center.y - playerTileCenterY_w, 2),
      ) < rad &&
      tileMap[playerTileCenterY - 1][playerTileCenterX + 1] === 1
    ) {
      yMin =
        Math.sqrt(
          Math.abs(
            Math.pow(rad, 2) -
              Math.pow(playerTileCenterX_w + tileSize_w - center.x, 2),
          ),
        ) +
        playerTileCenterY_w +
        buffer;
    }
  }

  center.x = roundToThousandth(
    Math.max(
      xMin,
      Math.min(
        xMax,
        center.x + message.updateWindow * velocityConstant * Math.cos(angle),
      ),
    ),
  );
  center.y = roundToThousandth(
    Math.max(
      yMin,
      Math.min(
        yMax,
        center.y + message.updateWindow * velocityConstant * Math.sin(angle),
      ),
    ),
  );
}

// Check if running in Node.js (CommonJS)
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = { moveIt };
}
