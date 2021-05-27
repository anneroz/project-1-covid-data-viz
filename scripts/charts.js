let vaccinesOptions = {
    noData: {
        text: 'Please wait...loading data.'
    },
    series: [
        {
            name: 'Vaccines',
            data: []
        },
    ],
    title: {
        text: 'Historical Number of Vaccines Administered'
    },
    chart: {
        id: 'area-vaccines',
        height: '100%',
        group: 'vaccinesVsDeaths',
        type: 'area',
        background: '#f4f4f4',
        fontFamily: 'Roboto Condensed, sans-serif'
    },
    colors: ['#0AD1D1'],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    yaxis: {
        labels: {
            minWidth: 40
        }
    },
    xaxis: {
        type: 'datetime'
    }
};

let vaccinesChart = new ApexCharts(document.querySelector("#chart-vaccines"), vaccinesOptions);
vaccinesChart.render();

let deathsOptions = {
    noData: {
        text: 'Please wait...loading data.'
    },
    series: [
        {
            name: 'Deaths',
            data: []
        }
    ],
    title: {
        text: 'Historical Number of Deaths'
    },
    chart: {
        id: 'area-deaths',
        height: '100%',
        group: 'vaccinesVsDeaths',
        type: 'area',
        background: '#f4f4f4',
        fontFamily: 'Roboto Condensed, sans-serif'
    },
    colors: ['#D10A0A'],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    yaxis: {
        labels: {
            minWidth: 40
        }
    },
    xaxis: {
        type: 'datetime'
    }
};

let deathsChart = new ApexCharts(document.querySelector("#chart-deaths"), deathsOptions);
deathsChart.render();