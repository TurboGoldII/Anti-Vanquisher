class Iceball extends Projectiles {  
  iceballTexture = null;

  constructor (player) {
    super(player);
    this.#shootIceball();
  }

  #iceballHitPlayer() {
    this.iceballTexture.destroy();
    this.iceballTexture = null;
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    $this.anims.remove('bobOmbTwitch');
    this.player.setTexture('frozenBobOmb');
    $this.input._events.pointermove = null;
    var gameID = $gameID
    setTimeout(() => {
      if (gameID !== $gameID) return;
      this.player.setTexture('bob_omb');
      $this.anims.create({
        key: 'bobOmbTwitch',
        frames: $this.anims.generateFrameNumbers('bob_omb', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
      });
      this.player.anims.play('bobOmbTwitch');
      $this.game.input.x =  this.player.x;
      $this.game.input.y =  this.player.y;
      $this.input.on('pointermove', limitPlayerMovement, $this);
    }, ICEBALL_FROZEN_TIME)
  }

  /**
   * Shoots a fireball in the players direction. The current implementation
   * increases the firerate exponentially because it is increased everytime a
   * certain amount of fireballs is shot.
   */
  #shootIceball() {
    var rndTurretPos = getRandomBorderPositionPosition();
  
    this.iceballTexture = $this.physics.add.image(
      rndTurretPos.x,
      rndTurretPos.y,
      'iceball'
    );
  
    this.iceballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);
    var that = this;
    $this.physics.add.collider(this.player, this.iceballTexture, function() { that.#iceballHitPlayer() });
  
    //The fireball shall fly to the players current position
    var dest = getVelocityToPlayer(rndTurretPos, this.player, PROJECTILE_VELOCITY * 0.75);

    this.iceballTexture.setVelocityX(dest.x);
    this.iceballTexture.setVelocityY(dest.y);
  
    //Removes the fireball texture after a time to keep the memory clean
    setTimeout(() => {
      if (this.iceballTexture) {
        this.iceballTexture.destroy();
      }
    }, FIREBALL_TTL);
  }
}

  /**
   * Sadly, these stage bounds here always have to be fine-tuned by the
   * programmer. Test it out, once the right textures are installed.
   * 
   * @param {object} pointer 
   */
   function limitPlayerMovement(pointer) {
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