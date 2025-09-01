function hotelCost() {
    let numberNight = prompt("How many nights would you like to stay in the hotel?");
    while (isNaN(numberNight) || numberNight <= 0 || numberNight.trim() === "") {
        numberNight = prompt("Please enter a valid number of nights:");
    }

    let cost = numberNight * 140;
    return cost;
}

function planeRideCost() {
    let destination = prompt("What is your destination?");
    while (!isNaN(destination) || destination.trim() === "") {
        destination = prompt("Please enter a valid destination:");
    }
    let cost;

    switch (destination) {
        case "London":
            cost = 183;
            break;
        case "Paris":
            cost = 220;
            break;
        default:
            cost = 300;
    }
    return cost;
}

function rentalCarCost(){
    let days = prompt("How many days will you rent the car?");
    while (isNaN(days) || days <= 0 || days.trim() === "") {
        days = prompt("Please enter a valid number of days:");
    }

    let cost = days * 40;
    if (days > 10) {
        cost *= 0.95;  // Apply 5% discount
    }
    return cost;
}


function totalVacationCost() {
    return "The car cost:" + rentalCarCost() + ", hotel cost:" + hotelCost() + ", plane ride cost:" + planeRideCost();
}

console.log(totalVacationCost());
