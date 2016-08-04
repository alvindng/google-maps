var gmapsKey = require('./../.env').gmapsKey;
var weatherKey = require('./../.env').weatherKey;
var twitterKey = require('./../.env').twitterKey;
var oauthId = require('./../.env').oauthId;


OAuth.initialize(oauthId);

var coord = [];

function Google() {
}

function Weather(kelvin) {
  this.celsius = (kelvin - 273.15).toFixed(2);
  this.fahrenheit = ((kelvin * (9/5)) - 459.67).toFixed(2);
}

Google.prototype.getTweetsbyLocation = function(location, displayTweets) {
  OAuth.popup('twitter', {cache: true}).done(function(oauthResult) {
    oauthResult.get('https://api.twitter.com/1.1/search/tweets.json?q=%23' + location + '&result_type=popular').done(function(data) {
      var tweetsByLocation = [];
      var tweetsByStatusId = [];
      var tweetName = [];
      for(i = 0; i< data.statuses.length; i++) {
        tweetsByLocation.push(data.statuses[i].text);
        tweetsByStatusId.push(data.statuses[i].id_str);
        tweetName.push(data.statuses[i].user.screen_name);
      }
      console.log(tweetName);
      console.log(tweetsByStatusId);
      // displayTweetsbyLocation(location, tweetsByLocation);
      displayTweets(location, tweetsByStatusId, tweetName);
      console.log(data);
    }).fail(function(err) {
      console.log("that didn't work");
    });
  });
};

Google.prototype.getDefault = function(displayDefault) {
    displayDefault(gmapsKey);
};

Google.prototype.getSearch = function(location, displaySearch) {
  displaySearch(gmapsKey, location);
};

Google.prototype.getWeather = function(location, displayWeather) {
  $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + gmapsKey).then(function(response) {
    var city = response.results[0].address_components[0].long_name;
    var lat = response.results[0].geometry.location.lat;
    var long = response.results[0].geometry.location.lng;
    var address = response.results[0].formatted_address;
    coord[0] = lat;
    coord[1] = long;
    console.log(response);
  }).then(function(){
    $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + coord[0] + '&lon=' + coord[1] + '&appid=' + weatherKey).then(function(response) {
      console.log(response);
      var weatherData = [];
      var temp = new Weather(response.main.temp);
      weatherData[0] = response.main.humidity;
      weatherData[1] = temp.fahrenheit;
      weatherData[2] = temp.celsius;
      displayWeather(location, weatherData);
    }).fail(function(error) {
      $('#temperature').text(error.responseJSON.message);
    });
  });
};

exports.googleModule = Google;
exports.weatherModule = Weather;
