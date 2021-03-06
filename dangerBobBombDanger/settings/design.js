const GAME_NAME = 'Danger! Bomb! Danger!';

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