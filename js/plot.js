var income = [[14, 0], [15, 0.7], [16, 1], [17, 0.9], [18, 0.5], [19, 0.1], [20, 0]];
var credit = [[10, 0], [11, 0.2], [12, 0.8], [13, 1], [14, 0.9], [15, 0.4], [16, 0]];
var profit = [[-2, 0], [-1, 0], [0, 0.4], [1, 0.7], [2, 0.9], [3, 1], [4, 0.9], [5, 0.8], [6, 0.5], [7, 0.2], [8, 0.1], [9, 0], [10, 0]];
var insolvency = [[-3, 1], [-2, 0.8], [-1, 0.7], [0, 0.6], [1, 0.3], [2, 0.1], [3, 0]];

var incomeChart = createChart('income', income, redrawFunction);
var incomeSeries = incomeChart.series[0];

var creditChart = createChart('credit', credit, redrawFunction);
var creditSeries = creditChart.series[0];

var insolvencyChart = createChart('insolvency', insolvency, redrawFunction);
var insolvencySeries = insolvencyChart.series[0];

var profitChart = createChart('profit', profit);
var profitSeries = profitChart.series[0];

function redrawFunction(series) {
  var profit = {};

  for(var i = 0; i < incomeSeries.xData.length; i++) {
    for(var j = 0; j < creditSeries.yData.length; j++) {
      profit[incomeSeries.xData[i] - creditSeries.xData[j]] = Math.max(Math.min(incomeSeries.yData[i], creditSeries.yData[j]), profit[incomeSeries.xData[i] - creditSeries.xData[j]] || 0);
    }
  }

  profit = Object.keys(profit)
                 .map(key => parseFloat(key))
                 .sort((a,b) => a - b)
                 .map(key => [key, profit[key]]);

  var risk = 0;

  for(var i = 0; i < profitSeries.xData.length; i++) {
    for(var j = 0; j < insolvencySeries.xData.length; j++) {
      if(profitSeries.xData[i] == insolvencySeries.xData[j]) {
        risk = Math.max(Math.min(profitSeries.yData[i], insolvencySeries.yData[j]), risk);
      } else if (profitSeries.xData[i] < insolvencySeries.xData[0]) {
        risk = Math.max(insolvencySeries.yData[0], risk);
      }
    }
  }

  $('#risk').text(risk.toFixed(2));

  profitSeries.setData(profit, true);
}

function createChart(seriesName, data, onDataChangeFunction) {
    return new Highcharts.Chart({
        title: {
           text: seriesName
        },
        chart: {
            renderTo: seriesName,
            animation: false,
            /*events: {
              click: function(e) {
                if(onDataChangeFunction) {
                  this.series[0].addPoint([e.xAxis[0].value, e.yAxis[0].value]);
                  onDataChangeFunction();
                }
              }
            }*/
        },
        series: [{
            name: seriesName,
            type: 'line',
            cursor: 'move',
            //draggableX: true,
            draggableY: true,
            data: data
        }],
        plotOptions: {
            series: {
                point: {
                    events: {
                        drop: function() {
                          redrawFunction(this.series.data);
                        },
                        click: function() {
                           redrawFunction(this.series.data);
                        }
                    }
                }
            }
        }
    });
}
