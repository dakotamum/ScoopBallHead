// renderer for a player
MyGame.renderer.player = (function (graphics, assets) {
  "use-strict";

  // render the player
  function render(spec) {
    // graphics.drawHead(spec);
    let row;
    switch (spec.moveDirectionToRender) {
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
    graphics.drawPlayerFrame(
      assets.coneman,
      row * 16 + Math.floor((spec.moveTime / 75) % 16),
      spec.center,
      0,
      spec.radius,
    );
  }

  return {
    render: render,
  };
})(MyGame.graphics, MyGame.assets);
