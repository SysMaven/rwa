//ApexCharts

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const [todayYear, todayMonth, todayDay, tomorrowYear, tomorrowMonth, tomorrowDay,] = [
    today.getFullYear(),
    (today.getMonth() < 9 ? '0': '') + (today.getMonth() + 1),
    (today.getDate() < 10 ? '0': '') + (today.getDate()),
    tomorrow.getFullYear(),
    (tomorrow.getMonth() < 9 ? '0': '') + (tomorrow.getMonth() + 1),
    (tomorrow.getDate() < 10 ? '0': '') + (tomorrow.getDate()),
  ];

const
    begin_date = `${todayYear}${todayMonth}${todayDay}`,
    end_date = `${tomorrowYear}${tomorrowMonth}${tomorrowDay}`;

const 
    product = 'predictions',
    application = 'NOS.COOPS.TAC.WL',
    station = 'TWC0419',
    datum = 'MLLW',
    time_zone = 'lst_ldt',
    units = 'english',
    interval = 'hilo',
    format = 'json';

var options = {
    title: {
        text: 'Tides'
    },
    chart: {
        type: "line",
        height: 300,
        foreColor: "#999",
        stacked: true,
        dropShadow: {
            enabled: true,
            enabledSeries: [0],
            top: -2,
            left: 2,
            blur: 5,
            opacity: 0.06
        },
        toolbar: {
            tools: {
                download: false
            }
        }
    },
    colors: ['#0090FF'],
    stroke: {
        curve: "smooth",
        width: 3
    },
    dataLabels: {
        enabled: true
    },
    series: [],
    noData: {
        text: 'Loading...'
    },
    markers: {
        size: 0,
        strokeColor: "#fff",
        strokeWidth: 3,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
            size: 6
        }
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        tooltip: {
            enabled: false
        }
    },
    yaxis: {
        labels: {
            offsetX: 14,
            offsetY: -5,
            formatter: (value) => { return value }
        },
        tooltip: {
            enabled: false
        },
        forceNiceScale: true
    },
    grid: {
        padding: {
            left: 5,
            right: -20
        }
    },
    tooltip: {
        x: {
            format: "ddd, MMM d, h:mm TT"
        },
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    fill: {
        type: "solid",
        fillOpacity: 0.7
    }
};

var chart = new ApexCharts(document.querySelector("#timeline-chart"), options);

chart.render();


const tide_data = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=${product}&application=${application}&begin_date=${begin_date}&end_date=${end_date}&datum=${datum}&station=${station}&time_zone=${time_zone}&units=${units}&interval=${interval}&format=${format}`;
fetch(tide_data)
    .then((response) => response.json())
    .then((data) => {

        var chartData = [];
        
        data.predictions.forEach(prediction => {
            chartData.push([prediction.t, parseFloat(prediction.v).toFixed(1)]);
            //console.log(prediction) print in HTML???
        });
    
        chart.updateSeries([{
            "name": "Tide (ft)",
            "data": chartData
        }])
    });
