// Loads assets and starts game
let loadAssets = (function () {
  "use-strict";
  let assetPaths = {
    grass: "assets/grass.png",
    head: "assets/head.png",
    bodyUpDown: "assets/body-up-down.png",
    bodyLeftRight: "assets/body-left-right.png"
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
