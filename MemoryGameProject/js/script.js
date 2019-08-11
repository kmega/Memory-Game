// Before loading, create an array of font-awesome signs.
const listOfSigns = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-automobile", "fa fa-file-text", "fa fa-gear", "fa fa-bullhorn"];
let signID = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];

// After loading, create a table with 5x5 cells and define reset button.
$(document).ready(() => {

  for (let row = 0; row < 5; row++) {
    $("table").append("<tr class='row'></tr>");
    for (let index = 0; index < 5; index++) {
      if (row == 2 && index == 2) $("table").append("<td class='center'><div id='resetGame'>RESET</div></td>");
      else {
        $("table").append("<td><div></div></td>");
      }
    }
  }

  // Randomly shuffle IDs and then assign signs to IDs in table cells.
  signID = ShuffleIDs(signID);
  AddSigns(signID, listOfSigns);

});

// Create variables for game state and timer management.
let reset = false, gameIsFinished = false, timerInProgress = false, minutes = 0, seconds = 0, separator = ":", playerMoves = 0, multiplier = 1, stars = 0;

// On clicking a cell for the first time execute the timer.
$(document).on("click", "td", function() {

  if (timerInProgress == false && $(this).hasClass("center") == false) {
    timerInProgress = true;
    Timer();
  }

  // On clicking a cell, but not a RESET button, show a sign. Prevent matched cells to be bugged by clicking on them again.
  $(this).children().addClass("cardIsOpen");
  if ($(this).children().hasClass("match") || $(this).hasClass("center")) {
    $(this).children().removeClass("cardIsOpen");
  }

  // After two cards are opened, add one move and check for user performance.
  if ($("div.cardIsOpen").length == 2) {

    playerMoves++;
    $("#numberOfMoves").text(playerMoves);
    if (playerMoves > 20 * multiplier) {
      $(".fa-star:first").remove();
      multiplier++;
    }

    // If there is a match, don't close the cards. In other case, show signs and block user from interacting for short period of time.
    if ($("div.cardIsOpen:first").attr("class") == $("div.cardIsOpen:last").attr("class")) {
      $(".cardIsOpen").addClass("match");
      $(".cardIsOpen").removeClass("cardIsOpen");
    }
    else {
      $("table").addClass("tableBlocked");
      $(".cardIsOpen").addClass("wrongMatch");
      setTimeout(() => {
        $(".cardIsOpen").removeClass("wrongMatch");
        $(".cardIsOpen").removeClass("cardIsOpen");
        $("table").removeClass("tableBlocked");
      }, 750);
    }
  }

  // If game detects all cards matched, display time, moves and performance of the user.
  if ($("div.match").length == 24 && gameIsFinished == false) {
    gameIsFinished = true;
    stars = $("div.fa-star").length;
    $("ul").addClass("hidden");
    $("header").append("<div id='gameIsFinished'>You have beaten the game in " + minutes + separator + seconds + ". You made " + playerMoves + " moves. Your performance was: " + stars + " stars.</div>");
  }

});

// On clicking RESET button, restore everything to it's starting value.
$(document).on("click", "td.center", function() {

  $("#timer").text("0:00");
  $("#numberOfMoves").text("0");
  if ($("div.fa-star").length < 3) {
    for (let i = $("div.fa-star").length; i < 3; i++) {
      $("#performance").append("<div class='fa fa-star'></div>");
    }
  }

  $("div#gameIsFinished").remove();
  $("td > div").removeAttr("class");
  $("ul").removeClass("hidden");

  reset = true;
  gameIsFinished = false;
  timerInProgress = false;
  minutes = 0;
  seconds = 0;
  playerMoves = 0;
  multiplier = 1;
  stars = 0;

  signID = ShuffleIDs(signID);
  AddSigns(signID, listOfSigns);

});

// Function that is responsible for shuffling IDs.
function ShuffleIDs(signID) {

  let firstID, secondID, holder;

  for (let i = 0; i < signID.length; i++) {
    firstID = 50;
    secondID = 50;
    while (firstID > signID.length - 1) firstID = Math.floor(Math.random() * 100);
    while (secondID > signID.length - 1) secondID = Math.floor(Math.random() * 100);
    holder = signID[firstID];
    signID[firstID] = signID[secondID];
    signID[secondID] = holder;
  }

  if (reset == true) {
    reset == false;
  }
  return signID;

};

// Function that is responsible for adding signs to IDs.
function AddSigns(signID, listOfSigns) {

  let value = 0;

  $("td").each(function() {
    if ($(this).hasClass("center") == true) {
      return true;
    }
    else {
      $(this).children().addClass(listOfSigns[signID[value]]);
    }
    value++;
  });

};

// Function that is responsible counting time.
function Timer() {

  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }

  if (seconds < 10) {
    separator = ":0";
  }
  else {
    separator = ":";
  }

  $("#timer").text(minutes + separator + seconds);
  if (gameIsFinished == false && timerInProgress == true) {
    seconds++;
    setTimeout("Timer()", 1000);
  }

};
