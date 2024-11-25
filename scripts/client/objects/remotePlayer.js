MyGame.objects.remotePlayer = function (spec) {
  "use strict";
  // constants
  const velocityConstant = 0.000175;

  let center = {
    x: 0.5,
    y: 0.5,
  };
  let radius = 0.05;
  let fill = "#a065cd";
  let stroke = "#ddf8d0";

  function move(message) {
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
    center.x += message.updateWindow * velocityConstant * Math.cos(angle);
    center.y += message.updateWindow * velocityConstant * Math.sin(angle);
  }

  let api = {
    move: move,
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
  };
  return api;
};
