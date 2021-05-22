// define options for vaccines chart
const vaccinesOptions = {
    chart: {
        id: 'line-vaccines',
        group: 'vaccinesVsDeaths',
        type: 'line',
        height: '100%',
        width: '100%'
    },
    colors: ['#008FFB'],
    noData: {
        text: "Loading...please wait."
    },
    series: [],
    yaxis: {
        labels: {
            minWidth: 40
        }
    }
};

// create and render vaccines chart
const vaccinesChart = new ApexCharts(document.querySelector("#chart-vaccines"), vaccinesOptions);
vaccinesChart.render();

// define options for deaths chart
const deathsOptions = {
    chart: {
        id: 'line-deaths',
        group: 'vaccinesVsDeaths',
        type: 'line',
        height: '100%',
        width: '100%'
    },
    colors: ['#546E7A'],
    noData: {
        text: 'Loading...please wait.'
    },
    series: [],
    yaxis: {
        labels: {
            minWidth: 40
        }
    }
};

// create and render deaths chart
const deathsChart = new ApexCharts(document.querySelector("#chart-deaths"), deathsOptions);
deathsChart.render();