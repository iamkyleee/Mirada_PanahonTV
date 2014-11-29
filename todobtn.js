
var main = function(){




$('.todotbn').click(function() {
    $('.todolist').animate({
      height: 20px;
    }, 200);

    $('body').animate({
      left: "285px"
    }, 200);
  });

};

$(document).ready(main);