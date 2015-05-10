 var comparison_svg = dimple.newSvg("#comparison-chart", 590, 400);
      d3.tsv("/data/example_data.tsv", function (data) {
        data = dimple.filterData(data, "Date", "01/12/2012");
        var myChart = new dimple.chart(comparison_svg, data);
        myChart.setBounds(60, 30, 500, 330)
        myChart.addMeasureAxis("x", "Unit Sales");
        myChart.addMeasureAxis("y", "Operating Profit");
        myChart.addSeries(["SKU", "Channel"], dimple.plot.bubble);
        myChart.addLegend(200, 10, 360, 20, "right");
        myChart.draw();
      });