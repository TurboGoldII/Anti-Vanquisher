class SceneSwitcher {

  sceneId = 0;
  scenes = {};

  constructor(sceneId) {
    this.setCurrentScene(sceneId);
  }

  switchToScene(oldScene, sceneId) {
    /*
     * TO-DO: Dayum! This in unperformant as hell. I found out that Phaser can
     * swap scenes without having to re-render the entire game. Too bad.
     */
    oldScene.sys.game.destroy(true);
    this.setCurrentScene(sceneId);
    renderGame();
  }

  setCurrentScene(sceneId) {
    this.sceneId = sceneId;
  }

  getCurrentScene() {
    return this.#getSceneFromCache()
  }

  #getSceneFromCache() {
    if (this.scenes[this.sceneId]) {
      return this.scenes[this.sceneId];
    }

    let requestedScene = null;

    switch (this.sceneId) {
      case SCENE_MAIN_MENU:
        requestedScene = new MainMenu();
        break;

      case SCENE_CORE_GAME:
        requestedScene = new CoreGame();
        break;

      case SCENE_HIGHSCORES:
        requestedScene = new Highscores();
        break;

      case SCENE_HOW_TO:
        requestedScene = new HowTo();
        break;

      case SCENE_CREDITS:
        requestedScene = new Credits();
        break;

      default:
        throw 'Scene not defined';
    }

    this.scenes[this.sceneId] = requestedScene;
    return this.#getSceneFromCache();
  }
}