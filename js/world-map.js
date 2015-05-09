var aid = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "data/aid.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

console.log(aid);

var world_map = new Datamap({
					element: document.getElementById('world-map'),
					fills: {
								defaultFill : 'darkgrey',
								HIGH: 'red',
								LOW: 'orange',
								MEDIUM: 'blue'
					},
					data: aid,
					geographyConfig: {
						highlightOnHover: true,
            			popupOnHover: true,
            			popupTemplate: function(geo, data) {
            				if (data) {
            					var message = "<div class=\"hoverinfo\"><strong>" + geo.properties.name + "</strong><br>";
		                    	message += "<br> <b>Aid</b>: <br>";
		                    	message += "<b>Monetary</b>: <i>" + data.monetary + "</i><br>";
		                    	message += "<b>Personnel</b>: <i>" + data.personnel + "</i><br>";
		                    	if (data.other) {message+= "<b>Other</b>: <i>" + data.other + "</i><br>"}
		                    	message += "</div>";
		                    	return [message].join('');
		                    } else {
		                    	var message = "<div class=\"hoverinfo\"><strong>" + geo.properties.name + "</strong>"
		                    	message += "<br> <b>Aid</b>: <i>data not available</i>";
		                    	message += "</div>";
		                    	return [message].join('');
		                    }
            			}
        			}
				});
