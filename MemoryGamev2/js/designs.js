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

$(document).on("click", "td", function() {

  $(this).children().addClass("cardIsOpen");

  if ($("div.cardIsOpen").length == 2) {
    if ($("div.cardIsOpen").first().attr("class") == $("div.cardIsOpen").last().attr("class")) {

    }
  }

});
