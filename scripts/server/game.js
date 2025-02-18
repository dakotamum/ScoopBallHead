// ------------------------------------------------------------------
//
// Nodejs module that provides the server-side game model.
//
// ------------------------------------------------------------------
"use strict";

let present = require("present");
let Player = require("./player");

const UPDATE_RATE_MS = 100;
let quit = false;
let activeClients = {};
let inputQueue = [];

function processKeyboardInput() {
  // Double buffering on the queue so we don't asynchronously receive inputs
  // while processing.
  let processMe = inputQueue;
  inputQueue = [];
  for (let inputIndex in processMe) {
    let input = processMe[inputIndex];
    let client = activeClients[input.id];
    client.lastMessageId = input.message.id;
    if (input.message.type === "move") client?.player.move(input.message);
  }
}

function update(elapsedTime, currentTime) {}

function updateClients(elapsedTime) {
  for (let id in activeClients) {
    let client = activeClients[id];
    let update = {
      id: id,
      player: client.player,
      lastMessageId: client.lastMessageId,
      updateWindow: elapsedTime,
    };
    if (client.player.reportUpdate) {
      client.socket.emit("update-self", update);
      for (let otherId in activeClients) {
        if (otherId !== id) {
          activeClients[otherId].socket.emit("update-other", update);
        }
      }
      // for (let id in playerOthers) {
      //   playerOthers[id].move(elapsedTime);
      // }
    }
  }
  for (let clientId in activeClients) {
    activeClients[clientId].player.reportUpdate = false;
  }
}

function gameLoop(currentTime, elapsedTime) {
  processKeyboardInput();
  update(elapsedTime, currentTime);
  updateClients(elapsedTime);

  if (!quit) {
    setTimeout(() => {
      let now = present();
      gameLoop(now, now - currentTime);
    }, UPDATE_RATE_MS);
  }
}

function initializeSocketIO(httpServer) {
  let io = require("socket.io")(httpServer);

  function notifyConnect(socket, newPlayer) {
    for (let id in activeClients) {
      let client = activeClients[id];
      if (newPlayer.id !== id) {
        client.socket.emit("connect-other", {
          id: newPlayer.id,
          player: newPlayer,
        });
        socket.emit("connect-other", {
          id: client.player.id,
          player: client.player,
        });
      }
    }
  }

  function notifyDisconnect(playerId) {
    for (let id in activeClients) {
      let client = activeClients[id];
      if (playerId !== id) {
        client.socket.emit("disconnect-other", {
          id: playerId,
        });
      }
    }
  }

  io.on("connection", function (socket) {
    console.log("Connection established: ", socket.id);
    let newPlayer = Player.create(socket.id);
    activeClients[socket.id] = {
      socket: socket,
      player: newPlayer,
    };

    socket.emit("connect-ack", {
      player: newPlayer,
    });

    socket.on("disconnect", function () {
      delete activeClients[socket.id];
      notifyDisconnect(socket.id);
    });

    socket.on("input", function (data) {
      inputQueue.push({
        id: socket.id,
        message: data,
      });
    });

    notifyConnect(socket, newPlayer);
  });
}

function initialize(httpServer) {
  initializeSocketIO(httpServer);
  gameLoop(present(), 0);
}

function terminate() {
  this.quit = true;
}

module.exports.initialize = initialize;
