"use strict";

function roundToThousandth(value) {
  return Math.round(value * 1000) / 1000;
}

function createPlayer(id) {
  const velocityConstant = 0.000175;
  let privateId = id;

  let center = {
    x: 0.5,
    y: 0.5,
  };
  let radius = 0.05;
  let fill = "#ea92ab";
  let stroke = "#61567d";
  let reportUpdate = false;

  // TODO: move to a common file
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

  function move(message) {
    let angle = 0;
    switch (message.direction) {
      case "up-left":
        angle = (5 * Math.PI) / 4;
        // moveDirectionToRender = "left";
        break;
      case "up-right":
        angle = (7 * Math.PI) / 4;
        // moveDirectionToRender = "right";
        break;
      case "down-left":
        angle = (3 * Math.PI) / 4;
        // moveDirectionToRender = "left";
        break;
      case "down-right":
        angle = Math.PI / 4;
        // moveDirectionToRender = "right";
        break;
      case "up":
        angle = (3 * Math.PI) / 2;
        // moveDirectionToRender = "up";
        break;
      case "down":
        angle = Math.PI / 2;
        // moveDirectionToRender = "down";
        break;
      case "left":
        angle = Math.PI;
        // moveDirectionToRender = "left";
        break;
      case "right":
        angle = 0;
        // moveDirectionToRender = "right";
        break;
    }
    // moveTime += message.updateWindow;

    let tileSize_w = 1.0 / 16; // TODO: combine into one global variable
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
        xMax = (playerTileCenterX + 1) * tileSize_w - rad;
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
          );
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
          );
      }
    } else if (Math.cos(angle) < -0.001) {
      if (tileMap[playerTileCenterY][playerTileCenterX - 1] === 1) {
        xMin = playerTileCenterX * tileSize_w + rad;
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
          ) + playerTileCenterX_w;
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
          ) + playerTileCenterX_w;
      }
    }
    if (Math.sin(angle) > 0.001) {
      if (tileMap[playerTileCenterY + 1][playerTileCenterX] === 1) {
        yMax = (playerTileCenterY + 1) * tileSize_w - rad;
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
          );
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
          );
      }
    } else if (Math.sin(angle) < -0.001) {
      if (tileMap[playerTileCenterY - 1][playerTileCenterX] === 1) {
        yMin = playerTileCenterY * tileSize_w + rad;
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
          ) + playerTileCenterY_w;
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
          ) + playerTileCenterY_w;
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
    reportUpdate = true;
  }

  function update(elapsedTime) {}

  let api = {
    update: update,
    move: move,

    get center() {
      return center;
    },
    get radius() {
      return radius;
    },
    set radius(val) {
      radius = val;
    },
    get fill() {
      return fill;
    },
    get stroke() {
      return stroke;
    },
    get id() {
      return privateId;
    },
    set id(anId) {
      privateId = anId;
    },
    set reportUpdate(value) {
      reportUpdate = value;
    },
    get reportUpdate() {
      return reportUpdate;
    },
  };
  return api;
}

module.exports.create = (id) => createPlayer(id);
