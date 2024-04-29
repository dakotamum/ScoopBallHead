// ------------------------------------------------------------------
//
// Nodejs module that provides the server-side game model.
//
// ------------------------------------------------------------------
"use strict";

let present = require("present");
// let SlinkyDink = require("./slinkyDink");

const UPDATE_RATE_MS = 50;
let quit = false;
let activeClients = {};
let inputQueue = [];

function processInput() {
  // Double buffering on the queue so we don't asynchronously receive inputs
  // while processing.
  let processMe = inputQueue;
  inputQueue = [];
  for (let inputIndex in processMe) {
    let input = processMe[inputIndex];
    let client = activeClients[input.id];
    // if (client !== undefined)
      // client.slinkyDink.directions = input.message.directions;
  }
}

function update(elapsedTime, currentTime) {
}

function updateClients() {
  for (let id in activeClients) {
    let client = activeClients[id];
    let update = {
    };
    // client.socket.emit("update-self", update);
    // client.socket.emit("update-food-particles", foodParticles);

    for (let otherId in activeClients) {
      if (otherId !== id) {
        // activeClients[otherId].socket.emit("update-other", update);
      }
    }
  }
}

function gameLoop(currentTime, elapsedTime) {
  processInput();
  update(elapsedTime, currentTime);
  updateClients();

  if (!quit) {
    setTimeout(() => {
      let now = present();
      gameLoop(now, now - currentTime);
    }, UPDATE_RATE_MS);
  }
}

function initializeSocketIO(httpServer) {
  let io = require("socket.io")(httpServer);

  function notifyConnect(socket/*, newPlayer*/) {
    // for (let id in activeClients) {
    //   let client = activeClients[id];
    //   if (newPlayer.id !== id) {
    //     client.socket.emit("connect-other", {
    //     });
    //     socket.emit("connect-other", {
    //     });
    //   }
    // }
  }

  function notifyDisconnect(playerId) {
    for (let id in activeClients) {
      let client = activeClients[id];
      if (slinkyDinkId !== id) {
        client.socket.emit("disconnect-other", {
        });
      }
    }
  }

  io.on("connection", function (socket) {
    console.log("Connection established: ", socket.id);
    // let newPlayer = Player.create(
    //   socket.id,
    //   socket.handshake.query["username"],
    // );
    activeClients[socket.id] = {
      // socket: socket,
      // player: newPlayer,
    };
    socket.emit("connect-ack", {
      // player: newPlayer,
    });

    socket.on("disconnect", function () {
      // delete activeClients[socket.id];
      // notifyDisconnect(socket.id);
    });

    socket.on("input", function (data) {
      // inputQueue.push({
      // });
    });

    notifyConnect(socket/*, newPlayer*/);
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
