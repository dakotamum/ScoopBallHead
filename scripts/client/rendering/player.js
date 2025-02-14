// renderer for a player
MyGame.renderer.player = (function (graphics, assets) {
  "use-strict";

  // render the player
  function renderMyPlayer(myPlayer) {
    let row;
    switch (myPlayer.moveDirectionToRender) {
      case "up":
        row = 3;
        break;
      case "down":
        row = 2;
        break;
      case "left":
        row = 1;
        break;
      case "right":
        row = 0;
        break;
    }
    graphics.drawMyPlayer(myPlayer);
  }

  function renderOtherPlayer(myPlayer, otherPlayer) {
    // let row;
    // switch (spec.moveDirectionToRender) {
    //   case "up":
    //     row = 3;
    //     break;
    //   case "down":
    //     row = 2;
    //     break;
    //   case "left":
    //     row = 1;
    //     break;
    //   case "right":
    //     row = 0;
    //     break;
    // }
    graphics.drawOtherPlayer(myPlayer, otherPlayer);
  }

  return {
    renderMyPlayer: renderMyPlayer,
    renderOtherPlayer: renderOtherPlayer,
  };
})(MyGame.graphics, MyGame.assets);
