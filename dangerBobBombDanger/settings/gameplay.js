const getReadOnlyObject = function (object) {
  var result = null;

  if (Array.isArray(object)) {
    result = [];
  } else if (typeof object === 'object') {
    result = {};
  } else {
    return object;
  }

  for (var prop in object) {
    var v = object[prop];

    if (typeof v === 'object') {
      v = getReadOnlyObject(v);
    }

    Object.defineProperty(result, prop, {
      value: v,
      writable: false,
      enumerable: true,
      configurable: false
    });
  }

  return result;
};

// Projectiles constants
const PROBABILITIES_ARRAY = getReadOnlyObject([
  {
    name: 'fireball',
    probability: 0.8,
    function(data) {
      new Fireball({ x: data.players[0].x, y: data.players[0].y }, data.players, data.game);
      data.EventBus.emit('score', { score: SCORE_INCREMENT_FIREBALL });
    }
  },
  {
    name: 'iceball',
    probability: 0.1,
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
      new Homingball(data.players, data.players, data.game, data.EventBus);
    }
  }
]);

const getProbabilitiesArrayEntry = function (name) {
  return PROBABILITIES_ARRAY.find(o => o.name === name);
};

const checkPropabilitiesArray = function () {
  var probability = 0;
  for (var i = 0; i < PROBABILITIES_ARRAY.length; i++) {
    probability += PROBABILITIES_ARRAY[i].probability;
    if (probability > 1.0) {
      throw TypeError("PROBABILITIES_ARRAY probabilities are over 1.0");
    }
  }

  if (probability < 1.0) {
    throw TypeError("PROBABILITIES_ARRAY probabilities are blow 1.0");
  }
};

checkPropabilitiesArray();

var probabilitiesArray = PROBABILITIES_ARRAY.slice(0, PROBABILITIES_ARRAY.length);

const START_POS = getReadOnlyObject([
  { x: FLOOR_CENTER.x, y: FLOOR_CENTER.y }
]);

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
const SCORE_INCREMENT_ICEBALL = 7;
const SCORE_INCREMENT_FIRESTREAM = 50;

const FIREBALL_TURRET_POSITIONS = {
  x: { left: -20, right: GAME_WIDTH + 20 },
  y: { top: -20, bottom: GAME_HEIGHT + 20 }
};