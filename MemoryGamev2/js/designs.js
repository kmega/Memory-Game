$(document).ready(() => {

  const listOfSigns = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-automobile", "fa fa-file-text", "fa fa-gear", "fa fa-bullhorn"];
  let signID = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
  let row, index, id, holder;

  for (index = 0; index < 25; index++) {
    id = -1;
    while (id < 0 || id > signID.length - 1) id = Math.floor(Math.random() * 100);
    holder = signID[id];
    signID[id] = signID[0];
    signID[0] = holder;
  }

  id = 0;

  for (row = 1; row <= 5; row++) {
    $("table").append("<tr class='row'></tr>");
    for (index = 1; index <= 5; index++) {
      if (row == 3 && index == 3) $("table").append("<td class='center'></td>");
      else {
        $("table").append("<td></td>");
        $("td").last().append("<div class='" + listOfSigns[signID[id]] + "'></div>");
        id++;
      }
    }
  }

});

let timerInProgress = false, minutes = 0, seconds = 0, separator = ":";

$(document).on("click", "td", function() {

  if (timerInProgress == false) {
    timerInProgress = true;
    Timer();
  }

  $(this).children().addClass("cardIsOpen");
  if ($(this).children().hasClass("match")) {
    $(this).children().removeClass("cardIsOpen");
  }

  if ($("div.cardIsOpen").length == 2) {
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

  if ($("div.match").length == 24) {
    $("table").addClass("gameFinished");
    $("section").append("<div class=''>You have beaten the game!</div>");
  }

});

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

  seconds++;
  setTimeout("Timer()", 1000);

}
