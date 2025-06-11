document.addEventListener("DOMContentLoaded", function () {});

// ----------- Game Settings ----------- //

var fruitDiv, fruitDivWidth, fruitDivHeight; // fruit variables
var element;
var currentLevel = 1; // The number of current level
var totalLevels; // Total number of levels in the game

var fruitTapsCount = 0;
var comboCount = 0; // For combo bonuses
var lastTapTime = 0; // For timing combos

var generateRandomNumb = function (minNumb, maxNumb) {
  // generate random number in range
  return Math.floor(Math.random() * (maxNumb - minNumb + 1)) + minNumb;
};

var getObjectLength = function (l) {
  // get the length of an object
  return Object.keys(l).length;
};

var windowSize = {
  // get the size of the page
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight,
};

// Pages / Containers
var menuCont = document.getElementById("menuCont");
var levelTitleCont = document.getElementById("levelTitleCont");
var gameSpaceCont = document.getElementById("gameSpaceCont");
var timesUpCont = document.getElementById("timesUpCont");
var gamePauseCont = document.getElementById("gamePausedCont");
var levelPassedCont = document.getElementById("levelPassedCont");

// Menu Buttons & Call to Action
var newGameButton = document.getElementById("newGameButton");
var highScoresButton = document.getElementById("highScoresButton");
var aboutButton = document.getElementById("aboutButton");

// Level title screen
var levelNumberTitle = document.getElementById("levelNumberTitle");
var levelGoalTitle = document.getElementById("levelGoalTitle");

// Start Level Button
var startLevelButton = document.getElementById("startLevelButton");

// Pause Screen
var continueGameButton = document.getElementById("continueGameButton");
var gamePauseEndGameButton = document.getElementById("gamePauseEndGameButton");
var gamePausedDescription = document.getElementById("gamePausedDescription");

// Game Space
var progressLine = document.getElementById("progressLine");
var gameTime = document.getElementById("gameTime");
var gameScore = document.getElementById("gameScore");
var gameSpace = document.getElementById("gameSpace");
var inGameLevelNum = document.getElementById("inGameLevelNum");

// Time's up screen
var tryAgainButton = document.getElementById("tryAgainButton");
var timesUpDescription = document.getElementById("timesUpDescription");
var timesUpEndGameButton = document.getElementById("timesUpEndGameButton");

// Level passed screen
var levelPassedDescreption = document.getElementById("levelPassedDescreption");
var nextLevelDesc = document.getElementById("nextLevelDesc");
var continueNextLevelButton = document.getElementById(
  "continueNextLevelButton"
);

// Update level number in game space
var updateGameLevelValue = function (levelNumb) {
  inGameLevelNum.innerHTML = levelNumb;
};

updateGameLevelValue(currentLevel);

// End the game buttons and go to game home page
var endGameGoHome = function () {
  game.stop();
  menuCont.style.display = "block";
  timesUpCont.style.display = "none";
  gamePauseCont.style.display = "none";
  levelTitleCont.style.display = "none";
  gameSpaceCont.style.display = "none";
  levelPassedCont.style.display = "none";
};

// Make the progress  100%
progressLine.style.width = "100%";

// Game play time & the time left
var playTime, timeLeft;

// ------------------------------------------------------ //

