// to read in APIs
async function load(url) {
    let response = await axios.get(url);
    return (response.data);
}

// transform vaccine cases raw data
function transformData(rawData) {
    console.log(rawData.timeline);
    let mapped = rawData.timeline.map ( (datnum) => {
        return {
            'date': new Date(datnum.date),
            'vaccines': datnum.total
        }
    })
    console.log(mapped);

    // remove 0 cases
    let filtered = mapped.filter( (datnum) => {
        return datnum.vaccines !== 0;
    })
    console.log(filtered);
}

window.addEventListener('DOMContentLoaded', async function () {
    let historicalTimeline = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/usa?lastdays=all&fullData=true");
    transformData(historicalTimeline);

    // console.log(vaccinesSeries);
    // console.log(deathsSeries);

})













////////////////////////////////////////////////////////////////////////////////////////////
// // to store transformed raw data
// var vaccinesSeries = [];
// var deathsSeries = [];

// // to transform data to reflect 'x' and 'y' keys
// function transformData(vaccineData, historicalData) {
//     for (let i in vaccineData.timeline) {
//         vaccinesSeries.push({
//             'x': vaccineData.timeline[i].date,
//             'y': vaccineData.timeline[i].total
//         })
//     }
//     // vaccines series starts on 1 Dec 2020, deaths series starts on 22 Jan 2020
//     for (let i in historicalData.timeline.deaths) {
//         let chunk = i.split('/')
//         if (chunk[2] > 20 || chunk[2] == 20 && chunk[0] == 12) {
//             deathsSeries.push({
//                 'x': i,
//                 'y': historicalData.timeline.deaths[i]
//             })
//         }
//     }
// }

// // wait for all the DOM elements to be created, then load in the url
// window.addEventListener('DOMContentLoaded', async function () {
//     let vaccinesTimeline = await load("https://disease.sh/v3/covid-19/vaccine/coverage/countries/usa?lastdays=all&fullData=true");
//     let historicalTimeline = await load("https://disease.sh/v3/covid-19/historical/usa?lastdays=all");
//     transformData(vaccinesTimeline, historicalTimeline);

//     // console.log(vaccinesSeries);
//     // console.log(deathsSeries);

//     vaccinesChart.updateSeries([{
//         name: 'Vaccines Administered',
//         data: vaccinesSeries
//     }])

//     deathsChart.updateSeries([{
//         name: 'Total Deaths',
//         data: deathsSeries
//     }])
// })
////////////////////////////////////////////////////////////////////////////////////////////