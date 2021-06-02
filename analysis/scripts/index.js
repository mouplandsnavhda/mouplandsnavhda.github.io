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
    trendlines: { 0: { type: 'exponential', color: 'red' } },
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
    try {
        await gethistograms();
        populateTestByYear();
        populatePrizesByYear();
        populateBreeders();
        populateSires();
        populateDams();
        populateVCs();
        breederColumn("chip");
        populateBreederSelect();

    } catch (e) {
        console.log(e.responseText);
    }
}

async function gethistograms() {
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
    populateHistogram(slimData, 'gs_2010', 'GS Utility scores from 2010 - 2015')
}
function calc15(data) {
    gdata.push(...data.data);
    var slimData = slimDatas(data);
    populateHistogram(slimData, 'gs_2015', 'GS Utility scores from 2016 - (spring)2021')
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
            ticks: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
        },
    };
    byYearOptions.title = `dogs tested by year. total: ${datas.length - 1}`

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.Histogram(document.getElementById('gs_by_year'));

        chart.draw(data, byYearOptions);
    }
}

var graphData = [];
function populatePrizesByYear() {
    var datas = gdata.map((x) => {
        return [x[1], new Date(x[18]).getFullYear(), x[21]]
    });
    // dog, year, prize
    var years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

    years.forEach(year => {

        var yearList = datas.filter(x => x[1] == year);
        var dogsTestedInYear = yearList.length;

        var p1ct = yearList.filter(x => x[2] == 'I').length;
        var p2ct = yearList.filter(x => x[2] == 'II').length;
        var p3ct = yearList.filter(x => x[2] == 'III').length;
        var p0ct = yearList.filter(x => x[2].toLowerCase() == 'none').length;
        graphData.push(
            [
                year.toString(),
                p1ct / dogsTestedInYear * 100,
                p2ct / dogsTestedInYear * 100,
                p3ct / dogsTestedInYear * 100,
                p0ct / dogsTestedInYear * 100,
            ]
        );
    });
    graphData = [['year', 'p1', 'p2', 'p3', 'p0'], ...graphData];

    var p1 = datas.filter(x => x[2] == 'I').map(y => { return [y[0], y[1]] });
    p1 = [['dog', 'prize'], ...p1];
    var p2 = datas.filter(x => x[2] == 'II').map(y => { return [y[0], y[1]] });
    p2 = [['dog', 'prize'], ...p2];
    var p3 = datas.filter(x => x[2] == 'III').map(y => { return [y[0], y[1]] });
    p3 = [['dog', 'prize'], ...p3];
    var p0 = datas.filter(x => x[2].toLowerCase() == 'none').map(y => { return [y[0], y[1]] });
    p0 = [['dog', 'prize'], ...p0];

    var byYearOptions = {
        legend: { position: 'none' },
        hAxis: {
            viewWindow: {
                min: 2010,
                max: 2022
            },
            ticks: years
        },
    };

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart1);
    function drawChart1() {
        var data = google.visualization.arrayToDataTable(p1);
        var chart = new google.visualization.Histogram(document.getElementById('gs_prize1_by_year'));

        byYearOptions.title = `Prize 1 by year. total: ${p1.length}`
        chart.draw(data, byYearOptions);
    }

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart2);
    function drawChart2() {
        var data = google.visualization.arrayToDataTable(p2);
        var chart = new google.visualization.Histogram(document.getElementById('gs_prize2_by_year'));

        byYearOptions.title = `Prize 2 by year. total: ${p2.length}`
        chart.draw(data, byYearOptions);
    }

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart3);
    function drawChart3() {
        var data = google.visualization.arrayToDataTable(p3);
        var chart = new google.visualization.Histogram(document.getElementById('gs_prize3_by_year'));

        byYearOptions.title = `Prize 3 by year. total: ${p3.length}`
        chart.draw(data, byYearOptions);
    }

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart0);
    function drawChart0() {
        var data = google.visualization.arrayToDataTable(p0);
        var chart = new google.visualization.Histogram(document.getElementById('gs_prize0_by_year'));

        byYearOptions.title = `Prize None by year. total: ${p0.length}`
        chart.draw(data, byYearOptions);
    }

    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChartPrizePercentage);
    function drawChartPrizePercentage() {
        var data = google.visualization.arrayToDataTable(graphData);

        var options = {
            chart: {
                title: 'Prize Breakdown',
                subtitle: 'Expressed in percentages',
            }
        };

        var chart = new google.charts.Bar(document.getElementById('gs_prize_percentages_by_year'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}


function populateBreeders() {
    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Unique Dogs');
        data.addColumn('number', 'Prize 1');
        data.addColumn('number', 'Prize 2');
        data.addColumn('number', 'Prize 3');
        data.addColumn('number', 'Prize 0');
        data.addColumn('number', 'Prize 1%');
        data.addColumn('number', 'Prize 2%');
        data.addColumn('number', 'Prize 3%');
        data.addColumn('number', 'Prize 0%');

        const countUnique = arr => {
            const counts = {};
            for (var i = 0; i < arr.length; i++) {
                counts[arr[i]] = 1 + (counts[arr[i]] || 0);
            };
            return counts;
        };

        var breeders = gdata.map(x => x[7]);
        var distinctBreeders = [...new Set(breeders)];

        



        var p1 = countUnique(gdata.filter(x => x[21] == "I").map(x => x[7]));
        var p2 = countUnique(gdata.filter(x => x[21] == "II").map(x => x[7]));
        var p3 = countUnique(gdata.filter(x => x[21] == "III").map(x => x[7]));
        var p0 = countUnique(gdata.filter(x => x[21] == "None").map(x => x[7]));

        var sireRollup = [];

        sireRollup = distinctBreeders.map((uSire) => {
            var allRuns = gdata.filter(x => x[7] == uSire).map(x => x[1]);
            var uniqDogs = [...new Set(allRuns)].length
            var p1ct = p1[uSire] ?? 0;
            var p2ct = p2[uSire] ?? 0;
            var p3ct = p3[uSire] ?? 0;
            var p0ct = p0[uSire] ?? 0;
            var pTotal = p1ct + p2ct + p3ct + p0ct;
            var arr = [
                uSire,
                uniqDogs,
                p1ct,
                p2ct,
                p3ct,
                p0ct,
                Math.round(p1ct / pTotal * 100),
                Math.round(p2ct / pTotal * 100),
                Math.round(p3ct / pTotal * 100),
                Math.round(p0ct / pTotal * 100)
            ]
            return arr;
        });

        data.addRows(sireRollup);

        var table = new google.visualization.Table(document.getElementById('gs_prize_breeders'));

        table.draw(data, { page: 'enable', showRowNumber: true, width: '100%', height: '100%',alternatingRowStyle: true, cssClassNames: {oddTableRow: "analysis-table"} });
    }
}

function populateSires() {
    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Prize 1');
        data.addColumn('number', 'Prize 2');
        data.addColumn('number', 'Prize 3');
        data.addColumn('number', 'Prize 0');

        const countUnique = arr => {
            const counts = {};
            for (var i = 0; i < arr.length; i++) {
                counts[arr[i]] = 1 + (counts[arr[i]] || 0);
            };
            return counts;
        };

        var sires = gdata.map(x => x[3]);
        var distinctSires = [...new Set(sires)];



        var p1Sires = countUnique(gdata.filter(x => x[21] == "I").map(x => x[3]));
        var p2Sires = countUnique(gdata.filter(x => x[21] == "II").map(x => x[3]));
        var p3Sires = countUnique(gdata.filter(x => x[21] == "III").map(x => x[3]));
        var p0Sires = countUnique(gdata.filter(x => x[21] == "None").map(x => x[3]));

        var sireRollup = [];

        sireRollup = distinctSires.map(uSire => [
            uSire,
            p1Sires[uSire] ?? 0,
            p2Sires[uSire] ?? 0,
            p3Sires[uSire] ?? 0,
            p0Sires[uSire] ?? 0,
        ]);

        data.addRows(sireRollup);

        var table = new google.visualization.Table(document.getElementById('gs_prize_sires'));

        table.draw(data, { page: 'enable', showRowNumber: true, width: '100%', height: '100%',alternatingRowStyle: true, cssClassNames: {oddTableRow: "analysis-table"} });
    }
}

