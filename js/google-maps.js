var gmapsKey = require('./../.env').gmapsKey;
var weatherKey = require('./../.env').weatherKey;

function Google() {

}

function Weather(kelvin) {
  this.celsius = (kelvin - 273.15).toFixed(2);
  this.fahrenheit = ((kelvin * (9/5)) - 459.67).toFixed(2);
}

exports.googleModule = Google;
exports.weatherModule = Weather;
