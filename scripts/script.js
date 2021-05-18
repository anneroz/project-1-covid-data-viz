// wait for all the DOM elements to be created, then load in the url
window.addEventListener('DOMContentLoaded', async function(){
    let rawData = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/sgp?lastdays=all&fullData=true");
    transformData(rawData);
})




// let datesArray = [];
// let vaccinesArray = [];
// let deathsArray = [];

// // read in historical data for Singapore
// async function loadData() {
//     let vaccineResponse = await axios.get("https://disease.sh/v3/covid-19/vaccine/coverage/countries/sgp?lastdays=all&fullData=true");
//     let deathsResponse = await axios.get("https://disease.sh/v3/covid-19/historical/sgp?lastdays=all");

//     let vaccineDays = vaccineResponse.data.timeline
//     let deathDays = deathsResponse.data.timeline.deaths

//     for (let day in vaccineDays) {
//         vaccinesArray.push(vaccineDays[day].total);
//         datesArray.push(vaccineDays[day].date);
//     }
//     for (let day in deathDays) {
//         deathsArray.push(deathDays[day]);
//     }
// }
// loadData();

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