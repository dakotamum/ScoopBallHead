MyGame.objects.player = function (spec) {
  "use strict";

  let center = {
    x: 64,
    y: 64,
  };
  let width = 16;
  let height = 16;
  let fill = "#a065cd";
  let stroke = "#ddf8d0";
  let moveTime = 0.0;
  let moveDirectionToRender = "right";

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
    get moveDirectionToRender() {
      return moveDirectionToRender;
    },
  };
  return api;
};
