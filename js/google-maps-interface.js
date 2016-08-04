var Google = require('./../js/google-maps.js').googleModule;
var Weather = require('./../js/google-maps.js').weatherModule;
var oauthId = require('./../.env').oauthId;

OAuth.initialize(oauthId);

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

// var displayTweetsbyLocation = function(location, tweetsByLocation)
// {
//   $("#tweets").empty();
//   for (i=0; i < tweetsByLocation.length; i++){
//     $("#tweets").prepend("<li>" + tweetsByLocation[i] + "</li>");
//   }
// };

var displayTweets = function(location, tweetStatusId, tweetName) {
  $("#tweets").empty();
   for (i=0; i < tweetStatusId.length; i++){
     $("#tweets").prepend("<li><iframe border=0 frameborder=0 height=250 width=550 src='http://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2F" + tweetName[i] + '%2Fstatus%2F' + tweetStatusId[i]  + "'" + "></iframe></li>");
   }
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
    // newGoogle.getTweetsbyLocation(location, displayTweetsbyLocation);
    newGoogle.getTweetsbyLocation(location, displayTweets);

  });
});
