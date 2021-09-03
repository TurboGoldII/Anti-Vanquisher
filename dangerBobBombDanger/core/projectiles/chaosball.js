class Chaosball extends Projectile {
  static numberOfChaosBalls = 0;
  static maxNumberOfChaosBalls = 999;
  #data = null
  #projectileHitPlayer = null
  #chaosballTexture = null
  #timeBetweenDirectionChange = 1000

  constructor(collideWithPlayers, data) {
    super(collideWithPlayers);
    ++Chaosball.numberOfChaosBalls;
    this.#data = data;
    this.#projectileHitPlayer = this.projectileHitPlayer;
    this.#generateChaosball(collideWithPlayers);
    this.#shootChaosballToPlayer();
  }

  static reset() {
    Chaosball.numberOfChaosBalls = 0;
  }

  #generateChaosball(collideWithPlayers) {
    const that = this;
    var rndTurretPos = getRandomBorderPos();

    this.#chaosballTexture = this.#data.game.physics.add.sprite(
      rndTurretPos.x,
      rndTurretPos.y,
      'chaosball'
    );

    this.#chaosballTexture.setImmovable();

    this.#chaosballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);

    for (let i = 0; i < this.collideWithPlayers.length; i++) {
      this.#data.game.physics.add.collider(collideWithPlayers[i], this.#chaosballTexture, function () { that.#projectileHitPlayer() });
    }
  }

  #shootChaosballToPlayer() {
    const shootToPos = { x: this.#data.players[0].x, y: this.#data.players[0].y };
    VelocityHandler.shoot(this.#chaosballTexture, shootToPos, PROJECTILE_VELOCITY);

    if (this.#chaosballTexture) {
      setTimeout((that) => {
        that.#shootChaosballRandom();
      }, this.#timeBetweenDirectionChange, this);
    }
  }

  #shootChaosballRandom() {
    if (getRandomNumber(0, 1) < 0.5) {
      const sign = [{ x: 1, y: 1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }]
      const index = Math.floor(getRandomNumber(0, 4));
      const shootToPos = { x: sign[index].x * this.#data.players[0].x, y: sign[index].y * this.#data.players[0].y };
      VelocityHandler.shoot(this.#chaosballTexture, shootToPos, PROJECTILE_VELOCITY);
    }

    if (!this.#outOfBounds() && this.#chaosballTexture) {
      setTimeout((that) => {
        that.#shootChaosballRandom();
      }, this.#timeBetweenDirectionChange * Math.floor(getRandomNumber(0, 4)), this);
    }
  }

  #outOfBounds() {
    if (this.#chaosballTexture.x > GAME_WIDTH || this.#chaosballTexture.x < 0 || this.#chaosballTexture.y < 0 || this.#chaosballTexture.y > GAME_HEIGHT) {
      --Chaosball.numberOfChaosBalls;
      this.#chaosballTexture.destroy();
      this.#chaosballTexture = null;
      return true;
    }

    return false;
  }

}