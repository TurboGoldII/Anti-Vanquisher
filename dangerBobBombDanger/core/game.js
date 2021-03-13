var $this = null;
var $score = 0;
var $soundHandler = null;

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
    }
  };

  function preload() {
    this.load.image('debug_x', '../engine/assets/callouts/debug_x.png');

    this.load.spritesheet(
      'bobOmb',
      'assets/bobOmb.png', { frameWidth: 32, frameHeight: 32 }
    );

    this.load.image('lava', 'assets/stage/game_background.png');
    this.load.image('fireball', 'assets/mob/fireball.png');
    this.load.image('loudspeaker_on', 'assets/callouts/loudspeaker_on.png');
    this.load.image('loudspeaker_off', 'assets/callouts/loudspeaker_off.png');
    this.load.audio('backgroundMusic', 'assets/music/danger_bomb_danger_demo_soundtrack.mp3');
  }

  var game = new Phaser.Game(config);
  var player = null;
  var scoreCounterText = null;

  function create() {
    $soundHandler = new SoundHandler(this);
    $soundHandler.playBackgroundMusic();
    $this = this;
    this.add.image(GAME_CENTER.x, GAME_CENTER.y, 'lava');

    player = this.physics.add.sprite(FLOOR_CENTER.x, FLOOR_CENTER.y, 'bobOmb');

    this.anims.create({
      key: 'bobOmbTwitch',
      frames: this.anims.generateFrameNumbers('bobOmb', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1
    });

    player.anims.play('bobOmbTwitch');
    this.input.on('pointermove', limitPlayerMovement, this);
    const textHandler = new TextHandler(this);
    const scoreBoardTextPosY = 17;
    textHandler.createText(10, scoreBoardTextPosY, GAME_NAME);
    textHandler.createText(575, scoreBoardTextPosY, 'Score:');
    scoreCounterText = textHandler.createText(685, scoreBoardTextPosY, formatScore());
  }

  /**
   * Sadly, these stage bounds here always have to be fine-tuned by the
   * programmer. Test it out, once the right textures are installed.
   * 
   * @param {object} pointer 
   */
  function limitPlayerMovement(pointer) {
    const coordXDiff = 340;

    player.x = Phaser.Math.Clamp(
      pointer.x,
      FLOOR_CENTER.x - coordXDiff,
      FLOOR_CENTER.x + coordXDiff
    );

    const coordYDiff = 170;

    player.y = Phaser.Math.Clamp(
      pointer.y,
      FLOOR_CENTER.y - coordYDiff,
      FLOOR_CENTER.y + coordYDiff
    );
  }

  function update() {
    resetTimer();

    if (isAllowedToShootFireball(game)) {
      shootFireball(this.physics, player);
      increaseScoreForFireball();
    }

    if (isAllowedToShootFirestream(game)) {
      showFirestreamWarning(this);
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