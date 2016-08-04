var Google = require('./../js/google-maps.js').googleModule;
var Weather = require('./../js/google-maps.js').weatherModule;



var displayWeather = function(location, weatherData) {
  $('#temperature').html("The humidity in " + location + " is " + weatherData[0] + "%.");
  $('#fahrenheit').html("The temperature in " + location + " is " + weatherData[1] + "&#x2109.");
  $('#celsius').html("The temperature in " + location + " is " + weatherData[2] + "&#x2103.");
};

var displayDefault = function(gmapsKey) {
  $("#map").html('<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key='+ gmapsKey +
  '&q=epicodus"></iframe>');
};

var displaySearch = function(gmapsKey, location) {
  $("#map").html('<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key='+ gmapsKey +
  '&q=' + location + '"></iframe>');

};

$(document).ready(function() {
  var coord = [];
  var newGoogle = new Google();
  newGoogle.getDefault(displayDefault);

  $('#city').submit(function(event) {
    event.preventDefault();
    var location = $("#location").val();
    $('#location').val('');

    newGoogle.getWeather(location, displayWeather);
    newGoogle.getSearch(location, displaySearch);


  });




});
