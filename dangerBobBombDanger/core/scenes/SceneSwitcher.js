class SceneSwitcher {
  #sceneId = 0;
  #scenes = {};
  #renderer = null;

  constructor(sceneId) {
    this.#sceneId = sceneId;
  }

  #initializeScenes(renderer) {
    this.#scenes[SCENE_MAIN_MENU] = new MainMenu(this, renderer);
    this.#scenes[SCENE_CORE_GAME] = new CoreGame(this, renderer);
    this.#scenes[SCENE_HIGHSCORES] = new Highscores(this, renderer);
    this.#scenes[SCENE_HOW_TO] = new HowTo(this, renderer);
    this.#scenes[SCENE_CREDITS] = new Credits(this, renderer);
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

}