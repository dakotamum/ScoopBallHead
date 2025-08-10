// game model object
MyGame.gameModel = (function (
  input,
  renderer,
  objects,
  persistence,
  queue,
  assets,
) {
  "use strict";
  let internalUpdate = null;
  let internalRender = null;
  let keyboard = input.Keyboard();
  let playerOthers = {};
  let socket;
  let myPlayer = objects.player();
  let messageId = 1;
  let messageHistory = queue();
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
      let message = {
        type: "move",
        direction: direction,
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      messageHistory.enqueue(message);
      myPlayer.move(message, assets.tileMap);
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
    for (let id in playerOthers) {
      playerOthers[id].update(elapsedTime);
    }
  };

  function disconnect() {
    socket.disconnect();
  }

  // render the actively-playing state
  let renderMyGame = function (elapsedTime) {
    MyGame.graphics.drawBackground(myPlayer);
    for (const id in playerOthers) {
      if (playerOthers.hasOwnProperty(id)) {
        // Check if the property is directly on the object
        renderer.player.renderOtherPlayer(myPlayer, playerOthers[id]);
      }
    }
    renderer.player.renderMyPlayer(myPlayer);
  };

  // setup the game model for a new game
  function setupMyGame() {
    internalUpdate = updateMyGame;
    internalRender = renderMyGame;
    // set up initial connection and send username
    socket = io({
      query: {
        /*username: mySlinkeyDink.name*/
      },
    });
    socket.on("connect-ack", function (data) {});

    socket.on("update-self", function (data) {
      myPlayer.center.x = data.player.center.x;
      myPlayer.center.y = data.player.center.y;

      let done = false;
      while (!done && !messageHistory.empty) {
        if (messageHistory.front.id === data.lastMessageId) {
          done = true;
        }
        messageHistory.dequeue();
      }
      let memory = queue();
      while (!messageHistory.empty) {
        let message = messageHistory.dequeue();
        if (message.type === "move") {
          myPlayer.move(message, assets.tileMap);
        }
        memory.enqueue(message);
      }
      messageHistory = memory;
    });

    socket.on("update-other", function (data) {
      if (playerOthers.hasOwnProperty(data.id)) {
        let otherPlayer = playerOthers[data.id];
        if (!otherPlayer) return;

        otherPlayer.onServerUpdate({
          x: data.player.center.x,
          y: data.player.center.y,
          updateWindow: data.updateWindow
        });
      }
    });

    socket.on("connect-other", function (data) {
      let newPlayer = MyGame.objects.remotePlayer();
      newPlayer.id = data.id;
      newPlayer.player = data.player;
      playerOthers[data.id] = newPlayer;
    });

    socket.on("disconnect-other", function (data) {});
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
  MyGame.queue,
  MyGame.assets,
);
