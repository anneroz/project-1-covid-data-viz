// read in SG 7 day history

let sgpDate = [];
let sgpCases = [];

async function loadSgpData() {
    let response = await axios.get("https://disease.sh/v3/covid-19/historical/sgp?lastdays=7");
    sgpDate.push(Object.keys(response.data.timeline.cases));
    sgpCases.push(response.data.timeline.cases);
    console.log(sgpDate, sgpCases);
}

loadSgpData();