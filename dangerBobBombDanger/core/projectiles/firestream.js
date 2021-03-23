class Firestream extends Projectiles {
  constructor (player, EventBus) {
    super(player, EventBus);
    this.#buildLaserCrystal();
  }

  #buildLaserCrystal() {
    var streamPos = calculateStreamStartPos();
    var laserCrystal = $this.add.sprite(streamPos.x, streamPos.y, 'crystal');
    laserCrystal.setScale(1.3);
    laserCrystal.anims.play('crystalBuild');
    SetTimeout(() => {
      this.#initFirestream(laserCrystal, streamPos);
    }, CRYSTAL_BUILDING_TIME, () => {
      laserCrystal.destroy();
    });
  }

  #initFirestream(laserCrystal, streamPos) {
    var firestreamBuilding = $this.physics.add.sprite(
      streamPos.x + FIRESTREAM_OFFSET.x,
      streamPos.y + FIRESTREAM_OFFSET.y,
      'firelaser_building'
    );
  
    firestreamBuilding.setScale(2);
    firestreamBuilding.anims.play('firelaserBuilding');
  
    firestreamBuilding.setSize(
      FIRESTREAM_BUILDING_HITBOX.x,
      FIRESTREAM_BUILDING_HITBOX.y
    );
    var that = this;
    $this.physics.add.collider($player, firestreamBuilding, function() { that.projectileHitPlayer() });
    
    SetTimeout(() => {
      this.#shootFirestream(laserCrystal, streamPos, firestreamBuilding);
    }, FIRESTREAM_INIT_TIME, () => {
      laserCrystal.destroy();
      firestreamBuilding.destroy();
    });
  }

  #shootFirestream(laserCrystal, streamPos, firestreamBuilding) {
    var firestreamShooting = $this.physics.add.sprite(
      streamPos.x + FIRESTREAM_OFFSET.x,
      streamPos.y + FIRESTREAM_OFFSET.y,
      'firelaser_full_size'
    );
  
    firestreamShooting.setScale(2);
    firestreamShooting.anims.play('firelaserShooting');
  
    firestreamShooting.setSize(
      FIRESTREAM_HITBOX.x,
      FIRESTREAM_HITBOX.y
    );
  
    firestreamBuilding.destroy();
    var that = this;
    $this.physics.add.collider($player, firestreamShooting, function() { that.projectileHitPlayer() });
  
    setTimeout(() => {
      laserCrystal.destroy();
      firestreamShooting.destroy();
    }, FIRESTREAM_SHOOTING_TIME);
  }
}

const isAllowedToShootFirestream = function() {
    //Convert fire rate into seconds for next stream
    var intervalForNextShot = 1 / FIRESTREAM_FIRE_RATE;
    return isSecondsPassed(intervalForNextShot, $this.game);
  };

const calculateStreamStartPos = function() {
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