var timeEngines = {
  start: function () {
    gameTime.innerHTML = timeLeft; // show the time left in the screen
    // Run the progress bar and time functions
    progressTimer = setInterval(timeEngines.updateTimeProgress, 100); // Every 0.1 of a second
    countDownTimer = setInterval(timeEngines.updateTime, 1000); // Every second
  },
  stop: function () {
    clearInterval(countDownTimer);
    clearInterval(progressTimer);
  },
  reset: function (time) {
    fruitTapsCount = 0;
    gameScore.innerHTML = fruitTapsCount + " / " + gameCurrentLevel.goal; // Reset the score to 0
    progressValue = 100; // Progress bar value
    gameTime.innerHTML = time;
    timeLeft = time;
    playTime = time;
  },
  updateTimeProgress: function () {
    // Subtract (100 / total game play time / 10) 10 to make it smaller, and the time is 0.1 of a second (100ms)
    progressValue = progressValue - 100 / playTime / 10;
    progressLine.style.width = progressValue + "%";
    timeEngines.checkTime(); // Check if game's time is 0
  },
  updateTime: function () {
    // Subtract 1 from the game time label
    gameTime.innerHTML = gameTime.innerHTML - 1;
    timeLeft = gameTime.innerHTML;
  },
  increaseTime: function () {
    // Add  to the game time
    timeLeft = parseFloat(timeLeft) + 0.1;
    playTime = parseFloat(playTime) + 0.1;
    gameTime.innerHTML = Math.ceil(timeLeft); // Round up to show whole seconds
    // Recalculate progress value to maintain accuracy
    progressValue = (timeLeft / playTime) * 100;
  },
  checkTime: function () {
    // Check if game's time is 0 or not
    if (gameTime.innerHTML == 0) {
      game.timesUp();
    } else if (fruitTapsCount >= gameCurrentLevel.goal) {
      game.levelPassed();
    }
  },
};

// --------- GAME LEVELS --------- //
var levels = {}; // Levels object

var addLevel = function (n, g, t) {
  // Adding levels function
  levels[n] = { goal: g, time: t };
};
// Adding multiple fun levels with progressive difficulty
addLevel(1, 4, 10); // Level 1: 5 fruits in 15 seconds
addLevel(2, 8, 10); // Level 2: 8 fruits in 18 seconds
addLevel(3, 12, 10); // Level 3: 12 fruits in 20 seconds
addLevel(4, 16, 10); // Level 4: 16 fruits in 22 seconds
addLevel(5, 20, 10); // Level 5: 20 fruits in 25 seconds

var updateLevelsCount = function () {
  // Get number of levels
  totalLevels = getObjectLength(levels);
};
updateLevelsCount();
// -------------------------------------

// --------------- game logic ---------------
var game = {
  start: function () {
    timeEngines.reset(gameCurrentLevel.time); // Reset game settings
    timeEngines.start();
    fruit.create();
  },
  stop: function () {
    timeEngines.stop();
    currentLevel = 1; // go back to level one
    updateGameLevelValue(1); // change game level number on game space
    getGameCurrentLevel(currentLevel); // get the current level object
  },
  reset: function () {
    timeEngines.reset(gameCurrentLevel.time); // Reset game settings
  },
  pause: function () {
    timeEngines.stop();
  },
  resume: function () {
    timeEngines.start();
  },
  checkScore: function () {
    if (fruitTapsCount >= gameCurrentLevel.goal) {
      game.levelPassed();
    } else {
      game.levelLost();
    }
  },
  levelPassed: function () {
    timeEngines.stop();
    currentLevel++; // Increase the level

    // Add new levels dynamically if we exceed predefined ones
    if (currentLevel > totalLevels) {
      addLevel(
        currentLevel,
        currentLevel * 4,
        Math.min(10, 10 + currentLevel * 2)
      );
      updateLevelsCount();
    }

    levelPassedCont.style.display = "block"; // Show level passed screen
    updateGameLevelValue(currentLevel); // Update level number in game space
    getGameCurrentLevel(currentLevel); // Get the current level object
    continueNextLevelButton.innerHTML = "Start Level " + currentLevel + " 👍";
    levelPassedDescreption.innerHTML =
      "🎉 Amazing! You caught all " + fruitTapsCount + " fruits! 🎉";
    nextLevelDesc.innerHTML =
      "Next challenge: catch " +
      gameCurrentLevel.goal +
      " fruits in " +
      gameCurrentLevel.time +
      " seconds!";
  },
  levelLost: function () {
    timesUpCont.style.display = "block";
    timesUpDescription.innerHTML =
      "You catched " +
      fruitTapsCount +
      " fruits, and you had to catch " +
      gameCurrentLevel.goal +
      " at least to complete this level.";
  },
  timesUp: function () {
    timeEngines.stop();
    game.checkScore();
  },
};
// -------------------------------------------------

