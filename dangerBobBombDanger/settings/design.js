const GAME_NAME = 'Danger! Bomb! Danger!';
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

/*
 * Determines the height of the HUD
 */
const HUD_HEIGHT = 60;

const FIRESTREAM_X_AXLE_RANGE = {
  start: 145,
  end: 655
};

/*
 * These are the coordinates of the middle of the game. This is not the middle
 * of the canvas. It is the middle of the screen below the scoreboard.
 */
const GAME_CENTER = {
  x: 400,
  y: 330
};

/*
 * These are the coordinates of the middle of the floating floor on the lava.
 * It is the middle of the stage the player is able to move in.
 */
const FLOOR_CENTER = {
  x: GAME_CENTER.x,
  y: GAME_CENTER.y + 30
};

const FIREBALL_TTL = 10000;
const WARNING_BLINK_INTERVAL = 500;