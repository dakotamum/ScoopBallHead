MyGame.renderer.player = (function (graphics, assets) {
  "use-strict";

  // render the player
  function renderMyPlayer(myPlayer) {
    graphics.drawMyPlayer(myPlayer);
  }

  return {
    renderMyPlayer: renderMyPlayer,
  };
})(MyGame.graphics, MyGame.assets);
