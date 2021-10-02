// Projectiles constants
const PROBABILITIES_ARRAY = getReadOnlyObject([
  {
    name: 'fireball',
    probability: 0.6,
    function(data) {
      new Fireball({ x: data.players[0].x, y: data.players[0].y }, data.players, data.game);
      data.EventBus.emit('score', { score: SCORE_INCREMENT_FIREBALL });
    }
  },
  {
    name: 'iceball',
    probability: 0.2,
    function(data) {
      if (scoreSingleton.getScore() > 500) {
        new Iceball({ x: data.players[0].x, y: data.players[0].y }, data.players, data.game);
        data.EventBus.emit('score', { score: SCORE_INCREMENT_ICEBALL });
      } else {
        getProbabilitiesArrayEntry('fireball').function(data);
      }
    }
  },
  {
    name: 'homingball',
    probability: 0.1,
    function(data) {
      if (scoreSingleton.getScore() > 1000 && Homingball.numberOfHomingBalls < Homingball.maxNumberOfBalls) {
        new Homingball(data.players, data.players, data.game, data.EventBus);
        data.EventBus.emit('score', { score: SCORE_INCREMENT_FIREBALL + 5 });
      }
      else {
        getProbabilitiesArrayEntry('fireball').function(data);
      }
    }
  },
  {
    name: 'chaosball',
    probability: 0.1,
    function(data) {
      if (scoreSingleton.getScore() > 750 && Chaosball.numberOfChaosBalls < Chaosball.maxNumberOfChaosBalls) {
        new Chaosball(data.players, data);
        data.EventBus.emit('score', { score: SCORE_INCREMENT_FIREBALL });
      }
      else {
        getProbabilitiesArrayEntry('fireball').function(data);
      }
    }
  }
]);

const getProbabilitiesArrayEntry = function (name) {
  return PROBABILITIES_ARRAY.find(o => o.name === name);
};

const checkPropabilitiesArray = function () {
  let probability = 0.0;

  for (var i = 0; i < PROBABILITIES_ARRAY.length; i++) {
    probability = sumFloats(probability, PROBABILITIES_ARRAY[i].probability);

    if (probability > 1.0) {
      throw TypeError("PROBABILITIES_ARRAY probabilities are over 1.0 (prop: " + probability + ")");
    }
  }

  if (probability < 1.0) {
    throw TypeError("PROBABILITIES_ARRAY probabilities are below 1.0 (prop: " + probability + ")");
  }
};

checkPropabilitiesArray();

var probabilitiesArray = PROBABILITIES_ARRAY.slice(0, PROBABILITIES_ARRAY.length);

const START_POS = getReadOnlyObject([
  { x: FLOOR_CENTER.x, y: FLOOR_CENTER.y },
  { x: FLOOR_CENTER.x + 50, y: FLOOR_CENTER.y + 50 }
]);

/**
 * With the current implementation, the players movement speed can be 1 because
 * it he is accelerated every frame anyway.
 */
PLAYER_MOVEMENT_SPEED = 1;

/* Projectile constants */
const PROJECTILES_PROBABILITIES = probabilitiesArray.sort((a, b) => a.probability - b.probability);
const PROJECTILE_FIRE_RATE_OFFSET_BEFORE_INCREASE = 20;
const PROJECTILE_FIRE_RATE_INCREMENT = 0.1;
const PROJECTILE_START_FIRE_RATE = 2;
const PROJECTILE_VELOCITY = 100;

/* Iceball constants */
const ICEBALL_FROZEN_TIME = 1000;

/* Firestream constants */
const FIRESTREAM_FIRE_RATE = 0.1;
const CRYSTAL_BUILDING_TIME = 3000;
const FIRESTREAM_INIT_TIME = CRYSTAL_BUILDING_TIME;
const FIRESTREAM_SHOOTING_TIME = 8000;
const FIRESTREAM_VELOCITY = PROJECTILE_VELOCITY;

/**
 * Determines the pixel offset on both sides of the top of the stage where
 * the firestream is allowed to be.
 */
const FIRESTREAM_STAGE_OFFSET = 50;

/* Score constants */
const SCORE_MAXIMUM = 999999;
const SCORE_INCREMENT_FIREBALL = 10;
const SCORE_INCREMENT_ICEBALL = 5;
const SCORE_INCREMENT_FIRESTREAM = 20;

const FIREBALL_TURRET_POSITIONS = {
  x: { left: -20, right: GAME_WIDTH + 20 },
  y: { top: -20, bottom: GAME_HEIGHT + 20 }
};

/* KEYS / COOP */
COOP_MULTIPLIER = 1.2;
const VELOCITY = 5;
const KEYS = [
  {
    'W': { keyObject: null, function: (player) => { player.y += -VELOCITY } },
    'S': { keyObject: null, function: (player) => { player.y += VELOCITY } },
    'A': { keyObject: null, function: (player) => { player.x += -VELOCITY } },
    'D': { keyObject: null, function: (player) => { player.x += VELOCITY } },
  },
  {
    'up': { keyObject: null, function: (player) => { player.y += -VELOCITY } },
    'down': { keyObject: null, function: (player) => { player.y += VELOCITY } },
    'left': { keyObject: null, function: (player) => { player.x += -VELOCITY } },
    'right': { keyObject: null, function: (player) => { player.x += VELOCITY } },
  }
];