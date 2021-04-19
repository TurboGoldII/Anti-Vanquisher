class Scene {

  constructor() {
    /* This guard simulates abstraction. */
    if (new.target === Scene) {
      throw "The class Scene is abstract and cannot be instanced.";
    }
  }

  preload() {

  }

  create() {

  }

  update() {

  }

}