var $this = null;
var $score = 0;
var $soundHandler = null;
var $player = null;

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
    preloadImages();
    preloadSpritesheets();
  }

  function preloadImages() {
    $this.load.image('debug_x', '../engine/assets/callouts/debug_x.png');
    $this.load.image('lava', 'assets/stage/game_background.png');
    $this.load.image('fireball', 'assets/mob/fireball.png');
    $this.load.image('loudspeaker_on', 'assets/callouts/loudspeaker_on.png');
    $this.load.image('loudspeaker_off', 'assets/callouts/loudspeaker_off.png');
    $this.load.audio('backgroundMusic', 'assets/music/danger_bomb_danger_demo_soundtrack.mp3');
  }

  function preloadSpritesheets() {
    $this.load.spritesheet(
      'bob_omb',
      'assets/bobOmb.png',
      { frameWidth: 21, frameHeight: 24 }
    );

    $this.load.spritesheet(
      'crystal',
      'assets/mob/red_crystal.png',
      { frameWidth: 80, frameHeight: 80 }
    );

    $this.load.spritesheet(
      'firelaser_building',
      'assets/mob/firelaser_building.png',
      { frameWidth: 27, frameHeight: 332 }
    );

    $this.load.spritesheet(
      'firelaser_full_size',
      'assets/mob/firelaser_full_size.png',
      { frameWidth: 27, frameHeight: 332 }
    );
  }

  var game = new Phaser.Game(config);
  var scoreCounterText = null;

  function create() {
    $soundHandler = new SoundHandler();
    $soundHandler.playBackgroundMusic();
    this.add.image(GAME_CENTER.x, GAME_CENTER.y, 'lava');
    $player = this.physics.add.sprite(FLOOR_CENTER.x, FLOOR_CENTER.y, 'bobOmb');
    $player.setScale(2.2);
    $player.setSize(PLAYER_HITBOX.x, PLAYER_HITBOX.y);
    $player.setOffset(PLAYER_HITBOX_OFFSET.x, PLAYER_HITBOX_OFFSET.y);

    this.anims.create({
      key: 'bobOmbTwitch',
      frames: this.anims.generateFrameNumbers('bob_omb', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    $player.anims.play('bobOmbTwitch');

    this.anims.create({
      key: 'crystalBuild',
      frames: this.anims.generateFrameNumbers('crystal', { start: 0, end: 2 }),
      frameRate: 1
    });

    this.anims.create({
      key: 'firelaserBuilding',
      frames: this.anims.generateFrameNumbers('firelaser_building', { start: 0, end: 2 }),
      frameRate: 1
    });

    this.anims.create({
      key: 'firelaserShooting',
      frames: this.anims.generateFrameNumbers('firelaser_full_size', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    /*
     * TO-DO: The current implementation sticks the player to the mouse. By
     * leaving the canvas with the mouse, the player character can be
     * teleported. A better implementation would be to accellerate the players
     * movement into the mouse cursors direction.
     */
    this.input.on('pointermove', limitPlayerMovement, this);
    const textHandler = new TextHandler(this);
    const scoreBoardTextPosY = 17;
    textHandler.createText(10, scoreBoardTextPosY, GAME_NAME);
    textHandler.createText(575, scoreBoardTextPosY, 'Score:');

    scoreCounterText = textHandler.createText(
      685,
      scoreBoardTextPosY,
      formatScore()
    );
  }

  /**
   * Sadly, these stage bounds here always have to be fine-tuned by the
   * programmer. Test it out, once the right textures are installed.
   * 
   * @param {object} pointer 
   */
  function limitPlayerMovement(pointer) {
    $player.x = Phaser.Math.Clamp(
      pointer.x,
      FLOOR_EDGE_POINTS.topLeft.x,
      FLOOR_EDGE_POINTS.topRight.x
    );

    $player.y = Phaser.Math.Clamp(
      pointer.y,
      FLOOR_EDGE_POINTS.topLeft.y,
      FLOOR_EDGE_POINTS.bottomLeft.y
    );
  }

  function update() {
    resetTimer();

    if (isAllowedToShootFireball()) {
      shootFireball();
      increaseScoreForFireball();
    }

    if (isAllowedToShootFirestream()) {
      buildLaserCrystal();
      increaseScoreForFirestream();
    }
  }

  /**
   * Increases the score by the fireball increment.
   * 
   * TO-DO: Implement a new scorer class for more future scoring mechanics.
   */
  function increaseScoreForFireball() {
    $score += SCORE_INCREMENT_FIREBALL;
    var formattedScore = formatScore();
    scoreCounterText.setText(formattedScore);
  }

  function increaseScoreForFirestream() {
    $score += SCORE_INCREMENT_FIRESTREAM;
    var formattedScore = formatScore();
    scoreCounterText.setText(formattedScore);
  }

  /**
   * According to the current score length, zeros are added to make the score
   * look cooler.
   */
  function formatScore() {
    if ($score >= SCORE_MAXIMUM) {
      return SCORE_MAXIMUM;
    }

    //TO-DO: Improve this with string padding
    var formattedScore = $score.toString();
    var formattedScoreLength = formattedScore.length;

    var formattedMaxScoreLength = SCORE_MAXIMUM
      .toString()
      .length;

    if (formattedScoreLength < formattedMaxScoreLength) {
      var lengthDifference = formattedMaxScoreLength - formattedScoreLength;

      for (var i = 0; i < lengthDifference; i++) {
        formattedScore = '0' + formattedScore;
      }
    }

    return formattedScore;
  }
}