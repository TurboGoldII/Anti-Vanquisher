class CoreGame extends Scene {

  gameData = null;

  preload(renderer) {
    const EventBus = (function () {
      /* Private interface */
      var queues = {};

      /* Public interface */
      return getReadOnlyObject({
        reset: function () {
          queues = {};
        },
        updateFunctions: [],
        /* Should be in initialization / create */
        on: function (key, eventFunction) {
          if (!queues[key]) {
            queues[key] = [];
          }

          queues[key].push(eventFunction);
        },
        /* Should be in update loop */
        emit: function (key, event) {
          if (!queues[key]) {
            return;
          }

          for (let i = 0; i < queues[key].length; i++) {
            queues[key][i](event);
          }
        }
      })
    })();

    /* Private variables/constants of game */
    this.gameData = {
      playerSettings: [
        CHARACTERS[0]
      ],
      EventBus,
      game: renderer,
      players: []
    };

    handlePreload(this.gameData);
  }

  create() {
    handlerCreate(this.gameData);
  }

  update() {
    resetTimer();
    handleUpdate(this.gameData);
  }

}