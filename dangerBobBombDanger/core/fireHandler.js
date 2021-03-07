/*
 * TO-DO: Firerate must increase itself over time
 */

//The firerate is fireRate per second
var fireRate = FIREBALL_START_FIRE_RATE;

function isAllowedToShootFireball(game) {
  //Convert fire rate into seconds for next shot
  var intervalForNextShot = 1 / fireRate;
  return isSecondsPassed(intervalForNextShot, game);
}

function shootFireball(physics, player, fireballs) {
  var fireballIndex = Math.round(Math.random() * 100) % fireballs.length;
  var randomFireball = fireballs[fireballIndex];

  var fireballTexture = physics.add.image(
    randomFireball.x,
    randomFireball.y,
    'fireball'
  );

  //The fireball shall fly to the players current position
  var dest = {
    x: player.x,
    y: player.y
  };

  var angle = {
    x: dest.x - randomFireball.x,
    y: dest.y - randomFireball.y
  };

  var angleXMultiplier = 1;
  var angleYMultiplier = 1;
  var speedX = Math.abs(angle.x);
  var speedY = Math.abs(angle.y);

  if (speedX > speedY) {
    angleYMultiplier = FIREBALL_VELOCITY / speedX;

    if (angle.x < 0) {
      angle.x = -FIREBALL_VELOCITY;
    } else {
      angle.x = FIREBALL_VELOCITY;
    }
  }
  else {
    angleXMultiplier = FIREBALL_VELOCITY / speedY;

    if (angle.y < 0) {
      angle.y = -FIREBALL_VELOCITY;
    } else {
      angle.y = FIREBALL_VELOCITY;
    }
  }

  fireballTexture.setVelocityX(angle.x * angleXMultiplier);
  fireballTexture.setVelocityY(angle.y * angleYMultiplier);

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

function showFirestreamWarning(physics) {
  var streamPos = calculateStreamStartPos();

  var warning = physics.add.sprite(
    streamPos.x,
    streamPos.y,
    'warning'
  )
    .setScale(3);

  warning.anims.play('warning_blink');

  setTimeout(() => {
    warning.destroy();
    shootFirestream();
  }, FIRESTREAM_WARNING_TIME);
}

function calculateStreamStartPos() {
  var rangeXAxle = (FIRESTREAM_X_AXLE_RANGE.end - FIRESTREAM_STAGE_OFFSET)
    - (FIRESTREAM_X_AXLE_RANGE.start + FIRESTREAM_STAGE_OFFSET);

  var randomStart = Math.floor(Math.random() * rangeXAxle);

  return {
    x: (FIRESTREAM_X_AXLE_RANGE.start + FIRESTREAM_STAGE_OFFSET) + randomStart,
    y: HUD_HEIGHT + 24
  }
}

function shootFirestream() {

}