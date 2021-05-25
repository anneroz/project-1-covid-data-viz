//////////////////////
// global variables //
//////////////////////

let vaccinesBaseUrl = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${userCountrySearch}?lastdays=${userDaysSearch}&fullData=true`;
let historicalBaseUrl = `https://disease.sh/v3/covid-19/historical/${userCountrySearch}?lastdays=${userDaysSearch}`;

// to store transformed raw data
let vaccinesSeries = [];
let deathsSeries = [];

// base urls
let vaccinesBaseUrl = 

// to read in url
async function load(url) {
    let response = await axios.get(url);
    return (response.data);
}

// to transform data to reflect 'x' and 'y' keys
function transformData(vaccineData, historicalData) {

    for (let i in vaccineData.timeline) {
        vaccinesSeries.push({
            'x': vaccineData.timeline[i].date,
            'y': vaccineData.timeline[i].total
        })
    }

    // vaccines series starts on 1 Dec 2020, deaths series starts on 22 Jan 2020
    for (let i in historicalData.timeline.deaths) {
        let chunk = i.split('/')
        if (chunk[2] > 20 || chunk[2] == 20 && chunk[0] == 12) {
            deathsSeries.push({
                'x': i,
                'y': historicalData.timeline.deaths[i]
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
        id: 'line-vaccines',
        group: 'vaccinesVsDeaths',
        type: 'line',
        height: '50%'
    },
    colors: ['#008FFB'],
    yaxis: {
        labels: {
            minWidth: 40
        }
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
        id: 'line-deaths',
        group: 'vaccinesVsDeaths',
        type: 'line',
        height: '50%'
    },
    colors: ['#546E7A'],
    yaxis: {
        labels: {
            minWidth: 40
        }
    }
};

let deathsChart = new ApexCharts(document.querySelector("#chart-deaths"), deathsOptions);
deathsChart.render();

// wait for all the DOM elements to be created, then load in the url
window.addEventListener('DOMContentLoaded', async function () {
    let vaccinesTimeline = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/global?lastdays=all&fullData=true");
    let historicalTimeline = await load("https://disease.sh/v3/covid-19/historical/global?lastdays=all");
    transformData(vaccinesTimeline, historicalTimeline);

    // console.log(vaccinesSeries);
    // console.log(deathsSeries);

    vaccinesChart.updateSeries([{
        data: vaccinesSeries
    }])

    deathsChart.updateSeries([{
        data: deathsSeries
    }])
})

let searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // clear existing data in both vaccines and deaths series 
    vaccinesSeries = [];
    deathsSeries = [];

    let userCountrySearch = document.querySelector('#search-country').value;

    // store new api url based on user's country search
    let newVaccinesUrl = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${userCountrySearch}?lastdays=all&fullData=true`;
    let newDeathsUrl = `https://disease.sh/v3/covid-19/historical/${userCountrySearch}?lastdays=all`;

    // load new raw data based on user's country search
    let newVaccinesTimeline = await load(newVaccinesUrl);
    let newDeathsTimeline = await load(newDeathsUrl);
    
    //////////////////////////////////////////
    // how to handle erroreous user search????
    //////////////////////////////////////////


    transformData(newVaccinesTimeline, newDeathsTimeline);
    // console.log(vaccinesSeries);
    // console.log(deathsSeries);

    vaccinesChart.updateSeries([{
        data: vaccinesSeries
    }])

    deathsChart.updateSeries([{
        data: deathsSeries
    }])
})