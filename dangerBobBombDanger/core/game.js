/* TO-DO: The global $this shall not be used and removed in the future. */
var $this = null;
var $soundHandler = null;
var $player = null;
var $gameId = 0;

function renderGame() {
  /* The game shall start in the menu. */
  const sceneSwitcher = new SceneSwitcher(SCENE_MAIN_MENU);

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
    sceneSwitcher.renderer = this;
    $this = this;
    /* Assets used by every scene */
    this.load.image('button', '../engine/assets/callouts/flixel_button.png');
    sceneSwitcher.scene.preload();
  }

  function create() {
    sceneSwitcher.scene.create();
  }

  function update() {
    sceneSwitcher.scene.update();
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