function populateDams() {
    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Prize 1');
        data.addColumn('number', 'Prize 2');
        data.addColumn('number', 'Prize 3');
        data.addColumn('number', 'Prize 0');

        const countUnique = arr => {
            const counts = {};
            for (var i = 0; i < arr.length; i++) {
                counts[arr[i]] = 1 + (counts[arr[i]] || 0);
            };
            return counts;
        };

        var sires = gdata.map(x => x[8]);
        var distinctSires = [...new Set(sires)];



        var p1Sires = countUnique(gdata.filter(x => x[21] == "I").map(x => x[8]));
        var p2Sires = countUnique(gdata.filter(x => x[21] == "II").map(x => x[8]));
        var p3Sires = countUnique(gdata.filter(x => x[21] == "III").map(x => x[8]));
        var p0Sires = countUnique(gdata.filter(x => x[21] == "None").map(x => x[8]));

        var sireRollup = [];

        sireRollup = distinctSires.map(uSire => [
            uSire,
            p1Sires[uSire] ?? 0,
            p2Sires[uSire] ?? 0,
            p3Sires[uSire] ?? 0,
            p0Sires[uSire] ?? 0,
        ]);

        data.addRows(sireRollup);

        var table = new google.visualization.Table(document.getElementById('gs_prize_dams'));

        table.draw(data, { page: 'enable', showRowNumber: true, width: '100%', height: '100%',alternatingRowStyle: true, cssClassNames: {oddTableRow: "analysis-table"} });
    }
}

