// Loads assets and starts game
let loadAssets = (function () {
  "use-strict";
  let assetPaths = {
    // images and sound paths here
    // assetName: "path/to/asset"
    player: "assets/player.png",
    coneman: "assets/coneman.png",
    gameTitle: "assets/gameTitle.png",
    mainMenuMusic: "assets/mainMenuMusic.mp3",
    wallLeft: "assets/walls/wall_left.png",
    wallRight: "assets/walls/wall_right.png",
    wallTop: "assets/walls/wall_top.png",
    wallTopRight: "assets/walls/wall_top_right.png",
    wallTopLeft: "assets/walls/wall_top_left.png",
    wallBottom: "assets/walls/wall_bottom.png",
    wallBottomLeft: "assets/walls/wall_bottom_left.png",
    wallBottomRight: "assets/walls/wall_bottom_right.png",
    grass: "assets/grass.png"
  };
  let loadedAssets = 0;

  function assetLoaded() {
    loadedAssets++;
    if (loadedAssets >= assetPaths.length) {
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
  MyGame.game.initialize();
})();
