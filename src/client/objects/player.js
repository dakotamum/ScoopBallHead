MyGame.objects.player = function (spec) {
  "use strict";

  let center = {
    x: 0,
    y: 0,
  };
  let width = 1;
  let height = 1;
  let fill = "#a065cd";
  let stroke = "#ddf8d0";
  let moveTime = 0.0;
  let lastDirection = "down";
  let currentDirection = "down";

  function move(direction, elapsedtime) {
    moveIt(direction, elapsedtime, center);
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
    get currentDirection() {
      return currentDirection;
    },
  };
  return api;
};
