$(document).ready(function () {

  for (var row = 0; row < 5; row++) {
    $("table").append("<tr class='row'></tr>")
    for (var index = 0; index < 5; index++) {
      $("table").append("<td class='cell'></td>")
    }
  }

})
