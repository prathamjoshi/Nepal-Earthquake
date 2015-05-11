var news = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "data/news.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

$("#news_date").html("Date: " + news[1].date);
$("#news_top").html(news[1].news);

//Slider stuff
var slider = d3.slider().min(1).max(7).ticks(5).showRange(false).value(1);
d3.select('#slider1').call(slider);

var last_slider_value = Math.round(slider.value());;
var current_slider_value;


d3.select('#slider1').on("mouseover", function() {
  current_slider_value = Math.round(slider.value());
  if (current_slider_value != last_slider_value) {
    last_slider_value = current_slider_value; 
    $("#news_top").html(news[current_slider_value].news);
    $("#news_date").html("Date: " + news[current_slider_value].date)
  }
});
//End Slider stuff
