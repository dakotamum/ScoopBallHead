// game model object
MyGame.gameModel = (function (
  input,
  renderer,
  objects,
  persistence,
  assets,
) {
  "use strict";
  let internalUpdate = null;
  let internalRender = null;
  let keyboard = input.Keyboard();
  let myPlayer = objects.player();
  let directions = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  const Dir = Object.freeze({
    UP_LEFT: (5 * Math.PI) / 4,
    UP_RIGHT: (7 * Math.PI) / 4,
    DOWN_LEFT: (3 * Math.PI) / 4,
    DOWN_RIGHT: Math.PI / 4,
    UP: (3 * Math.PI) / 2,
    DOWN: Math.PI / 2,
    LEFT: Math.PI,
    RIGHT: 0,
  });

  // processes keyboard input
  function processKeyboardInput(elapsedTime) {
    keyboard.update(elapsedTime);
    let direction = "";
    let isMoving = false;
    if (directions.up && directions.left) {
      myPlayer.angle = Dir.UP_LEFT;
      direction = "up-left";
      isMoving = true;
    } else if (directions.up && directions.right) {
      myPlayer.angle = Dir.UP_RIGHT;
      direction = "up-right";
      isMoving = true;
    } else if (directions.down && directions.left) {
      myPlayer.angle = Dir.DOWN_LEFT;
      direction = "down-left";
      isMoving = true;
    } else if (directions.down && directions.right) {
      myPlayer.angle = Dir.DOWN_RIGHT;
      direction = "down-right";
      isMoving = true;
    } else if (directions.up) {
      myPlayer.angle = Dir.UP;
      direction = "up";
      isMoving = true;
    } else if (directions.down) {
      myPlayer.angle = Dir.DOWN;
      direction = "down";
      isMoving = true;
    } else if (directions.left) {
      myPlayer.angle = Dir.LEFT;
      direction = "left";
      isMoving = true;
    } else if (directions.right) {
      myPlayer.angle = Dir.RIGHT;
      direction = "right";
      isMoving = true;
    } else {
      myPlayer.moveTime = 0.0;
    }
    if (isMoving) {
    //   let message = {
    //     type: "move",
    //     direction: direction,
    //     updateWindow: elapsedTime,
    //     id: messageId++,
    //   };
    //   socket.emit("input", message);
    //   messageHistory.enqueue(message);
      myPlayer.move(direction, elapsedTime);
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

  function disconnect() {
    // socket.disconnect();
  }

  // render the actively-playing state
  let renderMyGame = function (elapsedTime) {
    // MyGame.graphics.drawBackground(myPlayer);
    renderer.player.renderMyPlayer(myPlayer);
  };

  // setup the game model for a new game
  function setupMyGame() {
    internalUpdate = updateMyGame;
    internalRender = renderMyGame;
    enableControls();
  }

  // enable controls for the player
  function enableControls() {
    keyboard.register(
      persistence.controls["up"],
      () => {
        if (!directions.up) directions.up = true;
      },
      () => {
        directions.up = false;
      },
    );
    keyboard.register(
      persistence.controls["down"],
      () => {
        if (!directions.down) directions.down = true;
      },
      () => {
        directions.down = false;
      },
    );
    keyboard.register(
      persistence.controls["left"],
      () => {
        if (!directions.left) directions.left = true;
      },
      () => {
        directions.left = false;
      },
    );
    keyboard.register(
      persistence.controls["right"],
      () => {
        if (!directions.right) directions.right = true;
      },
      () => {
        directions.right = false;
      },
    );
  }

  // disable controls for the lander
  function disableControls() {}

  return {
    setupMyGame: setupMyGame,
    processKeyboardInput: processKeyboardInput,
    update: update,
    render: render,
    disconnect: disconnect,
    disableControls: disableControls,
  };
})(
  MyGame.input,
  MyGame.renderer,
  MyGame.objects,
  MyGame.persistence,
  MyGame.assets,
);
