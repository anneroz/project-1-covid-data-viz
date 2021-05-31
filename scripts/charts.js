//////////////////////// global variables ////////////////////////
let countries = [];
let country1 = countries[0];
let country2 = countries[1];
let country3 = countries[2];

let vaccinesSeries = [];
let deathsSeries = [];
let vaccinesDates = [];
let filteredDeathsSeries = [];

let vaccinesSeries2 = [];
let deathsSeries2 = [];
let vaccinesDates2 = [];
let filteredDeathsSeries2 = [];

let vaccinesSeries3 = [];
let deathsSeries3 = [];
let vaccinesDates3 = [];
let filteredDeathsSeries3 = [];
//////////////////////////////////////////////////////////////////

let vaccinesOptions = {
    noData: {
        text: 'Please wait...loading data.'
    },
    series: [
        {
            name: 'Country 1',
            data: []
        },
        {
            name: 'Country 2',
            data: []
        },
        {
            name: 'Country 3',
            data: []
        }
    ],
    chart: {
        id: 'line-vaccines',
        width: '100%',
        height: '100%',
        group: 'vaccinesVsDeaths',
        type: 'line',
        foreColor: '#fff',
        background: '#495057',
        fontFamily: 'Roboto Condensed, sans-serif'
    },
    dataLabels: {
        enabled: false
    },
    yaxis: [
        {
            labels: {
                minWidth: 10
            },
            title: {
                text: 'country 1'
            }
        },
        {
            labels: {
                minWidth: 10
            },
            title: {
                text: 'country 2'
            },
            opposite: true
        },
        {
            labels: {
                minWidth: 10
            },
            title: {
                text: 'country 3'
            },
            opposite: true
        }
    ],
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
            name: 'Country 1',
            data: [],
        },
        {
            name: 'Country 2',
            data: [],
        },
        {
            name: 'Country 3',
            data: [],
        }
    ],
    chart: {
        id: 'line-deaths',
        width: '100%',
        height: '100%',
        group: 'vaccinesVsDeaths',
        type: 'line',
        foreColor: '#fff',
        background: '#495057',
        fontFamily: 'Roboto Condensed, sans-serif'
    },
    dataLabels: {
        enabled: false
    },
    yaxis: [
        {
            labels: {
                minWidth: 10
            },
            title: {
                text: 'country 1'
            }
        },
        {
            labels: {
                minWidth: 10
            },
            title: {
                text: 'country 2'
            },
            opposite: true
        },
        {
            labels: {
                minWidth: 10
            },
            title: {
                text: 'country 3'
            },
            opposite: true
        }
    ],
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

    let vaccinesTimeline2 = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/malaysia?lastdays=all&fullData=true");
    let historicalTimeline2 = await load("https://disease.sh/v3/covid-19/historical/malaysia?lastdays=all");

    let vaccinesTimeline3 = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/indonesia?lastdays=all&fullData=true");
    let historicalTimeline3 = await load("https://disease.sh/v3/covid-19/historical/indonesia?lastdays=all");

    transformData(vaccinesTimeline, historicalTimeline);
    transformData2(vaccinesTimeline2, historicalTimeline2);
    transformData3(vaccinesTimeline3, historicalTimeline3);

    vaccinesChart.updateSeries([{ data: vaccinesSeries }, { data: vaccinesSeries2 }, { data: vaccinesSeries3 }]);
    deathsChart.updateSeries([{ data: filteredDeathsSeries }, { data: filteredDeathsSeries2 }, { data: filteredDeathsSeries3 }]);
});

let searchButton = document.querySelector('#btn-search');
searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // clear existing data
    vaccinesSeries = [];
    deathsSeries = [];
    vaccinesDates = [];
    filteredDeathsSeries = [];

    vaccinesSeries2 = [];
    deathsSeries2 = [];
    vaccinesDates2 = [];
    filteredDeathsSeries2 = [];

    vaccinesSeries3 = [];
    deathsSeries3 = [];
    vaccinesDates3 = [];
    filteredDeathsSeries3 = [];

    let userCountrySearch = document.querySelector('#select-country').value;
    let userCountrySearch2 = document.querySelector('#select-country2').value;
    let userCountrySearch3 = document.querySelector('#select-country3').value;
    let userDaysSearch = document.querySelector('#search-day').value;

    // store new api url based on user's country search
    let newVaccinesUrl = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${userCountrySearch}?lastdays=${userDaysSearch}&fullData=true`;
    let newDeathsUrl = `https://disease.sh/v3/covid-19/historical/${userCountrySearch}?lastdays=${userDaysSearch}`;

    let newVaccinesUrl2 = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${userCountrySearch2}?lastdays=${userDaysSearch}&fullData=true`;
    let newDeathsUrl2 = `https://disease.sh/v3/covid-19/historical/${userCountrySearch2}?lastdays=${userDaysSearch}`;

    let newVaccinesUrl3 = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${userCountrySearch3}?lastdays=${userDaysSearch}&fullData=true`;
    let newDeathsUrl3 = `https://disease.sh/v3/covid-19/historical/${userCountrySearch3}?lastdays=${userDaysSearch}`;

    // load new raw data based on user's country search
    let newVaccinesTimeline = await load(newVaccinesUrl);
    let newDeathsTimeline = await load(newDeathsUrl);

    let newVaccinesTimeline2 = await load(newVaccinesUrl2);
    let newDeathsTimeline2 = await load(newDeathsUrl2);

    let newVaccinesTimeline3 = await load(newVaccinesUrl3);
    let newDeathsTimeline3 = await load(newDeathsUrl3);

    transformData(newVaccinesTimeline, newDeathsTimeline);
    transformData2(newVaccinesTimeline2, newDeathsTimeline2);
    transformData3(newVaccinesTimeline3, newDeathsTimeline3);

    vaccinesChart.updateSeries([{data: vaccinesSeries}, {data: vaccinesSeries2}, {data: vaccinesSeries3}]);

    deathsChart.updateSeries([{data: filteredDeathsSeries}, {data: filteredDeathsSeries2}, {data: filteredDeathsSeries3}]);
})