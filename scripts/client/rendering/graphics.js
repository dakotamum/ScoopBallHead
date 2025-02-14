// provides general methods for rendering to the canvas
MyGame.graphics = (function (assets) {
  "use strict";
  let canvas = document.getElementById("game-canvas");
  let canvasSize_w = 1.0 / 2;
  let tileSize_w = 1.0 / 16;
  let boardSize_tiles = 16;
  let gamediv = document.getElementById("game");

  canvas.width = Math.min(gamediv.clientWidth, gamediv.clientHeight) * 0.95;
  canvas.height = Math.min(gamediv.clientWidth, gamediv.clientHeight) * 0.95;

  window.addEventListener("resize", function () {
    canvas.width = Math.min(gamediv.clientWidth, gamediv.clientHeight) * 0.95;
    canvas.height = Math.min(gamediv.clientWidth, gamediv.clientHeight) * 0.95;
  });

  let context = canvas.getContext("2d");

  // clear the canvas
  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // draw a rectangle
  function drawRectangle(spec) {
    context.save();
    context.fillStyle = spec.fillStyle;
    context.strokeStyle = spec.strokeStyle;
    context.strokeRect(spec.x, spec.y, spec.width, spec.height);
    context.fillRect(spec.x, spec.y, spec.width, spec.height);
    context.restore();
  }

  // draw a circle
  function drawCircle(spec) {
    context.save();
    context.beginPath();
    context.arc(spec.x, spec.y, spec.radius, 0, 2 * Math.PI);
    context.fillStyle = spec.fillStyle;
    context.strokeStyle = spec.strokeStyle;
    context.fill();
    context.stroke();
    context.restore();
  }

  function drawScores(topScores) {
    drawRectangle({
      fillStyle: "rgba(0, 0, 0, 0.6)",
      strokeStyle: "black",
      x: (canvas.width * 5) / 6,
      y: canvas.height / 24,
      width: canvas.width / 6,
      height: (canvas.height * 6) / 24,
    });
    drawText({
      text: "TOP SCORES:",
      font: "12px Roboto",
      fillStyle: "white",
      strokeStyle: "white",
      position: { x: (canvas.width * 5) / 6, y: canvas.height / 24 },
    });
    for (let i = 0; i < 5; i++) {
      if (i < topScores.length) {
        drawText({
          text: `${i + 1}. ${topScores[i].name}: ${topScores[i].score}`,
          font: "12px Roboto",
          fillStyle: topScores[i].mySlinky ? "green" : "white",
          strokeStyle: topScores[i].mySlinky ? "green" : "white",
          position: {
            x: (canvas.width * 5) / 6,
            y: (canvas.height * (i + 2)) / 24,
          },
        });
      } else {
        drawText({
          text: `${i + 1}.`,
          font: "12px Roboto",
          fillStyle: "white",
          strokeStyle: "white",
          position: {
            x: (canvas.width * 5) / 6,
            y: (canvas.height * (i + 2)) / 24,
          },
        });
      }
    }
  }
  function drawMyGameOverPanel(topSpot, score, kills) {
    drawRectangle({
      fillStyle: "rgba(0, 0, 0, 0.7)",
      strokeStyle: "black",
      x: canvas.width / 8,
      y: canvas.height / 8,
      width: (canvas.width * 3) / 4,
      height: (canvas.height * 3) / 4,
    });
    drawRelativeText({
      text: "RESULTS",
      font: "24px Roboto",
      fillStyle: "white",
      strokeStyle: "white",
      position: { x: 0.5, y: 0.2 },
    });
    drawRelativeText({
      text: `Score: ${score}`,
      font: "24px Roboto",
      fillStyle: "white",
      strokeStyle: "white",
      position: { x: 0.5, y: 0.35 },
    });
    drawRelativeText({
      text: `Best Spot: ${topSpot}`,
      font: "24px Roboto",
      fillStyle: "white",
      strokeStyle: "white",
      position: { x: 0.5, y: 0.5 },
    });
    drawRelativeText({
      text: `Kills: ${kills}`,
      font: "24px Roboto",
      fillStyle: "white",
      strokeStyle: "white",
      position: { x: 0.5, y: 0.65 },
    });
    drawRelativeText({
      text: "Press [Esc] to return to Main Menu",
      font: "24px Roboto",
      fillStyle: "red",
      strokeStyle: "red",
      position: { x: 0.5, y: 0.8 },
    });
  }

  // draw the game background
  function drawBackground(player) {
    // draw grass
    let numTilesInScreen = Math.ceil(canvasSize_w / tileSize_w);
    let colMin = Math.max(
      0,
      Math.floor((player.center.x - canvasSize_w / 2) / tileSize_w),
    );
    let colMax = Math.min(boardSize_tiles, colMin + numTilesInScreen + 2);

    let rowMin = Math.max(
      0,
      Math.floor((player.center.y - canvasSize_w / 2) / tileSize_w),
    );
    let rowMax = Math.min(boardSize_tiles, rowMin + numTilesInScreen + 2);

    for (let row = rowMin; row < rowMax; row++) {
      for (let col = colMin; col < colMax; col++) {
        context.save();
        // context.drawImage(
        //   assets.grass,
        //   Math.ceil(
        //     ((col * tileSize_w - (player.center.x - canvasSize_w / 2)) *
        //       canvas.width) /
        //       canvasSize_w,
        //   ),
        //   Math.ceil(
        //     ((row * tileSize_w - (player.center.y - canvasSize_w / 2)) *
        //       canvas.width) /
        //       canvasSize_w,
        //   ),
        //   Math.ceil((tileSize_w * canvas.width) / canvasSize_w),
        //   Math.ceil((tileSize_w * canvas.width) / canvasSize_w),
        // );

        drawRectangle({
          fillStyle: "#8c67ff",
          strokeStyle: "",
          x: Math.ceil(
            ((col * tileSize_w - (player.center.x - canvasSize_w / 2)) *
              canvas.width) /
              canvasSize_w,
          ),
          y: Math.ceil(
            ((row * tileSize_w - (player.center.y - canvasSize_w / 2)) *
              canvas.width) /
              canvasSize_w,
          ),
          width: Math.ceil((tileSize_w * canvas.width) / canvasSize_w),
          height: Math.ceil((tileSize_w * canvas.width) / canvasSize_w),
        });
        context.restore();
      }
    }

    for (let row = rowMin; row < rowMax; row++) {
      for (let col = colMin; col < colMax; col++) {
        if (assets.tileMap[row][col] === 0) continue;
        context.save();

        drawRectangle({
          fillStyle: "#202020",
          strokeStyle: "black",
          x: Math.ceil(
            ((col * tileSize_w - (player.center.x - canvasSize_w / 2)) *
              canvas.width) /
              canvasSize_w,
          ),
          y: Math.ceil(
            ((row * tileSize_w - (player.center.y - canvasSize_w / 2)) *
              canvas.width) /
              canvasSize_w,
          ),
          width: Math.ceil((tileSize_w * canvas.width) / canvasSize_w),
          height: Math.ceil((tileSize_w * canvas.width) / canvasSize_w),
        });

        // context.drawImage(
        //   assets.tileSet[assets.tileMap[row][col]],
        //   Math.ceil(
        //     ((col * tileSize_w - (player.center.x - canvasSize_w / 2)) *
        //       canvas.width) /
        //       canvasSize_w,
        //   ),
        //   Math.ceil(
        //     ((row * tileSize_w - (player.center.y - canvasSize_w / 2)) *
        //       canvas.width) /
        //       canvasSize_w,
        //   ),
        //   Math.ceil((tileSize_w * canvas.width) / canvasSize_w),
        //   Math.ceil((tileSize_w * canvas.width) / canvasSize_w),
        // );
        context.restore();
      }
    }
  }

  // draw a texture from an image
  function drawTexture(image, center, rotation, size) {
    context.save();
    context.rotate(rotation);
    context.save();
    context.drawImage(
      image,
      0,
      0,
      256,
      256,
      center.x * canvas.width - (size * canvas.width) / 2,
      center.y * canvas.height - (size * canvas.height) / 2,
      size * canvas.width,
      size * canvas.height,
    );
    context.restore();
  }

  // draw a frame of the player
  function drawMyPlayer(myPlayer) {
    // let rendSize = size * 1.25;
    context.save();
    // context.translate(center.x * canvas.width, center.y * canvas.height);
    // context.rotate(rotation);
    // context.translate(-center.x, -center.y);
    // context.drawImage(
    //   image,
    //   center.x - (size.width * canvas.width) / 2,
    //   center.y - (size.height * canvas.height) / 2,
    //   size.width * canvas.width,
    //   size.height * canvas.height);

    context.save();
    // context.translate(0.5 * canvas.width, 0.5 * canvas.height);
    // context.translate(-center.x, -center.y);
    // context.drawImage(
    //   image, (frameNumber % 16) * 256,
    //   Math.floor(frameNumber / 16) * 256, 256, 256,
    //   (0.5 * canvas.width) - (rendSize * canvas.width / (2 * canvasSize_w)),
    //   (0.5 * canvas.height) - (1.5 * rendSize * canvas.height / (2 * canvasSize_w)),
    //   rendSize * canvas.width / canvasSize_w,
    //   rendSize * canvas.height / canvasSize_w
    // );

    // drawRectangle({
    //   fillStyle: "yellow",
    //   strokeStyle: "",
    //   x: (0.5 * canvas.width) - (size * canvas.width / (2 * canvasSize_w)),
    //   y: (0.5 * canvas.height) - (size * canvas.height / (2 * canvasSize_w)),
    //   width: size * canvas.width / canvasSize_w,
    //   height: size * canvas.height / canvasSize_w
    // });

    drawCircle({
      fillStyle: "#fff150",
      strokeStyle: "",
      x: 0.5 * canvas.width, // Center of canvas horizontally
      y: 0.5 * canvas.height, // Center of canvas vertically
      radius: (0.5 * myPlayer.radius * canvas.width) / canvasSize_w, // Radius proportional to canvas size
    });

    context.restore();
  }

  function drawOtherPlayer(myPlayer, otherPlayer) {
    // let rendSize = size * 1.25;

    let relX = (otherPlayer.state.center.x - myPlayer.center.x) / canvasSize_w;
    let relY = (otherPlayer.state.center.y - myPlayer.center.y) / canvasSize_w;

    context.save();
    // context.translate(center.x * canvas.width, center.y * canvas.height);
    // context.rotate(rotation);
    // context.translate(-center.x, -center.y);
    // context.drawImage(
    //   image,
    //   center.x - (size.width * canvas.width) / 2,
    //   center.y - (size.height * canvas.height) / 2,
    //   size.width * canvas.width,
    //   size.height * canvas.height);

    context.save();
    // context.translate(0.5 * canvas.width, 0.5 * canvas.height);
    // context.translate(-center.x, -center.y);
    // context.drawImage(
    //   image, (frameNumber % 16) * 256,
    //   Math.floor(frameNumber / 16) * 256, 256, 256,
    //   (0.5 * canvas.width) - (rendSize * canvas.width / (2 * canvasSize_w)),
    //   (0.5 * canvas.height) - (1.5 * rendSize * canvas.height / (2 * canvasSize_w)),
    //   rendSize * canvas.width / canvasSize_w,
    //   rendSize * canvas.height / canvasSize_w
    // );

    // drawRectangle({
    //   fillStyle: "yellow",
    //   strokeStyle: "",
    //   x: (0.5 * canvas.width) - (size * canvas.width / (2 * canvasSize_w)),
    //   y: (0.5 * canvas.height) - (size * canvas.height / (2 * canvasSize_w)),
    //   width: size * canvas.width / canvasSize_w,
    //   height: size * canvas.height / canvasSize_w
    // });

    drawCircle({
      fillStyle: "#ff00ff",
      strokeStyle: "",
      x: (relX + 0.5) * canvas.width,
      y: (relY + 0.5) * canvas.width,
      radius: (0.5 * otherPlayer.radius * canvas.width) / canvasSize_w, // Radius proportional to canvas size
    });

    context.restore();
  }

  function drawRelativeText(spec) {
    context.save();

    context.font = spec.font;
    context.fillStyle = spec.fillStyle;
    context.strokeStyle = spec.strokeStyle;
    context.textBaseline = "top";
    context.textBaseline = "middle";
    let width = context.measureText(spec.text).width;

    context.translate(
      spec.position.x * canvas.width - width / 2,
      spec.position.y * canvas.width,
    );

    context.fillText(spec.text, spec.position.x, spec.position.y);
    context.strokeText(spec.text, spec.position.x, spec.position.y);

    context.restore();
  }
  // draw text
  function drawText(spec) {
    context.save();

    context.font = spec.font;
    context.fillStyle = spec.fillStyle;
    context.strokeStyle = spec.strokeStyle;
    context.textBaseline = "top";

    context.translate(spec.position.x, spec.position.y);
    context.rotate(spec.rotation);
    context.translate(-spec.position.x, -spec.position.y);

    context.fillText(spec.text, spec.position.x, spec.position.y);
    context.strokeText(spec.text, spec.position.x, spec.position.y);

    context.restore();
  }

  let api = {
    get canvas() {
      return canvas;
    },
    clear: clear,
    drawBackground: drawBackground,
    drawRectangle: drawRectangle,
    drawCircle: drawCircle,
    drawTexture: drawTexture,
    drawMyPlayer: drawMyPlayer,
    drawOtherPlayer: drawOtherPlayer,
    drawText: drawText,
    drawRelativeText: drawRelativeText,
    drawScores: drawScores,
    drawMyGameOverPanel: drawMyGameOverPanel,
  };

  return api;
})(MyGame.assets);
