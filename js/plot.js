var currentIndexSelected;
var data;
data = [
  [1, 29.9],
  [2, 71.5],
  [3, 106.4],
  [4, 129.2],
  [5, 144.0],
  [6, 176.0],
  [7, 135.6],
  [8, 148.5],
  [9, 216.4],
  [10, 194.1],
  [11, 95.6],
  [12, 54.4]
];
var chart = new Highcharts.Chart({
  chart: {
    renderTo: 'container',
    defaultSeriesType: 'line',
    events: {
      click: function(e) {
        // find the clicked values and the series
        var x = e.xAxis[0].value,
          y = e.yAxis[0].value,
          series = this.series[0],
          xIndex = getIndex(x, series.xData), //get 'index'
          data = series.options.data; //get original data


        if (xIndex > 0) { //add new point only when X-value is different
          data.splice(xIndex, 0, [x, y]);
          series.setData(data);
        }


        function getIndex(x, data) {
          var index = 0,
            dLen = data.length;
          for (var i = 0; i < dLen; i++) {
            if (data[i] > x) {
              index = i;
              i = dLen;
            }
          }
          if (x == data[index]) {
            return -1;
          } else {
            return index;
          }

        }
      }
    }
  },
  xAxis: {

  },
  yAxis: {},
  legend: {
    layout: 'vertical',
    floating: true,
    backgroundColor: '#FFFFFF',
    align: 'right',
    verticalAlign: 'top',
    y: 60,
    x: -60
  },
  tooltip: {
    formatter: function() {
      return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
    }
  },
  plotOptions: {},
  series: [{
    allowPointSelect: true,
    cursor: 'ns-resize',
    point: {
      events: {
        select: function() {
          var pId = this.series.data.indexOf(this);
          currentIndexSelected = pId;


          $('#out').html(
            'Dragging <b>' + this.series.points[pId].y); //this.series.data[0].x + '</b>, <b>');

        },

        drag: function(e) {

          // Returning false stops the drag and drops. Example:
          /*
              if (e.newY > 300) {
                  this.y = 300;
                  return false;
              }
              */
          $('#drag').html(
            'Dragging <b>' + this.series.name + '</b>, <b>' + this.category + '</b> to <b>' + Highcharts.numberFormat(e.newY, 2) + '</b>');
        },
        drop: function() {
          $('#drop').html(
            'In <b>' + this.series.name + '</b>, <b>' + this.category + '</b> was set to <b>' + Highcharts.numberFormat(this.y, 2) + '</b>');
        }
      }
    },
    data: data,
    //data: [[1,29.9], [2,71.5],[3,106.4], [4,129.2], [5,144.0], [6,176.0], [7,135.6], [8,148.5], [9,216.4], [10,194.1], [11,95.6], [12,54.4]],
    draggableX: true,
    draggableY: true,

  }]
});




// button handler
$('#button1').click(function() {
  //this.point[currentIndexSelected].remove();
  var chart = $('#container').highcharts();
  if (chart.series.length == 1) {
    //chart.series[0].remove();
    chart.addSeries({
      data: [194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4],
      draggableX: true,
      draggableY: true
    });
  }




  var series = chart.getSelectedSeries();
  $('#out').html('length:' + series.length);
  // if(data.length<series[0].data.length){
  //    $('#out').html('smaller');
  // }
  /* for(var i=0; i<series.data.length; i++){
       data[i] = series.data[i];
  }*/
  //if (series.data.length) {
  // categories.splice(currentIndexSelected,1);
  // data.splice(currentIndexSelected, 1);

  //var newSerie =
  //chart.series[1].setData(data);
  //chart.redraw();
  //chart.xAxis[0].setCategories(categories);
  //}
});

// button handler
$('#button2').click(function() {
  //this.point[currentIndexSelected].remove();
  //var series = chart.series[0];
  var series = chart.getSelectedSeries();

  //categories.splice(currentIndexSelected,1);
  data.splice(currentIndexSelected, 1);

  chart.series[0].setData(data);
  chart.xAxis[0].setCategories(categories);

});
