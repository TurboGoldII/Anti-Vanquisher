var framesPassedForEachCheck = [];
var timesSecondCheckCalled = 0;
var isResetTimerCalled = false;

function resetTimer() {
  isResetTimerCalled = true;
  timesSecondCheckCalled = 0;

  framesPassedForEachCheck = framesPassedForEachCheck.map((framesPassed) => {
    return ++framesPassed;
  });
}

/**
 * Checks whether a given amount of seconds is passed via FPS calculation.
 * 
 * @param integer seconds
 */
function isSecondsPassed(seconds, game) {
  if (!isResetTimerCalled) {
    throw 'You have to use resetTimer() at the start of update() to use isSecondsPassed()!';
  }

  ++timesSecondCheckCalled;

  //-1 to use the zeroth element of an array
  var currentCheckIterator = timesSecondCheckCalled - 1;

  if (!framesPassedForEachCheck[currentCheckIterator]) {
    framesPassedForEachCheck[currentCheckIterator] = 1;
  }

  var compareFrameRate = Math.round(game.loop.actualFps) / (1 / seconds);

  if (framesPassedForEachCheck[currentCheckIterator] % Math.round(compareFrameRate) === 0) {
    framesPassedForEachCheck[currentCheckIterator] = 0;
    return true;
  }

  return false;
}