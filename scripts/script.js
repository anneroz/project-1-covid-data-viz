const options = {
    "chart": {
        "type": "line",
        "height": "100%"
    },
    "series": [{
        "name": "cases",
        "data": sgpCases
    }],
    "xaxis": {
        "categories": sgpDate
    },
    // to show when no data
    "noData": {
        "text": "Please wait, loading data..."
    }
}

const chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();