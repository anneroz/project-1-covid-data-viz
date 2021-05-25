//////////////////////
// global variables //
//////////////////////

// to store transformed raw data
let vaccinesSeries = [];
let deathsSeries = [];

////////////////////////////////////////////////////////////////////////////////////////

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
    console.log(vaccinesSeries);

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
    let vaccinesTimeline = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/sgp?lastdays=all&fullData=true");
    let historicalTimeline = await load("https://disease.sh/v3/covid-19/historical/sgp?lastdays=all");
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
    let userDaysSearch = document.querySelector('#search-days').value;

    // store new api url based on user's country search
    let newVaccinesUrl = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${userCountrySearch}?lastdays=${userDaysSearch}&fullData=true`;
    let newDeathsUrl = `https://disease.sh/v3/covid-19/historical/${userCountrySearch}?lastdays=${userDaysSearch}`;

    // load new raw data based on user's country search
    let newVaccinesTimeline = await load(newVaccinesUrl);
    let newDeathsTimeline = await load(newDeathsUrl);

    console.log(newVaccinesTimeline);
    console.log(newDeathsTimeline);
    
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