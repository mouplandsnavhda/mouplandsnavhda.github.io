var gdata = [];

var legend = {
    "breed": 0,
    "name": 1,
    "whelped": 2,
    "sire": 3,
    "owner": 6,
    "breeder": 7,
    "dam": 8,
    "coat": 15,
    "chapter": 16,
    "test": 17, 
    "date": 18,
    "ageFormat": 19,
    "score": 20,
    "prize": 21,
    "temperment": 22
}

const countUnique = arr => {
    const counts = {};
    for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    };
    return counts;
};

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
        viewWindowMode: 'maximized',
        // viewWindow: {
        //     max: 150
        // }
    },
    histogram: {
        bucketSize: 2,
        maxNumBuckets: 102,
        maxValue: 102
    }
};

async function begin(breedPrefix) {
    try {
        gdata = [];
        await getGData(breedPrefix);
        
        populateHistogram(gdata, 'gs_2010', 'Utility scores from 2010 - 2015', [2010,2011,2012,2013,2014,2015])
        populateHistogram(gdata, 'gs_2015', 'Utility scores from 2016 - (spring)2021', [2016,2017,2018,2019,2020,2021])

        populateTestByYear();
        populatePrizesByYear();
        utSex();

        populateStatsTable(legend.breeder, 'gs_prize_breeders');
        populateStatsTable(legend.sire, 'gs_prize_sires');
        populateStatsTable(legend.dam, 'gs_prize_dams');
        
        populateVCs();
        breederColumn("chip");
        breederTestLocation("empty");
        breederCoat("empty");
        populateBreederSelect();

    } catch (e) {
        console.log(e.responseText);
    }
}

async function getGData(breedPrefix) {
    await $.ajax({
        url: getDataUrl(breedPrefix),
        method: 'GET',
        cache: false,
        dataType: "json",
        success: pushToGData
    });
}

function getDataUrl(breedPrefix){
    var url
    switch (breedPrefix) {
        case 'gs':
          url = document.URL.includes('localhost') ? `${document.URL}data/gs10_21.json` : 'https://www.mouplands.org/analysis/data/gs10_21.json';
          break;
        case 'gw':
          url = document.URL.includes('localhost') ? `${document.URL}data/gw10_21.json` : 'https://www.mouplands.org/analysis/data/gw10_21.json';
          break;
        case 'vi':
          url = document.URL.includes('localhost') ? `${document.URL}data/vi.json` : 'https://www.mouplands.org/analysis/data/vi.json';
          break;
        case 'pp':
          url = document.URL.includes('localhost') ? `${document.URL}data/pp.json` : 'https://www.mouplands.org/analysis/data/pp.json';
          break;
        default:
          console.log(`The Breed ${url} is unrecognizable.`);
      }
      return url;
}


function pushToGData(data) {
    gdata.push(...data.data);
}


function populateHistogram(datas, divId, title, years) {
    var slimData = gdata.filter(x => years.includes(new Date(x[18]).getFullYear())).map(x => [x[1], x[20]]);
    
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(slimData);
        var chart = new google.visualization.Histogram(document.getElementById(divId));
        options.title = `${title}. dogs tested: ${slimData.length}`
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
        histogram: {
            bucketSize: 1,
        }
    };
    byYearOptions.title = `dogs tested by year. total: ${datas.length - 1}`

    
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.Histogram(document.getElementById('gs_by_year'));

        chart.draw(data, byYearOptions);
    }
}

