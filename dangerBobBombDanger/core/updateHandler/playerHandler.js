const handlePlayers = (data) => {
  data.players.forEach(player => {
    handlePlayerMovement(data, player);
  });
}

const handlePlayerMovement = (data, player) => {
  let mousePos = data.game.input.mousePointer;
  let allowedDeviation = PLAYER_ALLOWED_DEVIATION_TO_POINTER;
  let velocityHandler = new VelocityHandler(player);

  if (
    player.isFrozen ||
    player.x > (mousePos.x - allowedDeviation) &&
    player.x < (mousePos.x + allowedDeviation) &&
    player.y > (mousePos.y - allowedDeviation) &&
    player.y < (mousePos.y + allowedDeviation)
  ) {
    /* Player did not move this frame or is frozen */
    velocityHandler.stop();
  } else {
    velocityHandler.shoot(mousePos, PLAYER_MOVEMENT_SPEED);

    /* 
     * TO-DO: Delete the clamping. I just left it in to make the game still
     * playable because my new movement system does not work as intended.
     */
    player.x = Phaser.Math.Clamp(
      mousePos.x,
      FLOOR_EDGE_POINTS.topLeft.x,
      FLOOR_EDGE_POINTS.topRight.x
    );

    player.y = Phaser.Math.Clamp(
      mousePos.y,
      FLOOR_EDGE_POINTS.topLeft.y,
      FLOOR_EDGE_POINTS.bottomLeft.y
    );
  }

  player.$data.light.x = player.x;
  player.$data.light.y = player.y;
}