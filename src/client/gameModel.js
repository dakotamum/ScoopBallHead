// game model object
MyGame.gameModel = (function (
  input,
  renderer,
  objects,
  persistence,
) {
  "use strict";
  let internalUpdate = null;
  let internalRender = null;
  let keyboard = input.Keyboard();
  let myPlayer = objects.player();
  let food = objects.food();
  let directions = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  let isGameOver = false;

  let accumulatedMoveTime = 0.0;
  let millisecondsPerMove = 250;

  // processes keyboard input
  function processKeyboardInput(elapsedTime) {
    keyboard.update(elapsedTime);
    let direction = myPlayer.currentDirection;
    if (directions.up) {
      direction = "up";
    } else if (directions.down) {
      direction = "down";
    } else if (directions.left) {
      direction = "left";
    } else if (directions.right) {
      direction = "right";
    }

    accumulatedMoveTime += elapsedTime;
    if (direction == "left" && myPlayer.lastDirection == "right")
      direction = "right";
    if (direction == "right" && myPlayer.lastDirection == "left")
      direction = "left";
    if (direction == "up" && myPlayer.lastDirection == "down")
      direction = "down";
    if (direction == "down" && myPlayer.lastDirection == "up")
      direction = "up";
    if (accumulatedMoveTime > millisecondsPerMove)
    {
      let tail = myPlayer.snakePositions[myPlayer.snakePositions.length - 1];
      let numTimeSteps = Math.floor(accumulatedMoveTime / millisecondsPerMove);
      accumulatedMoveTime = accumulatedMoveTime % millisecondsPerMove;
      myPlayer.move(direction, numTimeSteps * millisecondsPerMove);
      myPlayer.lastDirection = direction;
      if (myPlayer.snakePositions[0].x == food.coords.x && myPlayer.snakePositions[0].y == food.coords.y)
      {
        food.move(myPlayer);
        myPlayer.snakePositions.push(tail);
      }
      let outOfBounds = myPlayer.snakePositions[0].x > 7 || myPlayer.snakePositions[0].x < 0 || myPlayer.snakePositions[0].y > 7 || myPlayer.snakePositions[0].y < 0;
      let selfDestructed = myPlayer.snakePositions.slice(1).some(bod => bod.x === myPlayer.snakePositions[0].x && bod.y === myPlayer.snakePositions[0].y);
      if (outOfBounds || selfDestructed)
      {
        isGameOver = true;
        disableControls();
      }
    }
  }

  // updates the game model depending on current internal state
  function update(elapsedTime) {
    internalUpdate(elapsedTime);
  }

  // renders the game model depending on current internal state
  function render(elapsedTime) {
    internalRender(elapsedTime);
  }

  // internal state for updating game while actively playing
  let updateMyGame = function (elapsedTime) {
  };

  // render the actively-playing state
  let renderMyGame = function (elapsedTime) {
    MyGame.graphics.drawBackground();
    renderer.player.renderMyPlayer(myPlayer);
    MyGame.graphics.drawFood(food);
  };

  // setup the game model for a new game
  function setupMyGame() {
    myPlayer = objects.player();
    myPlayer.currentDirection = "down";
    myPlayer.lastDirection = "down";
    food = objects.food();
    isGameOver = false;
    internalUpdate = updateMyGame;
    internalRender = renderMyGame;
    enableControls();
  }

  // enable controls for the player
  function enableControls() {
    keyboard.register(
      persistence.controls["up"],
      () => {
        if (!directions.down)
          {
            directions.left = false;
            directions.right = false;
            directions.up = true;
          }
      },
      () => {
        // directions.up = false;
      },
    );
    keyboard.register(
      persistence.controls["down"],
      () => {
        if (!directions.up)
          {
            directions.left = false;
            directions.right = false;
            directions.down = true;
          }
      },
      () => {
        // directions.down = false;
      },
    );
    keyboard.register(
      persistence.controls["left"],
      () => {
        if (!directions.right)
          {
            directions.up = false;
            directions.down = false;
            directions.left = true;
          }
      },
      () => {
        // directions.left = false;
      },
    );
    keyboard.register(
      persistence.controls["right"],
      () => {
        if (!directions.left)
          {
            directions.up = false;
            directions.down = false;
            directions.right = true;
          }
      },
      () => {
        // directions.right = false;
      },
    );
  }

  function disableControls() {
    directions.up = false;
    directions.down = false;
    directions.left = false;
    directions.right = false;
  }

  return {
    get isGameOver(){ return isGameOver;},
    setupMyGame: setupMyGame,
    processKeyboardInput: processKeyboardInput,
    update: update,
    render: render,
    disableControls: disableControls,
  };
})(
  MyGame.input,
  MyGame.renderer,
  MyGame.objects,
  MyGame.persistence,
  MyGame.assets,
);
