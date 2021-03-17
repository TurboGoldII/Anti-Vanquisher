const handlerCreate = function(p) {
  ++$gameID;
  $soundHandler = new SoundHandler();
  $soundHandler.playBackgroundMusic();
  $this.add.image(GAME_CENTER.x, GAME_CENTER.y, 'lava');
  $player = $this.physics.add.sprite(FLOOR_CENTER.x, FLOOR_CENTER.y, 'bobOmb');
  $player.setScale(2.4);
  $player.setSize(PLAYER_HITBOX.x, PLAYER_HITBOX.y);
  $player.setOffset(PLAYER_HITBOX_OFFSET.x, PLAYER_HITBOX_OFFSET.y);

  /*
   * TO-DO: The current implementation sticks the player to the mouse. By
   * leaving the canvas with the mouse, the player character can be
   * teleported. A better implementation would be to accellerate the players
   * movement into the mouse cursors direction.
   */
  $this.input.on('pointermove', limitPlayerMovement);
  scoreSingleton.init(p.queues);
  createAnimations();
}

/**
 * Sadly, these stage bounds here always have to be fine-tuned by the
 * programmer. Test it out, once the right textures are installed.
 * 
 * @param {object} pointer 
 */
  const limitPlayerMovement = function(pointer) {
  $player.x = Phaser.Math.Clamp(
    pointer.x,
    FLOOR_EDGE_POINTS.topLeft.x,
    FLOOR_EDGE_POINTS.topRight.x
  );

  $player.y = Phaser.Math.Clamp(
    pointer.y,
    FLOOR_EDGE_POINTS.topLeft.y,
    FLOOR_EDGE_POINTS.bottomLeft.y
  );
}

const createAnimations = function() {
  $this.anims.create({
    key: 'bobOmbTwitch',
    frames: $this.anims.generateFrameNumbers('bob_omb', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  $player.anims.play('bobOmbTwitch');

  $this.anims.create({
    key: 'crystalBuild',
    frames: $this.anims.generateFrameNumbers('crystal', { start: 0, end: 2 }),
    frameRate: 1
  });

  $this.anims.create({
    key: 'firelaserBuilding',
    frames: $this.anims.generateFrameNumbers('firelaser_building', { start: 0, end: 2 }),
    frameRate: 1
  });

  $this.anims.create({
    key: 'firelaserShooting',
    frames: $this.anims.generateFrameNumbers('firelaser_full_size', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
}