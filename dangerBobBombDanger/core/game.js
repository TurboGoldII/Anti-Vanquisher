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
    this.load.image('bobOmb', 'assets/bobOmb.png');
    this.load.image('lava', 'assets/stage/lava.png');
    this.load.image('floatingFloor', 'assets/stage/floatingFloor.png');
    this.load.image('scoreBar', 'assets/hud/scoreBar.png');
    this.load.image('fireball', 'assets/mob/fireball.png');
    this.load.image('loudspeaker_on', 'assets/callouts/loudspeaker_on.png');
    this.load.image('loudspeaker_off', 'assets/callouts/loudspeaker_off.png');
    this.load.spritesheet('warning', 'assets/callouts/warning.png', { frameWidth: 16, frameHeight: 16 });
    this.load.audio('backgroundMusic', 'assets/music/danger_bomb_danger_demo_soundtrack.mp3');
  }

  var game = new Phaser.Game(config);
  var player = null;
  var scoreCounterText = null;

  function create() {
    $soundHandler = new SoundHandler(this);
    $soundHandler.playBackgroundMusic();
    $this = this;

    const stages = this.physics.add.staticGroup();

    stages.create(
      GAME_CENTER.x,
      GAME_CENTER.y,
      'lava'
    );

    stages.create(
      FLOOR_CENTER.x,
      FLOOR_CENTER.y,
      'floatingFloor'
    );

    player = this.physics.add.image(
      FLOOR_CENTER.x,
      FLOOR_CENTER.y,
      'bobOmb'
    ).setScale(2);

    this.input.on(
      'pointermove',
      function (pointer) {
        /*
         * Sadly, these stage bounds here always have to be fine-tuned by the
         * programmer. Test it out, once the right textures are installed.
         */
        const coordXDiff = 239;

        player.x = Phaser.Math.Clamp(
          pointer.x,
          FLOOR_CENTER.x - coordXDiff,
          FLOOR_CENTER.x + coordXDiff
        );

        const coordYDiff = 154;

        player.y = Phaser.Math.Clamp(
          pointer.y,
          FLOOR_CENTER.y - coordYDiff,
          FLOOR_CENTER.y + coordYDiff
        );
      },
      this
    );

    this.anims.create({
      key: 'warning_blink',
      frames: this.anims.generateFrameNumbers('warning', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1
    });

    this.add.image(
      GAME_CENTER.x,
      30,
      'scoreBar'
    );

    const textHandler = new TextHandler(this);
    const scoreBoardTextPosY = 17;
    textHandler.createText(10, scoreBoardTextPosY, GAME_NAME);
    textHandler.createText(575, scoreBoardTextPosY, 'Score:');
    scoreCounterText = textHandler.createText(685, scoreBoardTextPosY, formatScore());
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