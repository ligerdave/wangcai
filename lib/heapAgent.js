'use strict'

var gc = (require('gc-stats'))();
var Measured = require('measured');

/**
ops(object) is an optional param
*/
function agent(ops) {

  var metrics = {
    majorGcCount: new Measured.Counter(),
    minorGcCount: new Measured.Counter(),
    totalGcTime: new Measured.Histogram()
  };

  function resetMetrics() {
    metrics.majorGcCount = new Measured.Counter();
    metrics.minorGcCount = new Measured.Counter();
    metrics.totalGcTime = new Measured.Histogram();
  }

  return {
    start: function() {
      gc.on('stats', function(stats) {
        switch (stats.gctype) {
          case 1:
            metrics.minorGcCount.inc();
            break;
          case 2:
            metrics.majorGcCount.inc();
            break;
          case 3:
            metrics.minorGcCount.inc();
            metrics.majorGcCount.inc();
            break;
        };

        if (stats.pause) {
          metrics.totalGcTime.update(stats.pause);
        }
        console.log('gc stats reported');
      });
    },

    getMetrics: function() {
      var m = {
        majorGcCount: metrics.majorGcCount.toJSON(),
        minorGcCount: metrics.minorGcCount.toJSON(),
        totalGcTime: metrics.totalGcTime.toJSON()
      };
      return m;
    },

    stop: function() {
      resetMetrics();
    }


  };



}


module.exports = agent;