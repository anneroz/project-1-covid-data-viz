// to read in url
async function load(url) {
    let response = await axios.get(url);
    return(response.data);
}

// to store transformed raw data
let vaccinesSeries = [];
let deathsSeries = [];

// to transform data to reflect 'x' and 'y' keys
function transformData(vaccineData, historicalData) {
    for (let i in vaccineData.timeline) {
        vaccinesSeries.push({
            'x': vaccineData.timeline[i].date,
            'y': vaccineData.timeline[i].total
        })
    };
    for (let i in historicalData.timeline.deaths) {
        deathsSeries.push({
            'x': i,
            'y': historicalData.timeline.deaths[i]
        })
    };
}

// wait for all the DOM elements to be created, then load in the url
window.addEventListener('DOMContentLoaded', async function(){
    let vaccinesTimeline = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/sgp?lastdays=all&fullData=true");
    let historicalTimeline = await load("https://disease.sh/v3/covid-19/historical/sgp?lastdays=all");
    transformData(vaccinesTimeline, historicalTimeline);
})

// // setup global options for charts
// window.Apex = {
//     chart: {
//         height: 160,
//     },
//     dataLabels: {
//         // turn off data labels
//         enabled: false
//     }
// }

// // setup options for vaccine chart
// let optionsVaccine = {
//     series: [{
//         name: 'Vaccines Administered',
//         data: vaccinesArray
//     }],
//     xaxis: {
//         categories: datesArray
//     },
//     colors: ['#008FFB'],
//     chart: {
//         id: 'vaccine-1',
//         group: 'vaccineVsDeath',
//         type: 'line',
//     },
//     yaxis: {
//         labels: {
//             minWidth: 100
//         }
//     }
// };

// let vaccineChart = new ApexCharts(document.querySelector("#chart-vaccines"), optionsVaccine)
// vaccineChart.render()

// // setup options for death chart
// let optionsDeath = {
//     series: [{
//         name: 'Total Deaths',
//         data: deathsArray
//     }],
//     xaxis: {
//         categories: datesArray
//     },
//     colors: ['#546E7A'],
//     chart: {
//         id: 'death-1',
//         group: 'vaccineVsDeath',
//         type: 'line',
//     },
//     yaxis: {
//         labels: {
//             minWidth: 100
//         }
//     }
// };

// let deathChart = new ApexCharts(document.querySelector('#chart-deaths'), optionsDeath)
// deathChart.render()