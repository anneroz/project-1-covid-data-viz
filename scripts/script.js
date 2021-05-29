

// to read in url
async function load(url) {
    let response = await axios.get(url);
    return (response.data);
}

// to transform data to reflect 'x' and 'y' keys
function transformData(vaccineData, historicalData) {
    for (let eachProp in vaccineData.timeline) {
        // remove all cases with 0 vaccinations
        if (vaccineData.timeline[eachProp].total !== 0) {
            vaccinesSeries.push({
                'x': vaccineData.timeline[eachProp].date,
                'y': vaccineData.timeline[eachProp].total
            })
        }
    }

    for (let eachProp in historicalData.timeline.deaths) {
        deathsSeries.push({
            'x': eachProp,
            'y': historicalData.timeline.deaths[eachProp]
        })
    }

    // vaccines raw data dates starts on 1 Dec 2020, deaths raw date dates starts on 22 Jan 2020
    for (let eachIndex of vaccinesSeries) {
        vaccinesDates.push(eachIndex.x);
    }

    for (let eachIndex of deathsSeries) {
        if (vaccinesDates.includes(eachIndex.x)) {
            filteredDeathsSeries.push({
                'x': eachIndex.x,
                'y': eachIndex.y
            })
        }
    }
}

function transformData2(vaccineData, historicalData) {
    for (let eachProp in vaccineData.timeline) {
        // remove all cases with 0 vaccinations
        if (vaccineData.timeline[eachProp].total !== 0) {
            vaccinesSeries2.push({
                'x': vaccineData.timeline[eachProp].date,
                'y': vaccineData.timeline[eachProp].total
            })
        }
    }

    for (let eachProp in historicalData.timeline.deaths) {
        deathsSeries2.push({
            'x': eachProp,
            'y': historicalData.timeline.deaths[eachProp]
        })
    }

    // vaccines raw data dates starts on 1 Dec 2020, deaths raw date dates starts on 22 Jan 2020
    for (let eachIndex of vaccinesSeries2) {
        vaccinesDates2.push(eachIndex.x);
    }

    for (let eachIndex of deathsSeries2) {
        if (vaccinesDates2.includes(eachIndex.x)) {
            filteredDeathsSeries2.push({
                'x': eachIndex.x,
                'y': eachIndex.y
            })
        }
    }
}

