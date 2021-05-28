//////////////////////// global variables ////////////////////////
let vaccinesSeries = [];
let vaccinesSeries2 = [];
let deathsSeries = [];
let deathsSeries2 = [];
let vaccinesDates = [];
let vaccinesDates2 = [];
let filteredDeathsSeries = [];
let filteredDeathsSeries2 = [];
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

function transformData2(vaccineData, historicalData) {
    for (let i in vaccineData.timeline) {
        // remove all cases with 0 vaccinations
        if (vaccineData.timeline[i].total !== 0) {
            vaccinesSeries2.push({
                'x': vaccineData.timeline[i].date,
                'y': vaccineData.timeline[i].total
            })
        }
    }

    for (let i in historicalData.timeline.deaths) {
        deathsSeries2.push({
            'x': i,
            'y': historicalData.timeline.deaths[i]
        })
    }

    // vaccines raw data dates starts on 1 Dec 2020, deaths raw date dates starts on 22 Jan 2020
    for (let datnum of vaccinesSeries2) {
        vaccinesDates2.push(datnum.x);
    }

    for (let datnum of deathsSeries2) {
        if (vaccinesDates2.includes(datnum.x)) {
            filteredDeathsSeries2.push({
                'x': datnum.x,
                'y': datnum.y
            })
        }
    }
}

// wait for all the DOM elements to be created, then load in the url
window.addEventListener('DOMContentLoaded', async function () {
    let vaccinesTimeline = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/china?lastdays=all&fullData=true");
    let vaccinesTimeline2 = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/sgp?lastdays=all&fullData=true");
    let historicalTimeline = await load("https://disease.sh/v3/covid-19/historical/china?lastdays=all");
    let historicalTimeline2 = await load("https://disease.sh/v3/covid-19/historical/sgp?lastdays=all");

    transformData(vaccinesTimeline, historicalTimeline);

    vaccinesChart.updateSeries([{data: vaccinesSeries}]);
    deathsChart.updateSeries([{data: filteredDeathsSeries}]);

    transformData2(vaccinesTimeline2, historicalTimeline2);

    vaccinesChart2.updateSeries([{data: vaccinesSeries2}]);
    deathsChart2.updateSeries([{data: filteredDeathsSeries2}]);
});

let searchButton = document.querySelector('#btn-search');
searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // clear existing data in global variables 
    vaccinesSeries = [];
    deathsSeries = [];
    vaccinesDates = [];
    filteredDeathsSeries = [];

    let userCountrySearch = document.querySelector('.form-select').value;
    let userDaysSearch = document.querySelector('.form-control').value;

    // store new api url based on user's country search
    let newVaccinesUrl = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${userCountrySearch}?lastdays=${userDaysSearch}&fullData=true`;
    let newDeathsUrl = `https://disease.sh/v3/covid-19/historical/${userCountrySearch}?lastdays=${userDaysSearch}`;

    // load new raw data based on user's country search
    let newVaccinesTimeline = await load(newVaccinesUrl);
    let newDeathsTimeline = await load(newDeathsUrl);

    transformData(newVaccinesTimeline, newDeathsTimeline);

    vaccinesChart.updateSeries([{
        data: vaccinesSeries
    }])

    deathsChart.updateSeries([{
        data: filteredDeathsSeries
    }])
})