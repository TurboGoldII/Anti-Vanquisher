//The firerate is fireRate per second
var fireRate = FIREBALL_START_FIRE_RATE;
var fireballsShot = 0;

function isAllowedToShootFireball() {
  //Convert fire rate into seconds for next shot
  var intervalForNextShot = 1 / fireRate;
  return isSecondsPassed(intervalForNextShot, $this.game);
}

function fireballHitPlayer() {
  $score = 0;
  $soundHandler.stopBackgroundMusic();
  fireRate = FIREBALL_START_FIRE_RATE;
  //Destroy registry
  $this.registry.destroy();
  //Disable all active events
  $this.events.off();
  //Restart current scene
  $this.scene.restart();
}

function getRandomFireballTurretPosition() {
  var x = 0;
  var y = 0;

  if (Math.random() < 0.5) {
    y = Math.floor(Math.random() * GAME_HEIGHT * 100) % GAME_HEIGHT;

    if (Math.random() < 0.5) {
      x = FIREBALL_TURRET_POSITIONS.x.left;
    } else {
      x = FIREBALL_TURRET_POSITIONS.x.right;
    }
  } else {
    x = Math.floor(Math.random() * GAME_WIDTH * 100) % GAME_WIDTH;

    if (Math.random() < 0.5) {
      y = FIREBALL_TURRET_POSITIONS.y.top;
    } else {
      y = FIREBALL_TURRET_POSITIONS.y.bottom;
    }
  }

  return { x: x, y: y };
}

/**
 * Shoots a fireball in the players direction. The current implementation
 * increases the firerate exponentially because it is increased everytime a
 * certain amount of fireballs is shot.
 */
function shootFireball() {
  ++fireballsShot;

  if (fireballsShot === FIREBALL_FIRE_RATE_OFFSET_BEFORE_INCREASE) {
    fireballsShot = 0;
    fireRate += FIREBALL_FIRE_RATE_INCREMENT;
  }

  var rndTurretPos = getRandomFireballTurretPosition();

  var fireballTexture = $this.physics.add.image(
    rndTurretPos.x,
    rndTurretPos.y,
    'fireball'
  );

  fireballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);
  $this.physics.add.collider($player, fireballTexture, fireballHitPlayer);

  //The fireball shall fly to the players current position
  var dest = {
    x: $player.x,
    y: $player.y
  };

  var angle = {
    x: dest.x - rndTurretPos.x,
    y: dest.y - rndTurretPos.y
  };

  var speedX = Math.abs(angle.x);
  var speedY = Math.abs(angle.y);

  var speedMultiplier = Math.sqrt(
    (FIREBALL_VELOCITY ** 2) /
    ((speedX ** 2) + (speedY ** 2))
  );

  fireballTexture.setVelocityX(angle.x * speedMultiplier);
  fireballTexture.setVelocityY(angle.y * speedMultiplier);

  //Removes the fireball texture after a time to keep the memory clean
  setTimeout(() => {
    fireballTexture.destroy();
  }, FIREBALL_TTL);
}

function isAllowedToShootFirestream() {
  //Convert fire rate into seconds for next stream
  var intervalForNextShot = 1 / FIRESTREAM_FIRE_RATE;
  return isSecondsPassed(intervalForNextShot, $this.game);
}

function buildLaserCrystal() {
  var streamPos = calculateStreamStartPos();
  var laserCrystal = $this.add.sprite(streamPos.x, streamPos.y, 'crystal');
  laserCrystal.setScale(1.3);
  laserCrystal.anims.play('crystalBuild');

  setTimeout(() => {
    initFirestream(laserCrystal, streamPos);
  }, CRYSTAL_BUILDING_TIME);
}

function calculateStreamStartPos() {
  var rangeXAxle = (FLOOR_EDGE_POINTS.topRight.x - FIRESTREAM_STAGE_OFFSET)
    - (FLOOR_EDGE_POINTS.topLeft.x + FIRESTREAM_STAGE_OFFSET);

  var randomStart = Math.floor(Math.random() * rangeXAxle);

  return {
    x: (FLOOR_EDGE_POINTS.topLeft.x + FIRESTREAM_STAGE_OFFSET) + randomStart,
    y: 52
  }
}

const FIRESTREAM_OFFSET = {
  x: -3.5,
  y: 384
};

function initFirestream(laserCrystal, streamPos) {
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

  $this.physics.add.collider($player, firestreamBuilding, fireballHitPlayer);

  setTimeout(() => {
    shootFirestream(laserCrystal, streamPos, firestreamBuilding);
  }, FIRESTREAM_INIT_TIME)
}

function shootFirestream(laserCrystal, streamPos, firestreamBuilding) {
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
  $this.physics.add.collider($player, firestreamShooting, fireballHitPlayer);

  setTimeout(() => {
    laserCrystal.destroy();
    firestreamShooting.destroy();
  }, FIRESTREAM_SHOOTING_TIME);
}