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

function initFirestream(laserCrystal, streamPos) {
  var firelaserBuilding = $this.physics.add.sprite(
    streamPos.x - 3.5,
    streamPos.y + 384,
    'firelaser_building'
  );

  firelaserBuilding.setScale(2);
  firelaserBuilding.anims.play('firelaserBuilding');
  $this.physics.add.collider($player, firelaserBuilding, fireballHitPlayer);

  setTimeout(() => {
    shootFirestream(laserCrystal, streamPos, firelaserBuilding);
  }, FIRESTREAM_INIT_TIME)


}

function shootFirestream(laserCrystal, streamPos, firelaserBuilding) {
  var firelaserShooting = $this.physics.add.sprite(
    streamPos.x - 3.5,
    streamPos.y + 384,
    'firelaser_full_size'
  );

  firelaserShooting.setScale(2);
  firelaserShooting.anims.play('firelaserShooting');
  firelaserBuilding.destroy();
  $this.physics.add.collider($player, firelaserShooting, fireballHitPlayer);

  setTimeout(() => {
    laserCrystal.destroy();
    firelaserShooting.destroy();
  }, FIRESTREAM_SHOOTING_TIME);
}