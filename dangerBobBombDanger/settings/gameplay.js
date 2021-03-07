//Fireball constants
const FIREBALL_START_FIRE_RATE = 1;
const FIREBALL_VELOCITY = 100;

//Firestream constants
const FIRESTREAM_FIRE_RATE = 0.05;
const FIRESTREAM_WARNING_TIME = 3000;
const FIRESTREAM_VELOCITY = FIREBALL_VELOCITY;
const FIRESTREAM_STAGE_OFFSET = 70;

//Score constants
const SCORE_MAXIMUM = 999999;
const SCORE_INCREMENT_FIREBALL = 10;
const SCORE_INCREMENT_FIRESTREAM = 50;

//TO-DO: To be deleted. Will be replaced by a randomizer.
const FIREBALL_TURRET_POSITIONS = [
  { x: FLOOR_CENTER.x, y: 100 },
  { x: FLOOR_CENTER.x, y: 550 },
  { x: 65, y: FLOOR_CENTER.y },
  { x: 765, y: FLOOR_CENTER.y }
];