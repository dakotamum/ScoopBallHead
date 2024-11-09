MyGame.objects.player = function (spec) {
  "use strict";
  // constants
  const velocityConstant = 0.000175;

  let center = {
    x: 0.5,
    y: 0.5,
  };
  let radius = 0.0625;
  let fill = "#a065cd";
  let stroke = "#ddf8d0";
  let moveTime = 0.0;
  let moveDirectionToRender = "right";

  function move(message) {
    let angle = 0;
    switch (message.direction) {
      case "up-left":
        angle = (5 * Math.PI) / 4;
        moveDirectionToRender = "left";
        break;
      case "up-right":
        angle = (7 * Math.PI) / 4;
        moveDirectionToRender = "right";
        break;
      case "down-left":
        angle = (3 * Math.PI) / 4;
        moveDirectionToRender = "left";
        break;
      case "down-right":
        angle = Math.PI / 4;
        moveDirectionToRender = "right";
        break;
      case "up":
        angle = (3 * Math.PI) / 2;
        moveDirectionToRender = "up";
        break;
      case "down":
        angle = Math.PI / 2;
        moveDirectionToRender = "down";
        break;
      case "left":
        angle = Math.PI;
        moveDirectionToRender = "left";
        break;
      case "right":
        angle = 0;
        moveDirectionToRender = "right";
        break;
    }
    moveTime += message.updateWindow;
    center.x = Math.max(0.0, Math.min(1.0, center.x + message.updateWindow * velocityConstant * Math.cos(angle)));
    center.y = Math.max(0.0, Math.min(1.0, center.y + message.updateWindow * velocityConstant * Math.sin(angle)));
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
    }
  };
  return api;
};
