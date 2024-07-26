function convert() {
    var input = parseFloat(document.getElementById('unitInput').value);
    var type = document.getElementById('conversionType').value;
    var result = "";

    if (type === "kgToPounds") {
      result = input * 2.20462 + " lbs";
    } else if (type === "poundsToKg") {
      result = input / 2.20462 + " kg";
    }

    document.getElementById('kglbsresult').innerText = result;
}

function convert1() {
    var input = parseFloat(document.getElementById('mileskm').value);
    var type = document.getElementById('kmmiles').value;
    var result = "";

    if (type === "kmToMiles") {
      result = input * 0.621371 + " miles";
    } else if (type === "milesToKm") {
      result = input / 0.621371 + " km";
    }

    document.getElementById('kmmiresult').innerText = result;
}

function convert2(){
    var input = parseFloat(document.getElementById('fhCl').value);
    var type = document.getElementById('facl').value;
    var result = "";

    if (type === "face") {
        result = (input - 32) * (5/9) + " Celsius";
    } else if (type === "cefl") {
        result = (input * (9/5)) + 32 + " Fahrenheit";
    }

    document.getElementById('fhClresult').innerText = result;

}

