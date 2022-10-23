class Iceball extends Projectile {
  iceballTexture = null;
  #shootToPos = null;
  #game = null;

  constructor(shootToPos, collideWithPlayers, game) {
    super(collideWithPlayers);
    this.#shootToPos = shootToPos;
    this.#game = game;
    this.#shootIceball();
  }

  #iceballHitPlayer(player) {
    this.iceballTexture.destroy();
    this.iceballTexture = null;

    this.#game.anims.remove(player.$data.settings.sprite.name);

    if (player.$data.settings.frozenSprite) {
      player.setTexture(player.$data.settings.frozenSprite.name);

      if (player.$data.settings.frozenSprite.anim) {
        createPlayerAnimation(this.#game, player, player.$data.settings.frozenSprite);
      }
    }

    player.isFrozen = true;

    setGameTimeout(() => {
      if (player.$data.settings.frozenSprite && player.$data.settings.frozenSprite.anim) {
        this.#game.anims.remove(player.$data.settings.frozenSprite.name);
      }

      player.isFrozen = false;
      player.setTexture(player.$data.settings.sprite.name);
      createPlayerAnimation(this.#game, player, player.$data.settings.sprite);
    }, ICEBALL_FROZEN_TIME);
  }

  /**
   * Shoots a fireball in the players direction. The current implementation
   * increases the firerate exponentially because it is increased everytime a
   * certain amount of fireballs is shot.
   */
  #shootIceball() {
    var rndTurretPos = getRandomBorderPos();

    this.iceballTexture = this.#game.physics.add.sprite(
      rndTurretPos.x,
      rndTurretPos.y,
      'iceball'
    );

    this.iceballTexture.setImmovable();
    this.iceballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);

    var that = this;

    for (let i = 0; i < this.collideWithPlayers.length; i++) {
      this.#game.physics.add.collider(this.collideWithPlayers[i], this.iceballTexture, function () { that.#iceballHitPlayer(that.collideWithPlayers[i]) });
    }

    //The fireball shall fly to the players current position
    var dest = getVelocityToPlayer(rndTurretPos, this.#shootToPos, PROJECTILE_VELOCITY * 0.75);
    this.iceballTexture.setVelocity(dest.x, dest.y);

    //Removes the fireball texture after a time to keep the memory clean
    setTimeout(() => {
      if (this.iceballTexture) {
        this.iceballTexture.destroy();
      }
    }, FIREBALL_TTL * 2);
  }
}