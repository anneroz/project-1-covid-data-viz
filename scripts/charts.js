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
        group: 'vaccinesVsDeaths',
        type: 'area',
        background: '#f4f4f4'
    },
    colors: ['#001219', '#0A9396', '#E9D8A6'],
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
        group: 'vaccinesVsDeaths',
        type: 'area',
        background: '#f4f4f4'
    },
    colors: ['#9B2226', '#BB3E03', '#EE9B00'],
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