// Getting the level settings for a specific level
var getGameCurrentLevel = function (levelNumb) {
  gameCurrentLevel = levels[levelNumb];
};
getGameCurrentLevel(currentLevel); // Get the current level object

// ----------- Setting the level title and goal ----------- //
levelNumberTitle.innerHTML = "Level " + currentLevel;
levelGoalTitle.innerHTML =
  "Try to catch " +
  gameCurrentLevel.goal +
  " fruits in " +
  gameCurrentLevel.time +
  " seconds.";
// ------------------------------------------------------- //
// -------------------- fruit Object -------------------- //
var fruit = {
  tapCount: 0,
  names: [
    "101",
    "102",
    "103",
    "104",
    "105",
    "106",
    "107",
    "108",
    "109",
    "110",
    "111",
    "112",
    "113",
    "114",
    "115",
    "116",
  ],
  create: function () {
    // if the fruit already exists delete it and re create it.
    if (document.getElementById("emoticon")) {
      fruit.destroy();
      fruit.create();
    } else {
      // Create fruit and append it to the container div
      fruitDiv = document.createElement("img");
      fruitDiv.setAttribute("id", "emoticon");
      fruitDiv.setAttribute(
        "src",
        "emoticons/" + fruit.names[fruit.random()] + ".png"
      );
      fruitDiv.setAttribute("draggable", "false"); // Make emoticon non-draggable
      gameSpace.appendChild(fruitDiv);
      fruitDivWidth = fruitDiv.offsetWidth;
      fruitDivHeight = fruitDivWidth;
      fruit.randomPosition(); // show the emmoticon in a random position
      fruitDiv.onclick = function () {
        // when tappign the emoticon
        fruit.tap();
      };

      // Make emoticons move around slowly for more challenge
      fruit.startMoving();
    }
  },

  startMoving: function () {
    // Make the emoticon drift around slowly
    fruitDiv.style.transition = "all 3s ease-in-out";

    var moveEmoticon = function () {
      if (document.getElementById("emoticon")) {
        fruit.randomPosition();
        setTimeout(moveEmoticon, 1000 + Math.random() * 2000); // Move every 3-5 seconds
      }
    };

    setTimeout(moveEmoticon, 1000); // Start moving after 2 seconds
  },
  random: function () {
    // generate random emoticon from the array
    return generateRandomNumb(0, fruit.names.length - 1);
  },
  randomPosition: function () {
    // showing the emoticon box randomly
    fruitDiv.style.left =
      generateRandomNumb(fruitDivWidth, gameSpace.offsetWidth - fruitDivWidth) +
      "px"; // random left position minus the emoticon width
    fruitDiv.style.top =
      generateRandomNumb(
        fruitDivWidth,
        gameSpace.offsetHeight - fruitDivHeight
      ) + "px"; // random top position minus the emoticon height
  },
  tap: function () {
    // Create visual feedback
    fruit.createClickEffect();

    // Play sound effect
    fruit.playClickSound();

    // Add points and time bonus
    timeEngines.increaseTime(); // Add  seconds when emoticon is clicked

    // Check for combo bonus
    fruit.checkComboBonus();

    fruit.create(); // change the emoticon
    fruitTapsCount = ++fruitTapsCount; // add 1 to the counter
    gameScore.innerHTML = fruitTapsCount + " / " + gameCurrentLevel.goal; // show the count in the count box

    // Add screen shake effect
    fruit.addScreenShake();
  },
  destroy: function () {
    gameSpace.removeChild(fruitDiv);
    timeEngines.increaseTime();
  },

  // New fun functions to make the game awesome!
  createClickEffect: function () {
    // Create a burst effect when clicking
    var effect = document.createElement("div");
    effect.className = "click-effect";
    effect.style.position = "absolute";
    effect.style.left = fruitDiv.style.left;
    effect.style.top = fruitDiv.style.top;
    effect.style.pointerEvents = "none";
    effect.innerHTML = "+0.1s ⚡";
    effect.style.color = "#ff6b35";
    effect.style.fontWeight = "bold";
    effect.style.fontSize = "20px";
    effect.style.zIndex = "1000";
    effect.style.animation = "floatUp 1s ease-out forwards";
    gameSpace.appendChild(effect);

    // Remove effect after animation
    setTimeout(function () {
      if (effect.parentNode) {
        gameSpace.removeChild(effect);
      }
    }, 1000);
  },

  playClickSound: function () {
    // Create click sound effect
    try {
      var audio = new Audio();
      // Create a simple beep sound using Web Audio API
      var audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      var oscillator = audioContext.createOscillator();
      var gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioContext.currentTime + 0.1
      );

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Fallback if Web Audio API is not supported
      console.log("Audio not supported");
    }
  },

  checkComboBonus: function () {
    var currentTime = Date.now();
    var timeSinceLastTap = currentTime - lastTapTime;

    if (timeSinceLastTap < 1000) {
      // Less than 1 second = combo!
      comboCount++;
      if (comboCount >= 3) {
        // Combo bonus! Add extra time
        timeEngines.increaseTime();
        fruit.showComboEffect();
      }
    } else {
      comboCount = 0; // Reset combo
    }

    lastTapTime = currentTime;
  },

  showComboEffect: function () {
    var comboText = document.createElement("div");
    comboText.innerHTML = "🔥 COMBO! +0.1s BONUS! 🔥";
    comboText.style.position = "fixed";
    comboText.style.top = "30%";
    comboText.style.left = "50%";
    comboText.style.transform = "translateX(-50%)";
    comboText.style.color = "#ff6b35";
    comboText.style.fontSize = "24px";
    comboText.style.fontWeight = "bold";
    comboText.style.zIndex = "2000";
    comboText.style.pointerEvents = "none";
    comboText.style.animation = "pulse 0.1s ease-in-out";
    document.body.appendChild(comboText);

    setTimeout(function () {
      if (comboText.parentNode) {
        document.body.removeChild(comboText);
      }
    }, 1000);
  },

  addScreenShake: function () {
    // Add subtle screen shake
    gameSpace.style.animation = "shake 0.1s ease-in-out";
    setTimeout(function () {
      gameSpace.style.animation = "";
    }, 200);
  },
};
fruit.create();
// ------------------------------------------------------- //

