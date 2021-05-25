var gs2010 = document.URL.includes('localhost') ? `${document.URL}data/gs1.json` : 'https://www.mouplands.org/test/data/gs1.json';
var gs2015 = document.URL.includes('localhost') ? `${document.URL}data/gs2.json` : 'https://www.mouplands.org/test/data/gs2.json';
var gw2010 = document.URL.includes('localhost') ? `${document.URL}data/gw1.json` : 'https://www.mouplands.org/test/data/gw1.json';
var gw2015 = document.URL.includes('localhost') ? `${document.URL}data/gw2.json` : 'https://www.mouplands.org/test/data/gw2.json';
var gdata;
        var tickss = [];
        var ct = 1;
        while(ct <= 204){
            tickss.push(ct);
            ct++;
        }
var options = {
    legend: { position: 'none' },
    hAxis: {
        viewWindow: {
            min: 0,
            max: 204
        },
        ticks: tickss
    },
    vAxis: { 
        viewWindowMode:'explicit',
        viewWindow:{
          max:150
        }
      },
    histogram: {
        bucketSize: 2,
        maxNumBuckets: 102,
        maxValue: 102
    }
};

function begin() {
    $.ajax({
        url: gs2010,
        method: 'GET',
        cache: false,
        dataType: "json",
        success: calc10
    })
        .done(function () {
            console.log("done");
        });
    $.ajax({
        url: gs2015,
        method: 'GET',
        cache: false,
        dataType: "json",
        success: calc15
    })
        .done(function () {
            console.log("done");
        });
}

function calc10(data) {
    gdata = data.data;
    var slimData = gdata.map((x) => {
        return [x[1], x[20]]
    });
    populateChart10(slimData)
}
function calc15(data) {
    gdata = data.data;
    var slimData = gdata.map((x) => {
        return [x[1], x[20]]
    });
    populateChart15(slimData)
}

function populateChart10(datas) {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(datas);
            var chart = new google.visualization.Histogram(document.getElementById('gs_2010'));
            options.title = `GS utility test scores from 2010 - 2015. dogs tested: ${datas.length}`
            chart.draw(data, options);
        }
}
function populateChart15(datas) {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(datas);
            var chart = new google.visualization.Histogram(document.getElementById('gs_2015'));
            options.title = `GS utility test scores from 2016 - 2021. dogs tested: ${datas.length}`
            chart.draw(data, options);
        }
}
