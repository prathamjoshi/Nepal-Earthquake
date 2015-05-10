 var comparison_svg = dimple.newSvg("#comparison-chart", 590, 400);
      d3.tsv("/data/deadliest_quakes_10k.tsv", function (data) {
        //data = dimple.filterData(data, "Date", "01/12/2012");
        var myChart = new dimple.chart(comparison_svg, data);
        myChart.setBounds(60, 30, 500, 330)
        var x_axis = myChart.addMeasureAxis("x", "Deaths");
        var y_axis = myChart.addMeasureAxis("y", "Magnitude");
        y_axis.overrideMin = 5;
        y_axis.overrideMax = 9.5;
        x_axis.overrideMin = 0;
        x_axis.overrideMax = 10000;
        myChart.addSeries(["Date", "Location"], dimple.plot.bubble);
        //myChart.addLegend(200, 10, 360, 20, "right");
        myChart.draw();
      });