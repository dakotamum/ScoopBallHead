// provides general methods for rendering to the canvas
MyGame.graphics = (function (assets) {
  "use strict";
  let canvas = document.getElementById("game-canvas");
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
    context.fillRect(spec.x, spec.y, spec.width, spec.height);
    context.strokeRect(spec.x, spec.y, spec.width, spec.height);
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
  // Can switch to translating but this works. Each edge coordinates get the diff added to them (first two are at 0,0)
  function drawBackground(head) {
    //top left
    let tileWidth = assets.tile_aqua.width;
    let tileHeight = assets.tile_aqua.height;
    let diffX = 0.5 - head.center.x;
    let diffY = 0.5 - head.center.y;
    drawRectangle({
      fillStyle: "red",
      strokeStyle: "black",
      x: canvas.width * diffX - tileWidth,
      y: canvas.height * diffY - tileHeight,
      width: WORLD_DIMENSIONS.width * canvas.width + (5 / 2) * tileWidth,
      height: WORLD_DIMENSIONS.height * canvas.height + (5 / 2) * tileHeight,
    });
    drawRectangle({
      fillStyle: "black",
      strokeStyle: "black",
      x: canvas.width * diffX,
      y: canvas.height * diffY,
      width: WORLD_DIMENSIONS.width * canvas.width,
      height: WORLD_DIMENSIONS.height * canvas.height,
    });
    for (
      let i = canvas.width * diffX;
      i < canvas.width + tileWidth &&
      i < canvas.width * (WORLD_DIMENSIONS.width + diffX);
      i += tileWidth
    ) {
      for (
        let j = canvas.height * diffY;
        j < canvas.height + tileHeight &&
        j < canvas.height * (WORLD_DIMENSIONS.height + diffY);
        j += tileHeight
      ) {
        context.drawImage(assets.tile_aqua, i, j, tileWidth, tileHeight);
      }
    }
  }

  // draw a circle
  function drawCircle(spec, invincible) {
    context.save();
    context.beginPath();
    context.arc(
      spec.center.x * canvas.width,
      spec.center.y * canvas.height,
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
    context.translate(center.x * canvas.width, center.y * canvas.height);
    context.rotate(rotation);
    context.translate(-center.x, -center.y);
    context.drawImage(
      image,
      center.x - (size.width * canvas.width) / 2,
      center.y - (size.height * canvas.height) / 2,
      size.width * canvas.width,
      size.height * canvas.height
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
    drawBackground: drawBackground,
    drawCircle: drawCircle,
    drawRectangle: drawRectangle,
    drawTexture: drawTexture,
    drawText: drawText,
    drawRelativeText: drawRelativeText,
    drawScores: drawScores,
    drawMyGameOverPanel: drawMyGameOverPanel,
    drawAbsoluteCircle: drawAbsoluteCircle,
    drawTriangle: drawTriangle,
  };

  return api;
})(MyGame.assets);
