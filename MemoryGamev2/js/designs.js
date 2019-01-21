let signID = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];

$(document).ready(() => {

  const listOfSigns = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-automobile", "fa fa-file-text", "fa fa-gear", "fa fa-bullhorn"];
  let value = 0;
  signID = ShuffleCards(signID);

  for (let row = 1; row <= 5; row++) {
    $("table").append("<tr class='row'></tr>");
    for (let index = 1; index <= 5; index++) {
      if (row == 3 && index == 3) $("table").append("<td class='center'><div id='resetGame'>RESET</div></td>");
      else {
        $("table").append("<td></td>");
        $("td").last().append("<div class='" + listOfSigns[signID[value]] + "'></div>");
        value++;
      }
    }
  }

});

let reset = false, gameIsFinished = false, timerInProgress = false, minutes = 0, seconds = 0, separator = ":", playerMoves = 0, multiplier = 1, stars = 0;

$(document).on("click", "td", function() {

  if (timerInProgress == false && $(this).hasClass("center") == false) {
    timerInProgress = true;
    Timer();
  }

  $(this).children().addClass("cardIsOpen");
  if ($(this).children().hasClass("match") || $(this).hasClass("center")) {
    $(this).children().removeClass("cardIsOpen");
  }

  if ($("div.cardIsOpen").length == 2) {

    playerMoves++;
    $("#numberOfMoves").text(playerMoves);
    if (playerMoves > 20 * multiplier) {
      $(".fa-star").first().remove();
      multiplier++;
    }

    if ($("div.cardIsOpen").first().attr("class") == $("div.cardIsOpen").last().attr("class")) {
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

  if ($("div.match").length == 24 && gameIsFinished == false) {
    gameIsFinished = true;
    stars = $("div.fa-star").length;
    $("ul").addClass("hidden");
    $("header").append("<div id='gameIsFinished'>You have beaten the game in " + minutes + separator + seconds + ". You made " + playerMoves + " moves. Your performance was: " + stars + " stars.</div>");
  }

});

$(document).on("click", "td.center", function() {

  reset = true;
  gameIsFinished = false;
  timerInProgress = false;
  minutes = 0;
  seconds = 0;
  playerMoves = 0;
  multiplier = 1;
  stars = 0;

  $("#timer").text("0:00");
  $("#numberOfMoves").text("0");
  if ($("div.fa-star").length < 3) {
    for (let i = $("div.fa-star").length; i < 3; i++) {
      $("#performance").append("<div class='fa fa-star'></div>");
    }
  }

  $("div#gameIsFinished").remove();
  $(".match").removeAttr("class");
  $("ul").removeClass("hidden");

  signID = ShuffleCards(signID);

});

function ShuffleCards(signID) {

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
  if (gameIsFinished == false) {
    seconds++;
    setTimeout("Timer()", 1000);
  }

};
