MyGame.objects.food = function (player) {
  "use strict";

  let coords = {
    x: 0,
    y: 0,
  };

  let width = 1;
  let height = 1;

  function move(player) {
    
  }

  let api = {
    move: move,
    get coords() {
      return coords;
    },
  };
  return api;
};
