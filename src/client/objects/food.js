MyGame.objects.food = function (player) {
  "use strict";

  let numTiles = 8;

  let coords = {
    x: 0,
    y: 0
  };

  let width = 1;
  let height = 1;

  function move(player) {
    let possibleCells = [];
    let occupiedCells = [];
    for (let i = 0; i < numTiles; i++) 
    {
      for (let j = 0; j < numTiles; j++) 
      {
        possibleCells.push({x: j, y: i});
      }
    }
    for (let i = 0; i < player.snakePositions.length; i++) 
    {
      occupiedCells.push({x: player.snakePositions[i].x, y: player.snakePositions[i].y});
    }
    let updatedCells = possibleCells.filter(p => !occupiedCells.some(o => o.x === p.x && o.y === p.y));
    if (updatedCells.length > 0)
    {
      let random = updatedCells[Math.floor(Math.random() * updatedCells.length)];
      coords.x = random.x;
      coords.y = random.y;
    }
    else
    {
      // TODO: end the game
    }
  }

  let api = {
    move: move,
    get coords() {
      return coords;
    },
  };
  return api;
};
