// game model object
MyGame.gameModel = (function (
  input,
  graphics,
  renderer,
  objects,
  particleManager,
  persistence,
  queue,
  assets
) {
  "use strict";
  let internalUpdate = null;
  let internalRender = null;
  let keyboard = input.Keyboard();
  let playerOthers = {};
  let socket;
  let myId;
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

  // internal state for when the game is over
  let updateMyGameOver = function (elapsedTime) {};

  // render game over state
  let renderMyGameOver = function (elapsedTime) {};

  // processes keyboard input
  function processInput(elapsedTime) {
    keyboard.update(elapsedTime);
    if (directions.up && directions.left) {
      myPlayer.angle = Dir.UP_LEFT;
      let message = {
        type: "move",
        direction: "up-left",
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      messageHistory.enqueue(message);
      myPlayer.move(message, assets.tileMap);
    } else if (directions.up && directions.right) {
      myPlayer.angle = Dir.UP_RIGHT;
      let message = {
        type: "move",
        direction: "up-right",
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      myPlayer.move(message, assets.tileMap);
      messageHistory.enqueue(message);
    } else if (directions.down && directions.left) {
      myPlayer.angle = Dir.DOWN_LEFT;
      let message = {
        type: "move",
        direction: "down-left",
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      myPlayer.move(message, assets.tileMap);
      messageHistory.enqueue(message);
    } else if (directions.down && directions.right) {
      myPlayer.angle = Dir.DOWN_RIGHT;
      let message = {
        type: "move",
        direction: "down-right",
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      myPlayer.move(message, assets.tileMap);
      messageHistory.enqueue(message);
    } else if (directions.up) {
      myPlayer.angle = Dir.UP;
      let message = {
        type: "move",
        direction: "up",
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      myPlayer.move(message, assets.tileMap);
      messageHistory.enqueue(message);
    } else if (directions.down) {
      myPlayer.angle = Dir.DOWN;
      let message = {
        type: "move",
        direction: "down",
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      messageHistory.enqueue(message);
      myPlayer.move(message, assets.tileMap);
    } else if (directions.left) {
      myPlayer.angle = Dir.LEFT;
      let message = {
        type: "move",
        direction: "left",
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      messageHistory.enqueue(message);
      myPlayer.move(message, assets.tileMap);
    } else if (directions.right) {
      myPlayer.angle = Dir.RIGHT;
      let message = {
        type: "move",
        direction: "right",
        updateWindow: elapsedTime,
        id: messageId++,
      };
      socket.emit("input", message);
      myPlayer.move(message, assets.tileMap);
      messageHistory.enqueue(message);
    }
    else
      myPlayer.moveTime = 0.0;
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
  let updateMyGame = function (elapsedTime) {};

  function disconnect() {
    socket.disconnect();
  }

  // render the actively-playing state
  let renderMyGame = function (elapsedTime) {
    MyGame.graphics.drawBackground(myPlayer);
    renderer.player.render(myPlayer);
    for (const id in playerOthers) {
      if (playerOthers.hasOwnProperty(id)) {
        // Check if the property is directly on the object
        // renderer.player.render(
        //   playerOthers[id]
        // );
      }
    }
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
    socket.on("connect-ack", function (data) {
    });

    socket.on("update-self", function (data) {
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
        otherPlayer.center = data.player.center;
        // otherPlayer.goal = {
        //   dinks: data.slinkyDink.dinks,
        //   updateWindow: data.updateWindow,
        // };
      }
    });

    socket.on("connect-other", function (data) {
      let newPlayer = MyGame.objects.remotePlayer();
      newPlayer.id = data.id;
      newPlayer.player = data.player;
      // newPlayer.goal = {
      //   dinks: data.slinkyDink.dinks,
      //   updateWindow: 0,
      // };
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
      }
    );
    keyboard.register(
      persistence.controls["down"],
      () => {
        if (!directions.down) directions.down = true;
      },
      () => {
        directions.down = false;
      }
    );
    keyboard.register(
      persistence.controls["left"],
      () => {
        if (!directions.left) directions.left = true;
      },
      () => {
        directions.left = false;
      }
    );
    keyboard.register(
      persistence.controls["right"],
      () => {
        if (!directions.right) directions.right = true;
      },
      () => {
        directions.right = false;
      }
    );
  }

  // disable controls for the lander
  function disableControls() {}

  return {
    setupMyGame: setupMyGame,
    processInput: processInput,
    update: update,
    render: render,
    disconnect: disconnect,
    disableControls: disableControls,
  };
})(
  MyGame.input,
  MyGame.graphics,
  MyGame.renderer,
  MyGame.objects,
  MyGame.particleManager,
  MyGame.persistence,
  MyGame.queue,
  MyGame.assets
);
