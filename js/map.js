var width = 800,
    height = 500;

var projection = d3.geo.albers()
    .center([87, 28])
    .rotate([-85, 0])
    .parallels([27, 32]);

var path = d3.geo.path()
    .projection(projection);

var tooltip = d3.select("#container").append("div").attr("class", "tooltip hidden");

var svg = d3.select("#nepal-map").append("svg")
    .attr("id", "timeline-map")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");


d3.json("data/nepal.json", function(error, npl) {
    var districts = topojson.feature(npl, npl.objects.nepal_districts);

    projection
      .scale(1)
      .translate([0, 0]);

    var b = path.bounds(districts),
      s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
      t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    projection
      .scale(s)
      .translate(t);

      g.selectAll(".nepal_districts")
        .data(districts.features)
        .enter().append("path")
        .attr("class", function(d) { return "nepal_districts " + d.id; })
        .attr("d", path)
        .on("mouseover", function(d,i) {
          /*
          d3.select(this.parentNode.appendChild(this)).transition().duration(100)
                  .style({'stroke-width':1,'stroke':'#333333','stroke-linejoin':'round','cursor':'pointer','fill':'pink'})
                  pathCenter = getCenter(this);
                  d3.select(this.parentNode).append("svg:foreignObject")
                            .attr('class', 'text-box')
                            .attr('x', pathCenter[0] + 20)
                            .attr('y', pathCenter[1] - 20)
                            .attr('width', 100)
                            .attr('height', 400)
                            .attr('min-height', 400)
                            .append('xhtml:p')
                            .attr('class', 'popup-text')
                            .attr('style', 'border: 1px solid black; color: black;')
                            .html('<b>' + d.properties.name + '</b>')
                            */

          })
          .on("mouseout", function(d,i) {
            /*
              d3.select(this.parentNode.appendChild(this)).transition().duration(100)
                  .style({'stroke-width':1,'stroke':'#929292','stroke-linejoin':'round','fill':'#F8F8F8'});
                  d3.select(this.parentNode).selectAll(".text-box").remove();
                  */
          })
          .on("click", function(d) {

          });

      g.append("path")
          .datum(topojson.mesh(npl, npl.objects.nepal_districts, function(a, b) { return a !== b;}))
          .attr("d", path)
          .attr("class", "district-boundary");

      var color = d3.scale.linear()
        .domain([3, 5.5, 8])
        .range(["white", "yellow",  "red"]);


      d3.csv("data/aftershocks.csv", function(aftershocks) {
          return {
              long: aftershocks.longitude,
              lat: aftershocks.latitude,
              time: aftershocks.time,
              magnitude: aftershocks.mag
          };
      }, function (rows) {
              svg.selectAll(".mark")
              .data(rows)
              .enter()
              .append("circle")
                      .attr('class','mark')
                      .attr("r", function(d) {return d.magnitude*1.2})
                      .attr("fill", function(d) {return color(d.magnitude)})
                      .attr("stroke", "black")
              .attr("transform", function(d) {return "translate(" + projection([d.long,d.lat]) + ")";})
              .append('svg:title')
                    .text(function(d) {
                        var tooltip = "Magnitude : " + d.magnitude;
                        tooltip += "\nTime: " + d.time;
                        return tooltip; 
                    })     
              .on("mouseover", function(d,i) {
                /*
                  d3.select(this.parentNode.appendChild(this)).transition().duration(100)
                          .style({'stroke-width':1,'stroke':'#333333','stroke-linejoin':'round','cursor':'pointer','fill':'pink'})
                          pathCenter = getCenter(this);
                          d3.select(this.parentNode).append("svg:foreignObject")
                                    .attr('class', 'text-box')
                                    .attr('x', pathCenter[0] + 500)
                                    .attr('y', pathCenter[1] + 50)
                                    .attr('width', 100)
                                    .attr('height', 400)
                                    .attr('min-height', 400)
                                    .append('xhtml:p')
                                    .attr('class', 'popup-text')
                                    .attr('style', 'border: 1px solid black; color: black;')
                                    .html('<b>' + d.lat+ '</b>')
                                    */
              })
              .on("mouseout", function(d,i){
                /*
                   d3.select(this.parentNode).selectAll(".text-box").remove();
                   */
              })  
      });

});

function getCenter(node) {
  bbox = node.getBBox();
  return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}