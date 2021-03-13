const GAME_NAME = 'Danger! Bomb! Danger!';
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const FONT = 'pixel_font';

/**
 * Determines the sound volume multiplier of all played sounds of the game. Will
 * probably be replaced by a volume slider later on.
 */
const SOUND_VOLUME = 0.1;

const FIRESTREAM_X_AXLE_RANGE = {
  start: 145,
  end: 655
};

/*
 * These are the coordinates of the middle of the game. This is the middle of
 * the canvas.
 */
const GAME_CENTER = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2
};

/*
 * These are the coordinates of the middle of the floating floor on the lava.
 * It is the middle of the stage the player is able to move in.
 * 
 * The stage itself shall take up to 3/4 of the game, so that a beam laser
 * can be placed above the stage.
 */
const FLOOR_CENTER = {
  x: GAME_CENTER.x,
  y: GAME_HEIGHT - GAME_HEIGHT / 4 * 3 / 2
};

const FIREBALL_TTL = 10000;
const WARNING_BLINK_INTERVAL = 500;