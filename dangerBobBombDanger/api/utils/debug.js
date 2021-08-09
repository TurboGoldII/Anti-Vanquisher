const cl = console.log;

/**
 * Adds a purple X image useful for debugs.
 * 
 * Note: To be able to use this feature, the image must be loaded in your game.
 * 
 * @param {object} game 
 * @param {integer} posX 
 * @param {integer} posY 
 */
function addDebugX(game, posX, posY) {
  game.add.image(posX, posY, 'debug_x')
    .setScale(2);
}