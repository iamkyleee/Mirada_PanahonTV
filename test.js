
$(document).ready(function(){

  
  
  
  
  //button click fade out
  $("#btn1").click(function(){
	});

	//button hover
	$("#act").hover(function(){
	if (!$(this).hasClass('animated')) {
		$(this).dequeue().stop().animate({ opacity: "2" }, 'fast');
	}
}, function() {
    $(this).addClass('animated').animate({ opacity: "0.9"}, "fast", "linear", function() {
		$(this).removeClass('animated').dequeue();
	});
});

	//watermark hover
	$("#w").hover(function(){
	if (!$(this).hasClass('animated')) {
		$(this).dequeue().stop().animate({ opacity: "0.9", height: "100px" }, 'fast');
	}
}, function() {
    $(this).addClass('animated').animate({ opacity: "0.4", height: "25px"}, "fast", "linear", function() {
		$(this).removeClass('animated').dequeue();
	});
});

//forecast
	$("#liweather").hover(function(){
	if (!$("#forecast_embed").hasClass('animated')) {
		$("#forecast_embed").dequeue().stop().animate({ height: "220px", width: "600px", opacity: "1" }, 'fast', "swing");
	}
}, function() {
    $("#forecast_embed").addClass('animated').animate({ height: "30px", width: "200px", opacity: "0.7"}, "fast", "swing", function() {
		$("#forecast_embed").removeClass('animated').dequeue();
	});
});




	//body double click fade out
	
  $(".hide").click(function(){
	$("#content").fadeToggle();	
  });

//todo btn
// $(".todobtn").click(function(){

// 	if (!$(".todolist").hasClass('animated')) {
// 		$(this).dequeue().stop().animate({ width: "auto", height: "auto", opacity: "0.9" }, 'normal');
// 	}
// }, function() {
//     $(".todolist").addClass('animated').animate({ width: "300px", opacity: "1", height: "50%", display: "block", overflow: "none"}, "normal", "linear", function() {
// 		$(this).removeClass('animated').dequeue();
// 	});
// });

$(".todobtn").click(function(){
	
	$(".todobtn").toggleClass();
	$('.contents').toggle("fast");
});

// $(".quote").click(function(){
// 	$(".share").toggle(300);

// });

$(".share-fb").click(function(text){
  window.prompt("Copy to clipboard: Ctrl+C, Enter", theQuotes[whichImage]);
});
//end	
});


rewrites = [
  [/chrome-extension:\/\/([a-z]+)\.twitter\.com/, 'https://$1.twitter.com'],
  [/chrome-extension:\/\/([a-z]+)\.twimg\.com/, 'https://$1.twimg.com']
];

document.addEventListener('beforeload', function(e){
  for (var i = 0, rule; rule = rewrites[i]; i++) {
    if (rule[0].test(e.url)) {
      e.preventDefault();
      e.stopPropagation();
      e.srcElement.src = e.srcElement.src.replace(rule[0], rule[1]);
      break;
    }
  }
}, true);
