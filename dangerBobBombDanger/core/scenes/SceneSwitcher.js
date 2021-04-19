class SceneSwitcher {
  #sceneId = 0;
  #scenes = {};
  #renderer = null;

  constructor(sceneId) {
    this.#sceneId = sceneId;
  }

  #initializeScenes(renderer) {
    this.#scenes[SCENE_MAIN_MENU] = new MainMenu(this, renderer);
    this.#scenes[SCENE_CORE_GAME] = new CoreGame(renderer);
    this.#scenes[SCENE_HIGHSCORES] = new Highscores();
    this.#scenes[SCENE_HOW_TO] = new HowTo();
    this.#scenes[SCENE_CREDITS] = new Credits(renderer);
  }

  get sceneId() {
    return this.#sceneId;
  }

  get scene() {
    return this.#scenes[this.#sceneId];
  }

  set renderer(renderer) {
    if (!this.#renderer) {
      this.#renderer = renderer;
      this.#initializeScenes(renderer);
    }
  }

  /**
   * @param {number} sceneId
   */
  set scene(sceneId) {
    // this.#renderer.sys.game.destroy(true);
    this.#sceneId = sceneId;
    /* Destroy registry */
    this.#renderer.registry.destroy();
    /* Disable all active events */
    this.#renderer.events.off();
    /* Restart current scene */
    this.#renderer.scene.restart();
  }

  getCurrentScene() {
    return this.#getSceneFromCache()
  }

  #getSceneFromCache() {
    if (this.scenes[this.sceneId]) {
      return this.scenes[this.sceneId];
    }
    else {
      throw 'Scene not defined'
    }
  }
}