class Fireball extends Projectile {
  #shootToPos = null;
  #game = null;
  #projectileHitPlayer = null;

  constructor(shootToPos, collideWithPlayers, game) {
    super(collideWithPlayers);
    this.#shootToPos = shootToPos;
    this.#game = game;
    this.#projectileHitPlayer = this.projectileHitPlayer;
    this.#shootFireball();
  }

  /**
   * Shoots a fireball in the players direction. The current implementation
   * increases the firerate exponentially because it is increased everytime a
   * certain amount of fireballs is shot.
   */
  #shootFireball() {
    var rndTurretPos = getRandomBorderPos();

    var fireballTexture = this.#game.physics.add.image(
      rndTurretPos.x,
      rndTurretPos.y,
      'fireball'
    );

    fireballTexture.setPipeline('Light2D');
    fireballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);
    fireballTexture.setImmovable();

    var that = this;

    for (let i = 0; i < this.collideWithPlayers.length; i++) {
      this.#game.physics.add.collider(this.collideWithPlayers[i], fireballTexture, function () { that.#projectileHitPlayer() });
    }

    // The fireball shall fly to the players current position
    var dest = getVelocityToPlayer(rndTurretPos, this.#shootToPos);

    fireballTexture.setVelocityX(dest.x);
    fireballTexture.setVelocityY(dest.y);

    // Removes the fireball texture after a time to keep the memory clean
    setTimeout(() => {
      fireballTexture.destroy();
    }, FIREBALL_TTL);
  }
}