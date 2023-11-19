var estimatedCostDiv = document.getElementById("estimatedCost");
var serviceType = document.getElementById("mmoney");
var redBackground = document.getElementById("ccheckbox");

var cost = 0;

serviceType.addEventListener("click", function(){
    calculateCost();
});

redBackground.addEventListener("click", function(){
    calculateCost();
});

function calculateCost() {

    if(serviceType.value == "W3 Schools Link") {
        cost = 2;
    } 
    else if(serviceType.value == "No Styling") {
        cost = 1000;
    }
    else if(serviceType.value == "Full Access") {
        cost = 1000000
    }

    if(redBackground.checked) {
        cost *= .5;
    }

    estimatedCostDiv.innerHTML = "$" + cost;
}