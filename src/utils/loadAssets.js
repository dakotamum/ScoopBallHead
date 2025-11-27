// Loads assets and starts game
let loadAssets = (function () {
  "use-strict";
  let assetPaths = {
    grass: "assets/grass.png",
    headUp: "assets/head-up.png",
    headDown: "assets/head-down.png",
    headLeft: "assets/head-left.png",
    headRight: "assets/head-right.png",
    bodyUpDown: "assets/body-up-down.png",
    bodyLeftRight: "assets/body-left-right.png",
    bodyRightDown: "assets/body-right-down.png",
    bodyRightUp: "assets/body-right-up.png",
    bodyUpRight: "assets/body-up-right.png",
    bodyDownRight: "assets/body-down-right.png",
    bodyRightDown: "assets/body-right-down.png",
    tailUp: "assets/tail-up.png",
    tailDown: "assets/tail-down.png",
    tailLeft: "assets/tail-left.png",
    tailRight: "assets/tail-right.png",
    tailRightDown: "assets/tail-right-down.png",
    tailLeftUp: "assets/tail-left-up.png",
    tailRightUp: "assets/tail-right-up.png",
    tailDownLeft: "assets/tail-down-left.png",
    tailUpLeft: "assets/tail-up-left.png",
    tailDownRight: "assets/tail-down-right.png",
    tailUpRight: "assets/tail-up-right.png",
    tailLeftDown: "assets/tail-left-down.png",
  };
  let loadedAssets = 0;
  let assetCount = Object.keys(assetPaths).length;

  function assetLoaded() {
    loadedAssets++;
    if (loadedAssets >= assetCount) {
      // all assets loaded, initialize the game
      MyGame.game.initialize();
    }
  }

  for (let key in assetPaths) {
    if (assetPaths[key].endsWith(".png")) {
      MyGame.assets[key] = new Image();
      MyGame.assets[key].src = assetPaths[key];
      MyGame.assets[key].onload = assetLoaded;
    } else if (assetPaths[key].endsWith(".mp3")) {
      MyGame.assets[key] = new Audio();
      MyGame.assets[key].src = assetPaths[key];
      MyGame.assets[key].onload = assetLoaded;
      MyGame.assets[key].canplay = assetLoaded;
    }
  }
})();