function populatePrizesByYear() {
    var graphData = [];
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
        histogram: {
            bucketSize: 1,
        }
    };

    
    google.charts.setOnLoadCallback(drawChart1);
    function drawChart1() {
        var data = google.visualization.arrayToDataTable(p1);
        var chart = new google.visualization.Histogram(document.getElementById('gs_prize1_by_year'));

        byYearOptions.title = `Prize 1 by year. total: ${p1.length}`
        chart.draw(data, byYearOptions);
    }

    
    google.charts.setOnLoadCallback(drawChart2);
    function drawChart2() {
        var data = google.visualization.arrayToDataTable(p2);
        var chart = new google.visualization.Histogram(document.getElementById('gs_prize2_by_year'));

        byYearOptions.title = `Prize 2 by year. total: ${p2.length}`
        chart.draw(data, byYearOptions);
    }

    
    google.charts.setOnLoadCallback(drawChart3);
    function drawChart3() {
        var data = google.visualization.arrayToDataTable(p3);
        var chart = new google.visualization.Histogram(document.getElementById('gs_prize3_by_year'));

        byYearOptions.title = `Prize 3 by year. total: ${p3.length}`
        chart.draw(data, byYearOptions);
    }

    
    google.charts.setOnLoadCallback(drawChart0);
    function drawChart0() {
        var data = google.visualization.arrayToDataTable(p0);
        var chart = new google.visualization.Histogram(document.getElementById('gs_prize0_by_year'));

        byYearOptions.title = `Prize None by year. total: ${p0.length}`
        chart.draw(data, byYearOptions);
    }

    
    google.charts.setOnLoadCallback(drawChartPrizePercentage);
    function drawChartPrizePercentage() {
        var data = google.visualization.arrayToDataTable(graphData);

        var options = {
            chart: {
                title: 'Prize Breakdown in %',
                subtitle: 'Click the legend to bring data to the forefront.',
            }
        };

        var chart = new google.charts.Bar(document.getElementById('gs_prize_percentages_by_year'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}

function utSex(){
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var sexes = gdata.filter(x => x[legend.prize] == "I").map(x => x[legend.name].replace(/.*\(/,'').replace(/\).*/,''));
        var mCount = sexes.filter(x => x == 'Male').length;
        var fCount = sexes.filter(x => x == 'Female').length;
        var data = google.visualization.arrayToDataTable([
          ['Sex', 'Count'],
          ['Male', mCount],
          ['Female', fCount]
        ]);

        var options = {
          title: 'Utility Prize I by sex',
          pieHole: 0.0,
        };

        var chart = new google.visualization.PieChart(document.getElementById('ut1_sex'));
        chart.draw(data, options);
      }

      google.charts.setOnLoadCallback(drawChart2);
      function drawChart2() {
        var sexes = gdata.filter(x => x[legend.prize] == "II").map(x => x[legend.name].replace(/.*\(/,'').replace(/\).*/,''));
        var mCount = sexes.filter(x => x == 'Male').length;
        var fCount = sexes.filter(x => x == 'Female').length;
        var data = google.visualization.arrayToDataTable([
          ['Sex', 'Count'],
          ['Male', mCount],
          ['Female', fCount]
        ]);

        var options = {
          title: 'Utility Prize II by sex',
          pieHole: 0.0,
        };

        var chart = new google.visualization.PieChart(document.getElementById('ut2_sex'));
        chart.draw(data, options);
      }

      google.charts.setOnLoadCallback(drawChart3);
      function drawChart3() {
        var sexes = gdata.filter(x => x[legend.prize] == "III").map(x => x[legend.name].replace(/.*\(/,'').replace(/\).*/,''));
        var mCount = sexes.filter(x => x == 'Male').length;
        var fCount = sexes.filter(x => x == 'Female').length;
        var data = google.visualization.arrayToDataTable([
          ['Sex', 'Count'],
          ['Male', mCount],
          ['Female', fCount]
        ]);

        var options = {
          title: 'Utility Prize III by sex',
          pieHole: 0.0,
        };

        var chart = new google.visualization.PieChart(document.getElementById('ut3_sex'));
        chart.draw(data, options);
      }

      google.charts.setOnLoadCallback(drawChart0);
      function drawChart0() {
        var sexes = gdata.filter(x => x[legend.prize] == "None").map(x => x[legend.name].replace(/.*\(/,'').replace(/\).*/,''));
        var mCount = sexes.filter(x => x == 'Male').length;
        var fCount = sexes.filter(x => x == 'Female').length;
        var data = google.visualization.arrayToDataTable([
          ['Sex', 'Count'],
          ['Male', mCount],
          ['Female', fCount]
        ]);

        var options = {
          title: 'Utility Prize 0 by sex',
          pieHole: 0.0,
        };

        var chart = new google.visualization.PieChart(document.getElementById('ut0_sex'));
        chart.draw(data, options);
      }
}


function populateStatsTable(tablePK, chartId) {
    
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Dogs Tested');
        data.addColumn('number', 'Prize 1');
        data.addColumn('number', 'Prize 2');
        data.addColumn('number', 'Prize 3');
        data.addColumn('number', 'Prize 0');
        data.addColumn('number', 'Prize 1%');
        data.addColumn('number', 'Prize 2%');
        data.addColumn('number', 'Prize 3%');
        data.addColumn('number', 'Prize 0%');

        var keys = gdata.map(x => x[tablePK]);
        var distinctKeys = [...new Set(keys)];

        var p1 = countUnique(gdata.filter(x => x[legend.prize] == "I").map(x => x[tablePK]));
        var p2 = countUnique(gdata.filter(x => x[legend.prize] == "II").map(x => x[tablePK]));
        var p3 = countUnique(gdata.filter(x => x[legend.prize] == "III").map(x => x[tablePK]));
        var p0 = countUnique(gdata.filter(x => x[legend.prize] == "None").map(x => x[tablePK]));

        var rollup = [];

        rollup = distinctKeys.map((key) => {
            var allRuns = gdata.filter(x => x[tablePK] == key).map(x => x[1]);
            var uniqProgeny = [...new Set(allRuns)].length
            var p1ct = p1[key] ?? 0;
            var p2ct = p2[key] ?? 0;
            var p3ct = p3[key] ?? 0;
            var p0ct = p0[key] ?? 0;
            var pTotal = p1ct + p2ct + p3ct + p0ct;
            var tableRow = [
                key,
                uniqProgeny,
                p1ct,
                p2ct,
                p3ct,
                p0ct,
                Math.round(p1ct / pTotal * 100),
                Math.round(p2ct / pTotal * 100),
                Math.round(p3ct / pTotal * 100),
                Math.round(p0ct / pTotal * 100)
            ]
            return tableRow;
        });

        data.addRows(rollup);

        var table = new google.visualization.Table(document.getElementById(chartId));

        table.draw(data, { page: 'enable', showRowNumber: true, width: '100%', height: '100%',alternatingRowStyle: true, cssClassNames: {oddTableRow: "analysis-table"} });
    }
}

