//////////////////////// global variables ////////////////////////

// to store transformed raw data
let vaccinesSeries = [];
let deathsSeries = [];

// to store dates of vaccines cases after removing 0 cases
let vaccinesDates = []

let filteredDeathsSeries = [];

//////////////////////////////////////////////////////////////////

// to read in url
async function load(url) {
    let response = await axios.get(url);
    return (response.data);
}

// to transform data to reflect 'x' and 'y' keys
function transformData(vaccineData, historicalData) {

    for (let i in vaccineData.timeline) {
        // remove all cases with 0 vaccinations
        if (vaccineData.timeline[i].total !== 0) {
            vaccinesSeries.push({
                'x': vaccineData.timeline[i].date,
                'y': vaccineData.timeline[i].total
            })
        }
    }

    for (let i in historicalData.timeline.deaths) {
        deathsSeries.push({
            'x': i,
            'y': historicalData.timeline.deaths[i]
        })
    }

    // vaccines raw data dates starts on 1 Dec 2020, deaths raw date dates starts on 22 Jan 2020
    for (let datnum of vaccinesSeries) {
        vaccinesDates.push(datnum.x);
    }

    for (let datnum of deathsSeries) {
        if (vaccinesDates.includes(datnum.x)) {
            filteredDeathsSeries.push({
                'x': datnum.x,
                'y': datnum.y
            })
        }
    }
}

let vaccinesOptions = {
    noData: {
        text: 'Please wait...loading data.'
    },
    series: [
        {
            name: 'Vaccines',
            data: []
        }
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
    colors: ['#2ec4b6'],
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
    colors: ['#e71d36'],
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

// wait for all the DOM elements to be created, then load in the url
window.addEventListener('DOMContentLoaded', async function () {
    let vaccinesTimeline = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/sgp?lastdays=all&fullData=true");
    let historicalTimeline = await load("https://disease.sh/v3/covid-19/historical/sgp?lastdays=all");
    transformData(vaccinesTimeline, historicalTimeline);

    vaccinesChart.updateSeries([{
        data: vaccinesSeries
    }])

    deathsChart.updateSeries([{
        data: filteredDeathsSeries
    }])
})

let searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // clear existing data in global variables 
    vaccinesSeries = [];
    deathsSeries = [];
    vaccinesDates = [];
    filteredDeathsSeries = [];

    let userCountrySearch = document.querySelector('#search-country').value;
    let userDaysSearch = document.querySelector('#search-days').value;

    // store new api url based on user's country search
    let newVaccinesUrl = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${userCountrySearch}?lastdays=${userDaysSearch}&fullData=true`;
    let newDeathsUrl = `https://disease.sh/v3/covid-19/historical/${userCountrySearch}?lastdays=${userDaysSearch}`;

    // load new raw data based on user's country search
    let newVaccinesTimeline = await load(newVaccinesUrl);
    let newDeathsTimeline = await load(newDeathsUrl);

    //////////////////////////////////////////
    // how to handle erroreous user search????
    //////////////////////////////////////////

    transformData(newVaccinesTimeline, newDeathsTimeline);

    vaccinesChart.updateSeries([{
        data: vaccinesSeries
    }])

    deathsChart.updateSeries([{
        data: filteredDeathsSeries
    }])
})