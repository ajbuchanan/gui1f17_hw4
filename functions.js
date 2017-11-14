var PRICE_INPUT = "input_price";
var MPG_INPUT = "input_mpg";
var YEAR_INPUT = "input_years";
var MILES_INPUT = "input_miles";
var GAS_INPUT = "input_gas";
var FAIL_STRING = "fail";

var numPrices = 0;  //x val
var numMPG = 0;     //y val

function doEverything(){
    var prices = readPrices();
    var mpgs = readMpg();
    var years = readYears();
    var miles = readMiles();
    var gasprice = readGasPrice();

    var tableMatrix = calcTable(prices, mpgs, years, miles, gasprice);
    
    displayTable(tableMatrix);
}

function readPrices(){
    var priceArray = new Array();
    for(i = 1; i < 11; i++){
        var input = document.getElementById(PRICE_INPUT+i);
        if(input && input.value){
            var price = parseFloat(input.value);
            if(!isNaN(price)){
                priceArray.push(price);
                numPrices++;
            }
            else{
                window.alert("Price "+ i +" is invalid");
                return FAIL_STRING;
            }
        }
    }
    return priceArray;
}

function readMpg(){
    var mpgArray = new Array();
    for(i = 1; i < 11; i++){
        var input = document.getElementById(MPG_INPUT+i);
        if(input && input.value){
            var mpg = parseFloat(input.value);
            if(!isNaN(mpg)){
                mpgArray.push(mpg);
                numMPG++;
            }
            else{
                window.alert("MPG "+ i +" is invalid");
                return FAIL_STRING;
            }
        }
    }
    return mpgArray;
}

function readMiles(){
    var input = document.getElementById(MILES_INPUT);
    var miles = 0;
    if(input && input.value){
        miles = parseFloat(input.value);
        if(!isNaN(miles)){
            return miles;
        }
        else{
            window.alert("Miles per year is invalid");
            return FAIL_STRING;
        }
    }
}

function readYears(){
    var input = document.getElementById(YEAR_INPUT);
    var years = 0;
    if(input && input.value){
        years = parseFloat(input.value);
        if(!isNaN(years)){
            return years;
        }
        else{
            window.alert("Number of years is invalid");
            return FAIL_STRING;
        }
    }
}

function readGasPrice(){
    var input = document.getElementById(GAS_INPUT);
    var gas = 0;
    if(input && input.value){
        gas = parseFloat(input.value);
        if(!isNaN(gas)){
            return gas;
        }
        else{
            window.alert("Gas Price is invalid");
            return FAIL_STRING;
        }
    }
}

function calcTable(prices, mpgs, years, miles, gasprice){
    if(prices == FAIL_STRING){
        return FAIL_STRING
    }
    if(mpgs == FAIL_STRING){
        return FAIL_STRING
    }
    if(years == FAIL_STRING){
        return FAIL_STRING
    }
    if(miles == FAIL_STRING){
        return FAIL_STRING
    }
    if(gasprice == FAIL_STRING){
        return FAIL_STRING
    }

    var tableMatrix = new Array(numPrices);
    for(i = 0; i < numMPG; i++){
        tableMatrix.push(new Array(numMPG + 1));
    }

    prices.push("Comparison");
    tableMatrix.push(prices);

    var milesPerMonth = miles / 12;

    for(x = 1; x < numPrices; x++){
        var price = prices[x];
        for(y = 1; y < numMPG; y++){
            var mpg = mpgs[y];
            tableMatrix[x][0] = mpg;

            var gasCostPerMonth = (milesPerMonth / mpg) * gasprice;
            var carPaymentPerMonth = price / (years * 12);
            var pricePerMonth = gasCostPerMonth + carPaymentPerMonth;
            var pricePerMile = pricePerMonth / milesPerMonth;
            var cellString = "$/mile:" + pricePerMile + ", $/month:" + pricePerMonth;

            tableMatrix[x][y] = cellString;
        }
    }

    return tableMatrix;
}

function displayTable(tableMatrix){
    if(tableMatrix == FAIL_STRING){
        return;
    }

    for(x = 0; x <= numPrices; x++){
        for(y = 0; y <= numPrices; y++){
            
        }
    }
}