
// Initialize slider
var slider = d3.slider().min(1).max(7).ticks(5).showRange(false).value(1);
// Render the slider in the div
d3.select('#slider1').call(slider);

var last_slider_value = Math.round(slider.value());
console.log(last_slider_value);
var current_slider_value;



d3.select('#slider1').on("mouseover", function() {
  current_slider_value = Math.round(slider.value());
  if (current_slider_value != last_slider_value) {
    last_slider_value = current_slider_value; 
    $("#news_top").html("<ul><li>The collapse of 7 storey building in Kapan alone has killed at least 70 (Setopati), 380 bodies in Om hospital. 18 bodies of foreign climbers recovered from Everest. Death toll expected to rise.</li></ul>");
  }
});
