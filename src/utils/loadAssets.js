// Loads assets and starts game
let loadAssets = (function () {
  "use-strict";
  let assetPaths = {
    grass: "assets/grass.png",
    player1: "assets/player1.png"
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
