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