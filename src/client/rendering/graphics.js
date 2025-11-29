MyGame.graphics = (function (assets) {
  "use strict";
  let canvas = document.getElementById("game-canvas");
  let canvasSize_World = 8;
  let tileSize_World = 1;
  let numTiles_Width = 8;
  let gamediv = document.getElementById("game");

  canvas.width = Math.min(gamediv.clientWidth, gamediv.clientHeight) * 0.95;
  canvas.height = Math.min(gamediv.clientWidth, gamediv.clientHeight) * 0.95;
  let numPixelsPerTile = canvas.width / numTiles_Width;

  window.addEventListener("resize", function () {
    canvas.width = Math.min(gamediv.clientWidth, gamediv.clientHeight) * 0.95;
    canvas.height = Math.min(gamediv.clientWidth, gamediv.clientHeight) * 0.95;
    numPixelsPerTile = canvas.width / numTiles_Width;
    context.imageSmoothingEnabled = false;
  });

  let context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;

  // clear the canvas
  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawRectangle(spec) {
    context.save();
    context.fillStyle = spec.fillStyle;
    context.strokeStyle = spec.strokeStyle;
    context.strokeRect(spec.x, spec.y, spec.width, spec.height);
    context.fillRect(spec.x, spec.y, spec.width, spec.height);
    context.restore();
  }

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

  function drawBackground() {
    for (let i = 0; i < numTiles_Width; i++)
    {
      for (let j = 0; j < numTiles_Width; j++)
      {
        context.save();
        context.drawImage(
          assets.grass,
          j * numPixelsPerTile,
          i * numPixelsPerTile,
          numPixelsPerTile,
          numPixelsPerTile);
          context.save();
          context.restore();
      }
    }
  }

  function drawFood(food)
  {
    (food.coords.y);
    context.save();
    context.drawImage(
      assets.food,
      food.coords.x * numPixelsPerTile,
      food.coords.y * numPixelsPerTile,
      numPixelsPerTile,
      numPixelsPerTile);
      context.save();
      context.restore();
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
    context.drawImage(
      (myPlayer.snakePositions[0].heading == "down" ? assets.headDown : (myPlayer.snakePositions[0].heading == "up" ? assets.headUp : (myPlayer.snakePositions[0].heading == "left" ? assets.headLeft : assets.headRight))),
      (Math.round(myPlayer.snakePositions[0].x)) * numPixelsPerTile,
      (Math.round(myPlayer.snakePositions[0].y)) * numPixelsPerTile,
      myPlayer.width * numPixelsPerTile,
      myPlayer.height * numPixelsPerTile);

    myPlayer.snakePositions.forEach((value, i) => {
      if (i !== 0 && i != myPlayer.snakePositions.length - 1)
      {
        let asset;
        if (value.heading == "down")
        {
          if (myPlayer.snakePositions[i-1].heading == "right")
            asset = assets.bodyDownRight;
          else if (myPlayer.snakePositions[i-1].heading == "left")
            asset = assets.bodyRightUp;
          else
            asset = assets.bodyUpDown;
        }
        else if (value.heading == "up")
        {
          if (myPlayer.snakePositions[i-1].heading == "right")
            asset = assets.bodyUpRight;
          else if (myPlayer.snakePositions[i-1].heading == "left")
            asset = assets.bodyRightDown;
          else
            asset = assets.bodyUpDown;
        }
        else if (value.heading == "right")
        {
          if (myPlayer.snakePositions[i-1].heading == "up")
            asset = assets.bodyRightUp;
          else if (myPlayer.snakePositions[i-1].heading == "down")
            asset = assets.bodyRightDown;
          else
            asset = assets.bodyLeftRight;
        }
        else if (value.heading == "left")
        {
          if (myPlayer.snakePositions[i-1].heading == "up")
            asset = assets.bodyDownRight;
          else if (myPlayer.snakePositions[i-1].heading == "down")
            asset = assets.bodyUpRight;
          else
            asset = assets.bodyLeftRight;
        }
      context.drawImage(
        asset,
        (Math.round(value.x)) * numPixelsPerTile,
        (Math.round(value.y)) * numPixelsPerTile,
        myPlayer.width * numPixelsPerTile,
        myPlayer.height * numPixelsPerTile);
      }
    });

    {
      let asset;
      if (myPlayer.snakePositions[myPlayer.snakePositions.length - 1].heading == "down")
      {
        if (myPlayer.snakePositions[myPlayer.snakePositions.length - 2].heading == "left")
          asset = assets.tailRightUp;
        else if (myPlayer.snakePositions[myPlayer.snakePositions.length - 2].heading == "right")
          asset = assets.tailLeftUp;
        else
          asset = assets.tailUp;
      }
      else if (myPlayer.snakePositions[myPlayer.snakePositions.length - 1].heading == "up")
      {
        if (myPlayer.snakePositions[myPlayer.snakePositions.length - 2].heading == "left")
          asset = assets.tailRightDown;
        else if (myPlayer.snakePositions[myPlayer.snakePositions.length - 2].heading == "right")
          asset = assets.tailLeftDown;
        else
          asset = assets.tailDown;
      }
      else if (myPlayer.snakePositions[myPlayer.snakePositions.length - 1].heading == "left")
      {
        if (myPlayer.snakePositions[myPlayer.snakePositions.length - 2].heading == "up")
          asset = assets.tailDownRight;
        else if (myPlayer.snakePositions[myPlayer.snakePositions.length - 2].heading == "down")
          asset = assets.tailUpRight;
        else
          asset = assets.tailRight;
      }
      else if (myPlayer.snakePositions[myPlayer.snakePositions.length - 1].heading == "right")
      {
        if (myPlayer.snakePositions[myPlayer.snakePositions.length - 2].heading == "up")
          asset = assets.tailDownLeft;
        else if (myPlayer.snakePositions[myPlayer.snakePositions.length - 2].heading == "down")
          asset = assets.tailUpLeft;
        else
          asset = assets.tailLeft;
      }

      context.drawImage(
        asset,
        (Math.round(myPlayer.snakePositions[myPlayer.snakePositions.length - 1].x)) * numPixelsPerTile,
        (Math.round(myPlayer.snakePositions[myPlayer.snakePositions.length - 1].y)) * numPixelsPerTile,
        myPlayer.width * numPixelsPerTile,
        myPlayer.height * numPixelsPerTile);
    }

    //   x: (Math.round(myPlayer.center.x) - (myPlayer.width / 2)) * numActualPixelsPerPixel,
    //   y: (Math.round(myPlayer.center.y) - (myPlayer.height / 2)) * numActualPixelsPerPixel,
    //   width: myPlayer.width * numActualPixelsPerPixel,
    //   height: myPlayer.height * numActualPixelsPerPixel,

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
    //   fillStyle: "cyan",
    //   strokeStyle: "",
    //   x: (Math.round(myPlayer.center.x) - (myPlayer.width / 2)) * numActualPixelsPerPixel,
    //   y: (Math.round(myPlayer.center.y) - (myPlayer.height / 2)) * numActualPixelsPerPixel,
    //   width: myPlayer.width * numActualPixelsPerPixel,
    //   height: myPlayer.height * numActualPixelsPerPixel,
    // });

    // drawCircle({
    //   fillStyle: "#22a7d4",
    //   strokeStyle: "",
    //   x: 0.5 * canvas.width, // Center of canvas horizontally
    //   y: 0.5 * canvas.height, // Center of canvas vertically
    //   radius: (0.5 * myPlayer.radius * canvas.width) / canvasSize_w, // Radius proportional to canvas size
    // });

    context.restore();
  }

  function drawOtherPlayer(myPlayer, otherPlayer) {
    // let rendSize = size * 1.25;

    let relX = (otherPlayer.state.center.x - myPlayer.center.x) / canvasSize_World;
    let relY = (otherPlayer.state.center.y - myPlayer.center.y) / canvasSize_World;

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
      radius: (0.5 * otherPlayer.radius * canvas.width) / canvasSize_World, // Radius proportional to canvas size
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
    drawFood: drawFood,
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
