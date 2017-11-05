(function () {
  'use strict';

  angular
    .module('charts.dygraphsHour')
    .controller('dygraphsControllerHour', dygraphsControllerHour);

  /* @ngInject */
  function dygraphsControllerHour(
    $scope,
    c8yTitle,
    c8yMeasurements,
    gettext
  ) {

    angular.element(document).ready(init);
    $scope.refresh = refresh;
    var g;

    function refresh() {
      g.updateOptions(
          {
              'file': [[0,0]]
          }
      );
      init();
    }

    function buildRow(seriesList, baseDateParts) {
      var seriesData = [];
      _.forEach(seriesList, function(series) {
        var singleSeries = [new Date(baseDateParts + ' ' + series.time)];
        seriesData.push(singleSeries.concat(series.values));
      });
      return seriesData;
    }

    function buildData(measurements) {
      var data = [];
      var data2 = [];
      var header = ['Time'];
      var baseDateParts;

      _.forEach(measurements, function(measurement) {
        baseDateParts = measurement.time.split('T')[0];
        baseDateParts = baseDateParts.replace('-', '/');
        var seriesRow = buildRow(measurement.c8y_ExperimentMeasurements, baseDateParts);
        data = data.concat(seriesRow);
      });

      g = new Dygraph(document.getElementById("dygraphdiv"),data,
      {
        labels: header.concat(measurements['0'].seriesLabels)
      });
    }

    function init() {
      c8yMeasurements.list(
        {
          fragmentType: 'c8y_ExperimentMeasurements',
          source: '1096859',
          dateFrom: '2017-09-21',
          dateTo: '2017-09-24'
        }
      ).then(buildData);
    }
  }
}());
/*

"Date,Temperature,Test\n" +
"2008-05-07,75,1\n" +
"2008-05-08,70,1\n" +
"2008-05-09,80,1\n" +
"2008-05-10,70,1\n" +
"2008-05-11,70,1\n" +
"2008-05-12,70,1\n"

"Date,Series1,Series2\n" +
              "1247382000,100,200\n" +
              "1247986800,150,201\n"
*/
