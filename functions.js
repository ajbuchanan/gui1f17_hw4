/*
Alexander Buchanan
ID: 01408299
email: alexander_buchanan@student.uml.edu.
gitHub link: https://github.com/ajbuchanan/gui1f17_hw4
*/

// global vars I want access to through out
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

    if(tableMatrix == FAIL_STRING){
        return;
    }
    
    displayTable(tableMatrix);
    hideForm();
}

//Following set of functions are all about taking in the input and parsing it to be usable
function readPrices(){
    try{
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
    catch(err){
        window.alert("readPrices: "+err.message);
    }
}

function readMpg(){
    try{
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
    catch(err){
        window.alert("readMpg: "+err.message);
    }
}

function readMiles(){
    try{
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
    catch(err){
        window.alert("readMiles: "+err.message);
    }
}

function readYears(){
    try{
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
    catch(err){
        window.alert("readYears: "+err.message);
    }
}

function readGasPrice(){
    try{
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
    catch(err){
        window.alert("readGasPrice: "+err.message);
    }
}

//Main function that computes display information
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

    try{
        var tableMatrix = new Array(numPrices);
        for(i = 0; i < numMPG; i++){
            tableMatrix[i] = [];
        }

        prices.push("Comparison");
        tableMatrix.push(prices);

        var milesPerMonth = miles / 12;

        for(x = 1; x <= numPrices; x++){
            var price = prices[x];
            for(y = 1; y <= numMPG; y++){
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
    catch(err){
        window.alert("calcTable: "+err.message);
    }
}

//Function to display the table
function displayTable(tableMatrix){
    try{
        for(x = 0; x <= numPrices; x++){
            for(y = 0; y <= numMPG; y++){
                var cellID = "r" + x + "c" + y;
                document.getElementById(cellID).innerHTML = tableMatrix[x][y];
            }
        }
        document.getElementById("table_div").style.display = "block";
        clearUnusedCells();
    }
    catch(err){
        window.alert("displayTable: numPrices:"+numPrices+" numMPG:"+numMPG+" error: "+err.message);
    }
}

//Makes sure that the parts of the table we dont care about arent shown
function clearUnusedCells(){
    try{
        for(x = (numMPG + 1); x <= 11; x ++){
            var rowID = "row" + x;
            document.getElementById(rowID).style.display = "none";
        }

        for(y = (numPrices + 1); y <= 11; y++){
            var columnClass = "column" + y;
            var columnCells = document.getElementsByClassName(columnClass);

            for(column in columnCells){
                column.style.display = "block";
            }
        }
    }
    catch(err){
        window.alert("clearUnusedCells: "+err.message);
    }
}

function hideForm(){
    document.getElementById("form_div").style.display = "none";
}