//Fireball constants
const FIREBALL_START_FIRE_RATE = 2;
const FIREBALL_VELOCITY = 100;
const FIREBALL_FIRE_RATE_OFFSET_BEFORE_INCREASE = 20;
const FIREBALL_FIRE_RATE_INCREMENT = 0.1;

//Firestream constants
const FIRESTREAM_FIRE_RATE = 0.1;
const CRYSTAL_BUILDING_TIME = 3000;
const FIRESTREAM_INIT_TIME = CRYSTAL_BUILDING_TIME;
const FIRESTREAM_SHOOTING_TIME = 8000;
const FIRESTREAM_VELOCITY = FIREBALL_VELOCITY;

/**
 * Determines the pixel offset on both sides of the top of the stage where
 * the firestream is allowed to be.
 */
const FIRESTREAM_STAGE_OFFSET = 50;

//Score constants
const SCORE_MAXIMUM = 999999;
const SCORE_INCREMENT_FIREBALL = 10;
const SCORE_INCREMENT_FIRESTREAM = 50;

const FIREBALL_TURRET_POSITIONS = {
  x: { left: -20, right: GAME_WIDTH + 20 },
  y: { top: -20, bottom: GAME_HEIGHT + 20 }
};