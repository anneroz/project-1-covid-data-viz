// read in historical data for Singapore

let date = [];
let deaths = [];
let vaccines = [];

async function loadData() {
    let vaccineResponse = await axios.get("https://disease.sh/v3/covid-19/vaccine/coverage/countries/sgp?lastdays=all&fullData=true");
    let totalsResponse = await axios.get("https://disease.sh/v3/covid-19/historical/sgp?lastdays=all");

    console.log(vaccineResponse.data);
    console.log(totalsResponse.data);
}

loadData();

// setup global options for charts
window.Apex = {
    chart: {
        height: 160,
    },
    dataLabels: {
        // turn off data labels
        enabled: false
    }
}

// setup options for vaccine chart
let optionsVaccine = {
    series: [{
        name: 'Vaccines Administered',
        data: [4, 8, 15, 16, 23, 42]
    }],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    colors: ['#008FFB'],
    chart: {
        id: 'vaccine-1',
        group: 'vaccineVsDeath',
        type: 'line',
    },
    yaxis: {
        labels: {
            minWidth: 100
        }
    }
};

let vaccineChart = new ApexCharts(document.querySelector("#chart-vaccines"), optionsVaccine)
vaccineChart.render()

// setup options for death chart
let optionsDeath = {
    series: [{
        name: 'Total Deaths',
        data: [25, 25, 27, 30, 31, 31]
    }],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    colors: ['#546E7A'],
    chart: {
        id: 'death-1',
        group: 'vaccineVsDeath',
        type: 'line',
    },
    yaxis: {
        labels: {
            minWidth: 100
        }
    }
};

let deathChart = new ApexCharts(document.querySelector('#chart-deaths'), optionsDeath)
deathChart.render()