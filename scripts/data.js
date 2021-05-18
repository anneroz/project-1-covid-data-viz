// function to read in url
async function load(url) {
    let response = await axios.get(url);
    return response.data.timeline;
}

// function to transform data to reflect 'x' and 'y' keys
function transformData(rawData) {
    let mapped = [];
    for (let datnum of rawData) {
        mapped.push({
            'x': datnum.date,
            'y': datnum.total
        })
    }
    console.log(mapped)
}