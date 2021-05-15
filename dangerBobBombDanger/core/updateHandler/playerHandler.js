const handlePlayers = (data) => {
  data.players.forEach(player => {
    handlePlayerMovement(data, player);
  });
}

const handlePlayerMovement = (data, player) => {
  let mousePos = data.game.input.mousePointer;

  /*
   * The firefly moves independent of the frozen status. The clamping is a bad
   * solution but necessary for fluent mouse controls.
   */
  player.$data.firefly.x = Phaser.Math.Clamp(
    mousePos.x,
    FLOOR_EDGE_POINTS.topLeft.x,
    FLOOR_EDGE_POINTS.topRight.x
  );

  player.$data.firefly.y = Phaser.Math.Clamp(
    mousePos.y,
    FLOOR_EDGE_POINTS.topLeft.y,
    FLOOR_EDGE_POINTS.bottomLeft.y
  );

  player.$data.firefly.$data.light.x = player.$data.firefly.x;
  player.$data.firefly.$data.light.y = player.$data.firefly.y;

  if (player.isFrozen) {
    /* Player did not move this frame or is frozen */
    return;
  }

  player.x = player.$data.firefly.x;
  player.y = player.$data.firefly.y
  player.$data.light.x = player.x;
  player.$data.light.y = player.y;
}