MyGame.objects.player = function (spec) {
  "use strict";

  let center = {
    x: 0,
    y: 0,
  };
  let snakePositions = [
    {x: 4, y: 5, heading: "down"},
    {x: 4, y: 4, heading: "down"},
    {x: 4, y: 3, heading: "down"},
    {x: 4, y: 2, heading: "down"}
  ]
  let width = 1;
  let height = 1;
  let lastDirection = "down";
  let currentDirection = "down";

  function move(direction, elapsedtime) {
    moveIt(direction, elapsedtime, snakePositions);
  }

  let api = {
    move: move,
    get moveTime() {
      return moveTime;
    },
    set moveTime(val) {
      moveTime = val;
    },
    get center() {
      return center;
    },
    set center(val) {
      center = val;
    },
    get snakePositions() {
      return snakePositions;
    },
    set snakePositions(val) {
      snakePositions = val;
    },
    get width() {
      return width;
    },
    set width(val) {
      width = val;
    },
    get height() {
      return height;
    },
    set height(val) {
      height = val;
    },
    get lastDirection() {
      return lastDirection;
    },
    set lastDirection(val) {
      lastDirection = val;
    },
    get currentDirection() {
      return currentDirection;
    },
  };
  return api;
};
