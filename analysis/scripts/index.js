var gs2010 = document.URL.includes('localhost') ? `${document.URL}data/gs1.json` : 'https://www.mouplands.org/analysis/data/gs1.json';
var gs2015 = document.URL.includes('localhost') ? `${document.URL}data/gs2.json` : 'https://www.mouplands.org/analysis/data/gs2.json';
var gw2010 = document.URL.includes('localhost') ? `${document.URL}data/gw1.json` : 'https://www.mouplands.org/analysis/data/gw1.json';
var gw2015 = document.URL.includes('localhost') ? `${document.URL}data/gw2.json` : 'https://www.mouplands.org/analysis/data/gw2.json';
var gdata = [];
function genTicks() {
    var tickss = [];
    var ct = 1;
    while (ct <= 204) {
        tickss.push(ct);
        ct++;
    }
    return tickss;
}

var options = {
    legend: { position: 'none' },
    hAxis: {
        viewWindow: {
            min: 0,
            max: 204
        },
        ticks: genTicks()
    },
    vAxis: {
        viewWindowMode: 'explicit',
        viewWindow: {
            max: 150
        }
    },
    histogram: {
        bucketSize: 2,
        maxNumBuckets: 102,
        maxValue: 102
    }
};

async function begin() {
    try{
        await gethistograms();
        populateTestByYear();
    }catch(e){
        console.log(e.responseText);
    }
}

async function gethistograms(){
    await $.ajax({
        url: gs2010,
        method: 'GET',
        cache: false,
        dataType: "json",
        success: calc10
    });
    await $.ajax({
        url: gs2015,
        method: 'GET',
        cache: false,
        dataType: "json",
        success: calc15
    });
}


function calc10(data) {
    gdata.push(...data.data);
    var slimData = slimDatas(data);
    populateHistogram(slimData, 'gs_2010', 'GS Utility scores from 10 - 15')
}
function calc15(data) {
    gdata.push(...data.data);
    var slimData = slimDatas(data);
    populateHistogram(slimData, 'gs_2015', 'GS Utility scores from 16 - 21')
}

function slimDatas(data) {
    var d = data.data.map((x) => {
        return [x[1], x[20]]
    });
    return d;
}

function populateHistogram(datas, divId, title) {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.Histogram(document.getElementById(divId));
        options.title = `${title}. dogs tested: ${datas.length}`
        chart.draw(data, options);
    }
}

function populateTestByYear() {
    var datas = gdata.map((x) => {
        return [x[1], new Date(x[18]).getFullYear()]
    });

    datas = [['dog', 'year tested'], ...datas];
    var byYearOptions = {
        legend: { position: 'none' },
        hAxis: {
            viewWindow: {
                min: 2010,
                max: 2022
            },
            ticks: [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
        },
    };
    byYearOptions.title = `dogs tested by year. total: ${datas.length}`
    
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.Histogram(document.getElementById('gs_by_year'));
        
        chart.draw(data, byYearOptions);
    }
}

// function populatePrizesByYear() {
//     var datas = gdata.map((x) => {
//         return [x[1], new Date(x[18]).getFullYear()]
//     });

//     datas = [['dog', 'year tested'], ...datas];
//     var byYearOptions = {
//         legend: { position: 'none' },
//         hAxis: {
//             viewWindow: {
//                 min: 2010,
//                 max: 2022
//             },
//             ticks: [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
//         },
//     };
//     byYearOptions.title = `dogs tested by year. total: ${datas.length}`
    
//     google.charts.load("current", { packages: ["corechart"] });
//     google.charts.setOnLoadCallback(drawChart);
//     function drawChart() {
//         var data = google.visualization.arrayToDataTable(datas);
//         var chart = new google.visualization.Histogram(document.getElementById('gs_by_year'));
        
//         chart.draw(data, byYearOptions);
//     }
// }