// Clicking New Game Button
newGameButton.onclick = function () {
  menuCont.style.display = "none";
  levelTitleCont.style.display = "block";
};

// Clicking Start Level Button
startLevelButton.onclick = function () {
  levelTitleCont.style.display = "none";
  gameSpaceCont.style.display = "block";
  game.start(); // Start game
};

// Clicking Pause Game Button
pauseGameButton.onclick = function () {
  gamePauseCont.style.display = "block";
  game.pause(); // Pause game
  gamePausedDescription.innerHTML =
    "You catched " +
    fruitTapsCount +
    " fruits, and you have to catch " +
    gameCurrentLevel.goal +
    " at least to complete this level.";
};

// Clicking Continue Game Button
continueGameButton.onclick = function () {
  gamePauseCont.style.display = "none";
  game.resume();
};

// Clicking End Game Buttons
gamePauseEndGameButton.onclick = function () {
  endGameGoHome();
};
timesUpEndGameButton.onclick = function () {
  endGameGoHome();
};

// Clicking Try Again in the you lost screen
tryAgainButton.onclick = function () {
  timesUpCont.style.display = "none";
  game.start();
};

// Clicking Go To Next level button
continueNextLevelButton.onclick = function () {
  levelPassedCont.style.display = "none";
  game.reset();
  game.start(); // Start game
};

// -------------------------------------------- //
