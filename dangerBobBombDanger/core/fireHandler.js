//The firerate is fireRate per second
var fireRate = FIREBALL_START_FIRE_RATE;
var fireballsShot = 0;

function isAllowedToShootFireball(game) {
  //Convert fire rate into seconds for next shot
  var intervalForNextShot = 1 / fireRate;
  return isSecondsPassed(intervalForNextShot, game);
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
 * 
 * @param {object} physics 
 * @param {object} player 
 */
function shootFireball(physics, player) {
  ++fireballsShot;

  if (fireballsShot === FIREBALL_FIRE_RATE_OFFSET_BEFORE_INCREASE) {
    fireballsShot = 0;
    fireRate += FIREBALL_FIRE_RATE_INCREMENT;
  }

  var rndTurretPos = getRandomFireballTurretPosition();

  var fireballTexture = physics.add.image(
    rndTurretPos.x,
    rndTurretPos.y,
    'fireball'
  );

  fireballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);
  $this.physics.add.collider(player, fireballTexture, fireballHitPlayer);

  //The fireball shall fly to the players current position
  var dest = {
    x: player.x,
    y: player.y
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

function isAllowedToShootFirestream(game) {
  //Convert fire rate into seconds for next stream
  var intervalForNextShot = 1 / FIRESTREAM_FIRE_RATE;
  return isSecondsPassed(intervalForNextShot, game);
}

function buildLaserCrystal() {
  var streamPos = calculateStreamStartPos();
  $laserCrystal = $this.add.sprite(streamPos.x, streamPos.y, 'crystal');
  $laserCrystal.setScale(1.5);
  $laserCrystal.anims.play('crystalBuild');

  setTimeout(() => {
    shootFirestream();
  }, FIRESTREAM_WARNING_TIME);
}

function calculateStreamStartPos() {
  var rangeXAxle = (FIRESTREAM_X_AXLE_RANGE.end - FIRESTREAM_STAGE_OFFSET)
    - (FIRESTREAM_X_AXLE_RANGE.start + FIRESTREAM_STAGE_OFFSET);

  var randomStart = Math.floor(Math.random() * rangeXAxle);

  return {
    x: (FIRESTREAM_X_AXLE_RANGE.start + FIRESTREAM_STAGE_OFFSET) + randomStart,
    y: 60
  }
}

function shootFirestream() {
  //TO-DO
  $this.physics;

  setTimeout(() => {
    $laserCrystal.destroy();
  }, FIRESTREAM_WARNING_TIME);
}