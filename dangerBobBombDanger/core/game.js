/* TO-DO: The global $this shall not be used and removed in the future. */
var $this = null;
/* The game shall start in the menu. */
const $sceneSwitcher = new SceneSwitcher(SCENE_CORE_GAME);
var $soundHandler = null;
var $player = null;
var $gameId = 0;

function renderGame() {
  let scene = $sceneSwitcher.getCurrentScene();

  var config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: 0x000000,
    physics: {
      default: 'arcade',
      arcade: {
        debug: DEBUG_BOXES
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    pixelArt: true
  };

  /**
   * Sadly, the preload function must be called extra here, so that the global
   * $this can be set for all game scenes.
   */
  function preload() {
    $this = this;
    scene.preload(this);
  }

  function create() {
    scene.create();
  }

  function update() {
    scene.update();
  }

  /* The game can be placed in a variable here but is not necessary yet. */
  new Phaser.Game(config);
}

const setGameTimeout = function (eventFunction, timeout, breakFunction) {
  var gameId = $gameId;

  setTimeout(() => {
    if (gameId !== $gameId) {
      if (breakFunction) {
        breakFunction();
      }

      return;
    }

    eventFunction();
  }, timeout);
}
