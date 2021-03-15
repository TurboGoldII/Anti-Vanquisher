class Fireball extends Projectiles {
  #player = null;

  constructor (player) {
    super(player);
    if (!player) {
      console.log('Warning: Can´t shoot fireball without player.');
      return;
    }
    this.#player = player;
    this.#shootFireball();
  }

  /**
   * Shoots a fireball in the players direction. The current implementation
   * increases the firerate exponentially because it is increased everytime a
   * certain amount of fireballs is shot.
   */
  #shootFireball() {  
    var rndTurretPos = Projectiles.getRandomBorderPositionPosition();
  
    var fireballTexture = $this.physics.add.image(
      rndTurretPos.x,
      rndTurretPos.y,
      'fireball'
    );
  
    fireballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);
    $this.physics.add.collider(this.#player, fireballTexture, Projectiles.projectileHitPlayer);
  
    //The fireball shall fly to the players current position
    var dest = this.getVelocityToPlayer(rndTurretPos);
  
    fireballTexture.setVelocityX(dest.x);
    fireballTexture.setVelocityY(dest.y);
  
    //Removes the fireball texture after a time to keep the memory clean
    setTimeout(() => {
      fireballTexture.destroy();
    }, FIREBALL_TTL);
  }
}