function populateVCs() {
    
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

function breederTestLocation(breederName){
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var locations = gdata.filter(x => x[legend.breeder] == breederName).map(x => x[legend.chapter]);
        var locationCount = countUnique(locations);

        var data = google.visualization.arrayToDataTable([
          ['Test Location', 'Count'],
          ...Object.entries(locationCount)
        ]);

        var options = {
          title: 'Test Locations',
          pieHole: 0.0,
        };

        var chart = new google.visualization.PieChart(document.getElementById('breeder_test_location'));
        chart.draw(data, options);
      }
}

function breederCoat(breederName){
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var locations = gdata.filter(x => x[legend.breeder] == breederName).map(x => x[legend.coat]);
      var locationCount = countUnique(locations);

      var data = google.visualization.arrayToDataTable([
        ['Coat', 'Count'],
        ...Object.entries(locationCount)
      ]);

      var options = {
        title: 'Coat Scores',
        pieHole: 0.0,
      };

      var chart = new google.visualization.PieChart(document.getElementById('breeder_coat'));
      chart.draw(data, options);
    }
}

function populateBreederSelect(){
    $('#brow').empty();
    $('#breeder-selector').val('');
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
           breederColumn(this.value);
           breederTestLocation(this.value);
           breederCoat(this.value);
        }
    });

    $("#breeder-selector").click(function () { $("#breeder-selector").val('') });

    $('.form-check-input').change(x => {
        begin($(x.target).val());
    });
}


