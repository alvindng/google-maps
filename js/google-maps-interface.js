var Google = require('./../js/google-maps.js').googleModule;
var Weather = require('./../js/google-maps.js').weatherModule;

var breweryKey = require('./../.env').breweryKey;
var gmapsKey = require('./../.env').gmapsKey;
var weatherKey = require('./../.env').weatherKey;
var instagramIdKey = require('./../.env').instagramIdKey;
var instagramSecretKey = require('./../.env').instagramSecretKey;


$(document).ready(function() {
  var coord = [];

  $('#city').submit(function(event) {
    event.preventDefault();
    var location = $("#location").val();
    $('#location').val('');


    $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + gmapsKey).then(function(response) {
      var city = response.results[0].address_components[0].long_name;
      var lat = response.results[0].geometry.location.lat;
      var long = response.results[0].geometry.location.lng;
      var address = response.results[0].formatted_address;
      coord[0] = lat;
      coord[1] = long;
      console.log(response);
      console.log(coord);
    }).then(function(){
      $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + coord[0] + '&lon=' + coord[1] + '&appid=' + weatherKey).then(function(response) {
        console.log(response);
        var temp = new Weather(response.main.temp);
        $('#temperature').html("The humidity in " + location + " is " + response.main.humidity + "%.");
        $('#fahrenheit').html("The temperature in " + location + " is " + temp.fahrenheit + "&#x2109.");
        $('#celsius').html("The temperature in " + location + " is " + temp.celsius + "&#x2103.");
      }).then(function(response){
        $.get("http://api.brewerydb.com/v2/?key=" + breweryKey).then(function(response) {
          console.log(response);
        });
      }).fail(function(error) {
        $('#temperature').text(error.responseJSON.message);
      });
    });




    $("#map").html('<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key='+ gmapsKey +
    '&q='+location+ '"></iframe>');

  });

  $("#map").html('<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key='+ gmapsKey +
  '&q=epicodus"></iframe>');



});
