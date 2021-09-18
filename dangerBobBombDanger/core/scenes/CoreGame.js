class CoreGame extends Scene {

  gameData = null;
  #sceneSwitcher = null;
  renderer = null;

  constructor(sceneSwitcher, renderer) {
    super();
    this.#sceneSwitcher = sceneSwitcher;
    this.renderer = renderer;
  }

  preload() {
    super.preload();
    const EventBus = (function () {
      /* Private interface */
      var queues = {}
      var updateQ = []
      /* Public interface */
      return getReadOnlyObject({
        reset: function () {
          queues = {};
          updateQ = [];
          Homingball.reset();
          Chaosball.reset();
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
    this.gameData = {
      playerSettings: [
        CHARACTERS[this.renderer.$charackterIndex]
      ],
      EventBus,
      game: this.renderer,
      players: []
    };

    handlePreload(this.gameData);
  }

  create() {
    handleCreate(this.gameData);
  }

  update() {
    resetTimer();
    handleUpdate(this.gameData);
  }

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