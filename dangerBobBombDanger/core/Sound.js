class Sound {
  #music = null;

  constructor(audioName, options) {
    this.#music = $this.sound.add(audioName, options || { volume: SOUND_VOLUME });
  }

  /**
   * Plays the sound.
   *
   * Note: Chrome and other webbrowsers support a feature that mutes a tab
   * when it is not selected. Thing is, when switching back to the tab, Phaser
   * plays every sound, it should have played in the meantime AT ONCE,
   * resulting in an insanely loud, catastrophic ear rape that I cannot fix.
   *
   * @param {object} options
   */
  play(options) {
    this.#music.play(options || { loop: true });
  }

  stop() {
    this.#music.stop();
  }

  static stopAllActiveSounds() {
    for (const soundKey in $this.sound.sounds) {
      $this.sound.sounds[soundKey].stop();
    }
  }

  destroy() {
    this.#music.stop();
    $this.sound.remove(this.#music.key);
  }

}
