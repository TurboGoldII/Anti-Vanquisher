var $this = null;
var $soundHandler = null;
var $player = null;
var $gameID = 0;

function startGame() {
  var config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: 0xbababa,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    pixelArt: true
  };

  function preload() {
    $this = this;
    handlePreload();
  }

  /* The game can be placed in a variable here but is not necessary yet. */
  new Phaser.Game(config);

  // private variables/constants of game
  const queues = {
    score: []
  }

  function create() {
    handlerCreate({ queues: queues });
  }

  function update() {
    resetTimer();
    handleUpdate(queues);
  }
}
