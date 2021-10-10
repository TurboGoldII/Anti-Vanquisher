const handleScore = function () {
  scoreSingleton.increaseScore();
}

// singleton
const scoreSingleton = (function () {
  // private interface
  var scoreCounterText = null;
  var actualScore = 0;
  var displayedScore = 0;
  var counterStopped = false;
  var scoreQ = [];
  var flow = true;
  let multiplier = 1;

  const handleScoreQ = function () {
    if (flow && scoreQ.length) {
      flow = false;
      --scoreQ[0];

      formatScore(++displayedScore);

      if (scoreQ[0] === 0) {
        scoreQ.shift();
      }

      let timeout = 25 - Math.floor(actualScore / 250)

      timeout = timeout < 0 ? 0 : timeout;

      setGameTimeout(() => {
        flow = true;
      }, timeout);
    }
  }

  /**
   * According to the current score length, zeros are added to make the score
   * look cooler.
   */
  const formatScore = function (score) {
    if (score >= SCORE_MAXIMUM) {
      return SCORE_MAXIMUM;
    }

    var formattedScore = score.toString();
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

    /*
     * This had to be changed to a try-catch-block because scoreCounterText can
     * already be deleted while it tries to change text.
     */
    try {
      scoreCounterText.setText(formattedScore);
    }
    catch (ex) {

    }
  }

  // public interface
  return getReadOnlyObject({
    increaseScore: function () {
      handleScoreQ();
    },
    stop: function () {
      counterStopped = true;
    },
    /**
     * reset should be called if the game is over
     */
    reset: function () {
      scoreCounterText = null;
      actualScore = 0;
      displayedScore = 0;
      counterStopped = false;
      flow = true;
      scoreQ = [];
    },
    /**
     * init function should be called in the create function
     * @param {*} q = queues to communicate
     */
    init: function (EventBus, coop) {
      if (scoreCounterText) {
        return;
      }

      if (coop) {
        multiplier = COOP_MULTIPLIER
      }

      EventBus.on('score', ev => {
        if (!counterStopped) {
          var score = Math.floor(ev.score * multiplier);
          actualScore += score;
          scoreQ.push(score);
        }
      });

      var textHandler = new TextHandler($this);
      const scoreBoardTextPosY = 17;
      textHandler.createText(10, scoreBoardTextPosY, GAME_NAME);
      textHandler.createText(575, scoreBoardTextPosY, 'Score:');
      var sratrScore = '';

      for (var i = 0; i < SCORE_MAXIMUM.toString().length; i++) {
        sratrScore += '0';
      }

      scoreCounterText = textHandler.createText(
        685,
        scoreBoardTextPosY,
        sratrScore
      );
    },

    getScore: function () {
      return actualScore;
    }

  });
})();