function populateVCs() {
    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Prize 1');
        data.addColumn('number', 'Prize 2');
        data.addColumn('number', 'Prize 3');
        data.addColumn('number', 'Prize 0');

        const countUnique = arr => {
            const counts = {};
            for (var i = 0; i < arr.length; i++) {
                counts[arr[i]] = 1 + (counts[arr[i]] || 0);

            };
            return counts;
        };
        var vcdata = gdata.filter(x => x[1].startsWith('VC'));
        var vcs = vcdata.map(x => x[1]);

        var distinctVCs = [...new Set(vcs)];



        var p1vc = countUnique(vcdata.filter(x => x[21] == "I").map(x => x[1]));
        var p2vc = countUnique(vcdata.filter(x => x[21] == "II").map(x => x[1]));
        var p3vc = countUnique(vcdata.filter(x => x[21] == "III").map(x => x[1]));
        var p0vc = countUnique(vcdata.filter(x => x[21] == "None").map(x => x[1]));

        var vcRollup = [];

        vcRollup = distinctVCs.map(uSire => [
            uSire,
            p1vc[uSire] ?? 0,
            p2vc[uSire] ?? 0,
            p3vc[uSire] ?? 0,
            p0vc[uSire] ?? 0,
        ]);

        data.addRows(vcRollup);

        var table = new google.visualization.Table(document.getElementById('gs_vc_prize'));

        table.draw(data, { page: 'enable', showRowNumber: true, width: '100%', height: '100%',alternatingRowStyle: true, cssClassNames: {oddTableRow: "analysis-table"} });
    }
}

function breederColumn(breederName){
    
    var years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']

    var breederAllScores = gdata.filter(x => x[7] == breederName);

    var breederTableData = [];

    years.forEach(year => {
        var yearScores = breederAllScores.filter(x => new Date(x[18]).getFullYear() == year);
        var p1 = yearScores.filter(x => x[21] == "I").length;
        var p2 = yearScores.filter(x => x[21] == "II").length;
        var p3 = yearScores.filter(x => x[21] == "III").length;
        var p0 = yearScores.filter(x => x[21] == "None").length;
        breederTableData.push([
            year, 
            p1, 
            p2,
            p3,
            p0
        ]);
    });

    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Year", "Prize 1", "Prize 2", "Prize 3", "Prize 0(None)"],
        ...breederTableData
      ]);

      var options = {
        chart: {
          title: 'Breeder Prizes over time',
          subtitle: '2010 - (spring) 2021',
        }
      };

      var chart = new google.charts.Bar(document.getElementById('breeder_column'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}

function populateBreederSelect(){
    console.log(gdata.length);
    var breeders = gdata.map(x => x[7]);
    var distinctBreeders = [...new Set(breeders)].sort();

    distinctBreeders.forEach(breeder => {
        var option = $('<option value="'+breeder+'">');
        $('#brow').append(option);
    });
}

function wireUpChange(){
    

    $("#breeder-selector").change(function () {
        var val = this.value;
        if($('#brow option').filter(() => {
            return this.value.toUpperCase() === val.toUpperCase();        
        }).length) {
           console.log(this.value);
           breederColumn(this.value);
        }
    });

    $("#breeder-selector").click(function () { $("#breeder-selector").val('') })
}


