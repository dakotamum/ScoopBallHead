MyGame.objects.player = function (spec) {
  "use strict";

  let center = {
    x: 0.5,
    y: 0.5,
  };
  let fill = "#a065cd";
  let stroke = "#ddf8d0";
  let moveTime = 0.0;
  let moveDirectionToRender = "right";

  function move(message, tileMap) {
    moveIt(message, center);
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
