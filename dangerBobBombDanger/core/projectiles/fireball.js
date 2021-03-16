class Fireball extends Projectiles {
  constructor (player) {
    super(player);
    this.#shootFireball();
  }

  /**
   * Shoots a fireball in the players direction. The current implementation
   * increases the firerate exponentially because it is increased everytime a
   * certain amount of fireballs is shot.
   */
  #shootFireball() {
    var rndTurretPos = getRandomBorderPositionPosition();
  
    var fireballTexture = $this.physics.add.image(
      rndTurretPos.x,
      rndTurretPos.y,
      'fireball'
    );

    var that = this;
    fireballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);
    $this.physics.add.collider(this.player, fireballTexture, function() { that.projectileHitPlayer() });
    //The fireball shall fly to the players current position
    var dest = getVelocityToPlayer(rndTurretPos, this.player);
  
    fireballTexture.setVelocityX(dest.x);
    fireballTexture.setVelocityY(dest.y);
  
    //Removes the fireball texture after a time to keep the memory clean
    setTimeout(() => {
      fireballTexture.destroy();
    }, FIREBALL_TTL);
  }
}