
let allData = [];
let dataByReseller = [];
let dataByDay = [];



let barChartData = [];
let barChartLabels = [];

let averageLineChartLabels = []
let averageLineChartData = []

let stockxLineChartLabels = []
let stockxLineChartData = []

let goatLineChartLabels = []
let goatLineChartData = []

let stadiumLineChartLabels = []
let stadiumLineChartData = []

let flightineChartLabels = []
let flightLineChartData = []

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = ['2020', '2021'];
let seenDates = []


function getAllData(){
    // select each data section
    let dataParagraphs = document.querySelectorAll(".data");
    for (let i =0; i < dataParagraphs.length; i++){
        // select the data point (the sentence)
        let data = dataParagraphs[i].textContent;
        // turn sentence into a list of words
        let dataList = data.split(" ");
        // set the prices
        let retail = parseInt(dataList[2]);
        let stockx = parseInt(dataList[3]);
        let goat = parseInt(dataList[4]);
        let stadium = parseInt(dataList[5]);
        let flight = parseInt(dataList[6]);
        // get the average of the prices (not including retail price)
        let avg = (stockx+goat+stadium+flight)/4


        // get the date 
        let year = 0;
        let month = 0;
        let day = dataList[9];

        for (let j = 0; j < MONTHS.length; j++){
            if (dataList[8] === MONTHS[j]){
                month = j+1;
                if (dataList[10] === YEARS[0]){
                    year = YEARS[0];
                }else{
                    year = YEARS[1];
                }
    
            }
        }

        let num = 0;
        let date = month + "/" + day + "/" + year

        // check if we have a duplicate date
        if (seenDates.includes(date)){
            num +=1;
        }else{
        // add a never seen date
        seenDates.push(date);
        // add dictionary of data to list
        allData.push({
            "releaseDate": dataList[1],
            "retail": retail,
            "stockx": stockx,
            "goat": goat,
            "stadium": stadium,
            "flight": flight,
            "date": date,
            "average": avg,
        })
        }



    }

    return 0;
}


function getDataByReSeller(){

    for (let i = 0; i < allData.length;i++){

        var totalStockxPrice = 0;
                
        var totalGoatPrice = 0;

        var totalStadiumPrice = 0;

        var totalFlightPrice = 0;

        var totalAveragePrice = 0;
        
        totalStockxPrice = allData[i].stockx;
        
        totalGoatPrice = allData[i].goat;

        totalStadiumPrice = allData[i].stadium;

        totalFlightPrice = allData[i].flight;

        totalAveragePrice = allData[i].average;
    }


    dataByReseller.push({
        "id": 0,
        "place": "retail",
        "price": allData[0].retail,
    })

    dataByReseller.push({
        "id": 1,
        "place": "stockx",
        "price": totalStockxPrice

    })


    dataByReseller.push({
        "id": 2,
        "place": "goat",
        "price": totalGoatPrice
    })


    dataByReseller.push({
        "id": 3,
        "place": "stadium",
        "price": totalStadiumPrice
    })

    dataByReseller.push({
        "id": 4,
        "place": "flight",
        "price": totalFlightPrice
    })


    dataByReseller.push({
        "id": 5,
        "place": "average",
        "price": totalAveragePrice
    })


        return 0;

}


function drawBarChart(){
    var ctx = document.getElementById('barChart');
    ctx.height = 400;
    ctx.width = 400;
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: barChartLabels,
            datasets: [{
                label: 'price in US dollars',
                data: barChartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 192, 203, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 192, 203, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            // maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return 0;
}


function drwaLineChart(){
    var linectx = document.getElementById('lineChart');
    linectx.height = 400;
    linectx.width = 400;
    var stackedLine = new Chart(linectx, {
        type: 'line',
        data: {
            labels: averageLineChartLabels,
            datasets: [{
                label: 'Average',
                fill: false,
                data: averageLineChartData,
                backgroundColor: 'rgba(255, 192, 203)',
                borderColor: 'rgba(255, 192, 203)',
                borderWidth: 1
            },
            {
                label: 'StockX',
                fill: false,
                data: stockxLineChartData,
                backgroundColor:'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 1
            },
            {
                label: 'Goat',
                fill: false,
                data: goatLineChartData,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Stadium Goods',
                fill: false,
                data: stadiumLineChartData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            },
            {
                label: 'FlightCLub',
                fill: false,
                data: flightLineChartData,
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
        ]
        },
        options: {
            responsive: false,
            // maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return 0;
}


function getLabelsAndData(){
    // create labeles for barchart
    barChartLabels.push("retail");
    barChartLabels.push("goat");
    barChartLabels.push("stockx");
    barChartLabels.push("stadium");
    barChartLabels.push("flight");
    barChartLabels.push("average");

    // get barchartData
    for (let i = 0; i < dataByReseller.length; i++){
        barChartData.push(dataByReseller[i].price);
    }

    // get linechartData
    for (let i = 0; i < allData.length; i++){
        averageLineChartLabels.push(allData[i].date);
        averageLineChartData.push(allData[i].average);

        stockxLineChartLabels.push(allData[i].date);
        stockxLineChartData.push(allData[i].stockx);

        goatLineChartLabels.push(allData[i].date);
        goatLineChartData.push(allData[i].goat);

        stadiumLineChartLabels.push(allData[i].date);
        stadiumLineChartData.push(allData[i].stadium);

        flightineChartLabels.push(allData[i].date);
        flightLineChartData.push(allData[i].flight);
    }

}

getAllData();
getDataByReSeller();
getLabelsAndData();
drawBarChart();
drwaLineChart();
