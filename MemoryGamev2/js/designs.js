//After page finishes loading initiate createDeck() function.
$(document).ready(function () {
  //Declare four holders and an array with two numbers from 1 to 8.
  let firstRandom, secondRandom, holder, iteration;
  let idArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  //Start mixing proccess.
  for (iteration = 0; iteration < 15; iteration++) {
    //Reset holders to default value.
    firstRandom = secondRandom = holder = -1;
    //Create two random numbers (indexes).
    while (firstRandom < 0 || firstRandom > 15) {
      firstRandom = Math.floor(Math.random() * 100);
    }
    while (secondRandom < 0 || secondRandom > 15) {
      secondRandom = Math.floor(Math.random() * 100);
    }
    //Swap numbers in array with random indexes.
    holder = idArray[firstRandom];
    idArray[firstRandom] = idArray[secondRandom];
    idArray[secondRandom] = holder;
  }
  //Create performance stars.
  for (iteration = 0; iteration < 3; iteration++) {
    $("i.fa-repeat").parent().before("<li><i class='fa fa-star'></i></li>");
  }
  //Create cards and apply id classes with array numbers.
  for (iteration = 0; iteration < 16; iteration++) {
    $("section").append("<div></div>");
    $("div")[iteration].innerHTML = "<i></i>";
    $("div")[iteration].className = "id" + idArray[iteration];
  }
  //Declare constant array with signs.
  const array = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
  //Apply signs to specified id.
  for (iteration = 1; iteration < 9; iteration++) {
    $("div.id" + iteration).find("i").addClass(array[iteration - 1]);
  }
});
//Declare holders for performance, number of moves, time count and time initator.
let perform = 10;
let moves = 0;
let time = 0;
let startTimer = 0;
//On click mark the card.
$(document).on("click", "div", function () {
  $(this).find("i").addClass("open");
  //Start timer.
  if (!startTimer) {
    startTimer = 1;
    startCount();
  }
  //If marked card has been matched already, remove selection.
  if ($(this).find("i").hasClass("match")) {
    $(this).find("i").removeClass("open");
  }
  //If there are two open cards check the id's.
  if ($("i.open").length > 1) {
    let firstCard = $("i.open:first").parent().attr("class");
    let secondCard = $("i.open").slice(1).parent().attr("class");
    //If id's match, mark them as matched, don't hide them and incease number of moves.
    if (firstCard == secondCard) {
      $("i.open").addClass("match");
      $("i.open").removeClass("open");
      moves++;
    }
    //If id's don't match, unmark them, hide them and incease number of moves.
    else {
      $("i.open").addClass("wrong");
      //Make a brief pause for user to see signs, block cards for that time period and incease number of moves.
      $("div").addClass("disable");
      setTimeout(function () {
        $("i.open").removeClass("wrong open");
        $("div").removeClass("disable");
      }, 1000);
      moves++;
    }
    //Pass number of moves to html.
    $("li#number").children().text(moves);
    //Every 15 moves hide a star.
    if (moves > perform) {
      $("i.fa-star:first").removeClass("fa-star");
      perform += 15;
    }
    //If all cards has been matched then user wins.
    if ($("i.match").length > 15) {
      setTimeout(function () {
        $("ul").addClass("hidden");
        $("section").addClass("hidden");
        $("div").addClass("hidden");
        $("p").text("You won! You made: " + moves + " moves. Your performance was " + $("i.fa-star").length + " stars. Your time was " + time + " seconds. Do you want to restart? ");
        $("p").append("<button>RESTART</button>");
        $("p").removeClass("hidden");
      }, 500);
    }
  }
});
//Restart the game while playing.
$("i.fa-repeat").click(function () {
  location.reload();
});
//Restart the game after win.
$(document).on("click", "button", function () {
  location.reload();
});
//Timer.
function startCount () {
    $("li#timer").children().text(time + " sec");
    time += 1;
    setTimeout("startCount()", 1000);
}
