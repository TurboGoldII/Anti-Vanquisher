class Sound {
  #music = null;

  constructor(audioName, options) {
    this.#music = $this.sound.add(audioName, options || { volume: SOUND_VOLUME });
  }

  play(options) {
    this.#music.play(options || { loop: true });
  }

  stop() {
    this.#music.stop();
  }

  destroy() {
    this.#music.stop();
    $this.sound.remove(this.#music.key);
  }
}
