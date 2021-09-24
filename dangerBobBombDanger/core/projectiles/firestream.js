class Firestream extends Projectile {
  #game = null;
  #projectileHitPlayer = null;
  #buildLaserSfx = null;
  #initFirestreamSfx = null;
  #shootFirestreamSfx = null;
  static #volume = SOUND_VOLUME / 2;


  constructor(collideWithPlayers, game) {
    super(collideWithPlayers);
    this.#game = game;
    this.#projectileHitPlayer = this.projectileHitPlayer;
    this.#buildLaserSfx = new SoundHandler('buildLaserSfx', { volume: Firestream.#volume });
    this.#initFirestreamSfx = new SoundHandler('initFirestreamSfx', { volume: Firestream.#volume });
    this.#shootFirestreamSfx = new SoundHandler('shootFirestreamSfx', { volume: Firestream.#volume });
    this.#buildLaserCrystal();
  }

  #buildLaserCrystal() {
    this.#buildLaserSfx.play({ loop: false });
    var streamPos = calculateStreamStartPos();
    var laserCrystal = this.#game.add.sprite(streamPos.x, streamPos.y, 'crystal');
    laserCrystal.setScale(1.3);
    laserCrystal.setPipeline('Light2D');
    laserCrystal.anims.play('crystal');

    setGameTimeout(() => {
      this.#initFirestream(laserCrystal, streamPos);
      this.#buildLaserSfx.destroy();
    }, CRYSTAL_BUILDING_TIME, () => {
      laserCrystal.destroy();
      this.#buildLaserSfx.destroy();
    });
  }

  #initFirestream(laserCrystal, streamPos) {
    this.#initFirestreamSfx.play({ loop: false });
    var firestreamBuilding = this.#game.physics.add.sprite(
      streamPos.x + FIRESTREAM_OFFSET.x,
      streamPos.y + FIRESTREAM_OFFSET.y,
      'firelaser_building'
    );

    firestreamBuilding.setScale(2);
    firestreamBuilding.setPipeline('Light2D');
    firestreamBuilding.anims.play('firelaser_building');

    firestreamBuilding.setImmovable();

    firestreamBuilding.setSize(
      FIRESTREAM_BUILDING_HITBOX.x,
      FIRESTREAM_BUILDING_HITBOX.y
    );

    var that = this;

    for (let i = 0; i < this.collideWithPlayers.length; i++) {
      this.#game.physics.add.collider(
        this.collideWithPlayers[i],
        firestreamBuilding,
        () => { that.#projectileHitPlayer() }
      );
    }

    setGameTimeout(
      () => {
        this.#shootFirestream(laserCrystal, streamPos, firestreamBuilding);
        this.#buildLaserSfx.destroy();
      },
      FIRESTREAM_INIT_TIME,
      () => {
        laserCrystal.destroy();
        firestreamBuilding.destroy();
        this.#buildLaserSfx.destroy();
      }
    );
  }

  #shootFirestream(laserCrystal, streamPos, firestreamBuilding) {
    this.#shootFirestreamSfx.play();
    var firestreamShooting = this.#game.physics.add.sprite(
      streamPos.x + FIRESTREAM_OFFSET.x,
      streamPos.y + FIRESTREAM_OFFSET.y,
      'firelaser_full_size'
    );

    firestreamShooting.setScale(2);
    firestreamShooting.setPipeline('Light2D');
    firestreamShooting.anims.play('firelaser_full_size');
    firestreamShooting.setImmovable();
    firestreamShooting.setSize(FIRESTREAM_HITBOX.x, FIRESTREAM_HITBOX.y);
    firestreamShooting.setOffset(FIRESTREAM_HITBOX_OFFSET.x, FIRESTREAM_HITBOX_OFFSET.y);
    firestreamBuilding.destroy();
    var that = this;

    for (let i = 0; i < this.collideWithPlayers.length; i++) {
      this.#game.physics.add.collider(
        this.collideWithPlayers[i],
        firestreamShooting,
        function () { that.projectileHitPlayer() }
      );
    }

    setTimeout(() => {
      laserCrystal.destroy();
      firestreamShooting.destroy();
      this.#shootFirestreamSfx.destroy();
    }, FIRESTREAM_SHOOTING_TIME);
  }
}

const isAllowedToShootFirestream = function (game) {
  //Convert fire rate into seconds for next stream
  var intervalForNextShot = 1 / FIRESTREAM_FIRE_RATE;
  return isSecondsPassed(intervalForNextShot, game.game);
};

const calculateStreamStartPos = function () {
  var rangeXAxle = (FLOOR_EDGE_POINTS.topRight.x - FIRESTREAM_STAGE_OFFSET)
    - (FLOOR_EDGE_POINTS.topLeft.x + FIRESTREAM_STAGE_OFFSET);

  var randomStart = Math.floor(Math.random() * rangeXAxle);

  return {
    x: (FLOOR_EDGE_POINTS.topLeft.x + FIRESTREAM_STAGE_OFFSET) + randomStart,
    y: 52
  }
};

const FIRESTREAM_OFFSET = {
  x: -3.5,
  y: 384
};