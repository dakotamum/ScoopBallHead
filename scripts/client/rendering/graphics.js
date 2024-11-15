// provides general methods for rendering to the canvas
MyGame.graphics = (function (assets) {
  "use strict";
  let canvas = document.getElementById("game-canvas");
  let canvasSize_w = 0.5;
  let tileSize_w = 1.0 / 9;
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
    // context.strokeStyle = spec.strokeStyle;
    context.fillRect(spec.x, spec.y, spec.width, spec.height);
    // context.strokeRect(spec.x, spec.y, spec.width, spec.height);
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

  // draw the bottom wall
  function drawBottomWall(player) {
    // draw bottom wall
    for (let col = 0; col < 9; col++) {
      let row = 9;
      context.save();
      context.drawImage(
        assets.wallBottom, 
        Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w)
      );
      context.restore();
    }
    // draw bottom-left corner
    {
      let row = 9;
      let col = -1;
      context.save();
      context.drawImage(
        assets.wallBottomLeft, 
        Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w)
      );
      context.restore();
    }
    // draw bottom-right corner
    {
      let row = 9;
      let col = 9;
      context.save();
      context.drawImage(
        assets.wallBottomRight, 
        Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w)
      );
      context.restore();
    }
  }

  // draw the game background
  // Can switch to translating but this works. Each edge coordinates get the diff added to them (first two are at 0,0)
  function drawBackground(player) {

    // //top left
    // let tileSize_w = 1 / 9;
    // let diffX = 0.5 - head.center.x;
    // let diffY = 0.5 - head.center.y;

    for (let row = -1; row < 10; row++) {
      for (let col = -1; col < 10; col++) {
        const r = (row * 12345 + col * 6789) % 256;
        const g = (row * 6789 + col * 12345) % 256;
        const b = (row * 3333 + col * 4444) % 256;
        // Convert each component to a two-digit hex and combine
        let color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        drawRectangle({
          fillStyle: "#00ff2f",
          strokeStyle: "",
          x: Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
          y: Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
          width: Math.ceil(tileSize_w * canvas.width / canvasSize_w),
          height: Math.ceil(tileSize_w * canvas.width / canvasSize_w)
        });
      }
    }

    // draw left wall
    for (let row = 0; row < 9; row++) {
      let col = -1;
      context.save();
      context.drawImage(
        assets.wallLeft, 
        Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w)
      );
      context.restore();
    }

    // draw right wall
    for (let row = 0; row < 9; row++) {
      let col = 9;
      context.save();
      context.drawImage(
        assets.wallRight, 
        Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w)
      );
      context.restore();
    }

    // draw top wall
    for (let col = 0; col < 9; col++) {
      let row = -1;
      context.save();
      context.drawImage(
        assets.wallTop, 
        Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w)
      );
      context.restore();
    }

    // draw top-right wall
    {
      let row = -1;
      let col = 9;
      context.save();
      context.drawImage(
        assets.wallTopRight, 
        Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w)
      );
      context.restore();
    }

    // draw top-left wall
    {
      let row = -1;
      let col = -1;
      context.save();
      context.drawImage(
        assets.wallTopLeft, 
        Math.ceil((((col * tileSize_w) - (player.center.x - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil((((row * tileSize_w) - (player.center.y - (canvasSize_w / 2))) * canvas.width / canvasSize_w)),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w),
        Math.ceil(tileSize_w * canvas.width / canvasSize_w)
      );
      context.restore();
    }


    // drawRectangle({
    //   fillStyle: "red",
    //   strokeStyle: "black",
    //   x: 0 - ((player.center.x - (canvasSize_w / 2)) * canvas.width / canvasSize_w),
    //   y: 0 - ((player.center.y - (canvasSize_w / 2)) * canvas.width / canvasSize_w),
    //   width: tileSize_w * canvas.width / canvasSize_w,
    //   height: tileSize_w * canvas.width / canvasSize_w
    // });

    // drawRectangle({
    //   fillStyle: "black",
    //   strokeStyle: "black",
    //   x: canvas.width * diffX,
    //   y: canvas.height * diffY,
    //   width: WORLD_DIMENSIONS.width * canvas.width,
    //   height: WORLD_DIMENSIONS.height * canvas.height,
    // });
    // for (
    //   let i = canvas.width * diffX;
    //   i < canvas.width + tileWidth &&
    //   i < canvas.width * (WORLD_DIMENSIONS.width + diffX);
    //   i += tileWidth
    // ) {
    //   for (
    //     let j = canvas.height * diffY;
    //     j < canvas.height + tileHeight &&
    //     j < canvas.height * (WORLD_DIMENSIONS.height + diffY);
    //     j += tileHeight
    //   ) {
    //     context.drawImage(assets.tile_aqua, i, j, tileWidth, tileHeight);
    //   }
    // }
  }

  // draw a circle
  function drawHead(spec, invincible) {
    context.save();
    context.beginPath();
    context.arc(
      spec.center.x * canvas.width,
      spec.center.y * canvas.height - spec.radius * canvas.height / 2,
      spec.radius * canvas.width,
      0,
      2 * Math.PI
    );
    context.closePath();
    context.fillStyle = "magenta";
    context.strokeStyle = "black";
    if (spec.fill && !invincible) context.fillStyle = spec.fill;
    else context.fillStyle = "rgba(0,0,0,0.5)";
    if (spec.stroke && !invincible) context.strokeStyle = spec.stroke;
    context.fill();
    context.stroke();
    context.restore();
  }

  function drawTriangle(tri, angle) {
    context.save();
    context.translate(
      tri.center.x * canvas.width,
      tri.center.y * canvas.height
    );
    context.rotate(angle);
    context.translate(
      -tri.center.x * canvas.width,
      -tri.center.y * canvas.height
    );

    context.beginPath();

    context.moveTo(
      tri.center.x * canvas.width - canvas.width / 32,
      tri.center.y * canvas.height - canvas.height / 32
    );
    context.lineTo(
      tri.center.x * canvas.width + canvas.width / 32,
      tri.center.y * canvas.height - canvas.height / 32
    );
    context.lineTo(
      tri.center.x * canvas.width,
      tri.center.y * canvas.height + canvas.height / 32
    );

    context.closePath();

    context.fillStyle = "rgba(0, 0, 255, 1)";
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = "rgba(255, 0, 0, 1)";
    context.stroke();

    context.restore();
  }

  function drawAbsoluteCircle(spec) {
    context.save();
    context.beginPath();
    context.arc(spec.center.x, spec.center.y, spec.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "magenta";
    if (spec.fill) context.fillStyle = spec.fill;
    context.fill();
    // }
    // if (spec.stroke) {
    context.strokeStyle = "black";
    context.stroke();
    // }
    context.restore();
  }

  // draw a texture from an image
  function drawTexture(image, center, rotation, size) {
    context.save();
    // context.translate(center.x * canvas.width, center.y * canvas.height);
    context.rotate(rotation);
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
    context.drawImage(
      image,
      0, 0, 256, 256,
      (center.x * canvas.width) - size * canvas.width / 2,
      (center.y * canvas.height) - size * canvas.height / 2,
      size * canvas.width,
      size * canvas.height
    );
    context.restore();
  }

  // draw a frame of the player
  function drawPlayerFrame(image, frameNumber, center, rotation, size) {
    context.save();
    // context.translate(center.x * canvas.width, center.y * canvas.height);
    context.rotate(rotation);
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
    context.drawImage(
      image, (frameNumber % 16) * 256,
      Math.floor(frameNumber / 16) * 256, 256, 256,
      (0.5 * canvas.width) - (size * canvas.width / (2 * canvasSize_w)),
      (0.5 * canvas.height) - (size * canvas.height / (2 * canvasSize_w)),
      size * canvas.width / canvasSize_w,
      size * canvas.height / canvasSize_w
    );
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
      spec.position.y * canvas.width
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
    drawBottomWall: drawBottomWall,
    drawBackground: drawBackground,
    drawHead: drawHead,
    drawRectangle: drawRectangle,
    drawTexture: drawTexture,
    drawPlayerFrame: drawPlayerFrame,
    drawText: drawText,
    drawRelativeText: drawRelativeText,
    drawScores: drawScores,
    drawMyGameOverPanel: drawMyGameOverPanel,
    drawAbsoluteCircle: drawAbsoluteCircle,
    drawTriangle: drawTriangle,
  };

  return api;
})(MyGame.assets);
