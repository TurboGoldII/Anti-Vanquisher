var $this = null;
var $soundHandler = null;
var $player = null;
var $gameId = 0;

function startGame() {
  var config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: 0xbababa,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
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
    data.game = this;
    data.players = [];
    handlePreload(data);
  }

  /* The game can be placed in a variable here but is not necessary yet. */
  new Phaser.Game(config);

  const EventBus = (function () {
    /* Private interface */
    var queues = {}
    var updateQ = []
    // public interface
    return getReadOnlyObject({
      reset: function () {
        queues = {};
        updateQ = [];
      },
      updateFunctions: {
        push: function (p) {
          updateQ.push(p);
        },
        delete: function (h) {
          const i = updateQ.findIndex(p => p.h === h);
          if (i > -1) {
            updateQ.splice(i, 1);
          }
        },
        do: function () {
          for (let i = 0; i < updateQ.length; i++) {
            updateQ[i].f();
          }
        }
      },
      // should be in initialization / create
      on: function (key, eventFunction) {
        if (!queues[key]) {
          queues[key] = [];
        }
        queues[key].push(eventFunction);
      },
      // should be in update loop
      emit: function (key, event) {
        if (queues[key]) {
          for (let i = 0; i < queues[key].length; i++) {
            queues[key][i](event);
          }
        }
      }
    })
  })();

  /* Private variables/constants of game */
  const data = {
    playerSettings: [
      CHARACTERS[0]
    ],
    EventBus,
    players: []
  };

  function create() {
    handlerCreate(data);
  }

  function update() {
    resetTimer();
    handleUpdate(data);
  }
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

const randomHash = (length) => {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}