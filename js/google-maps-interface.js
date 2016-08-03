var Google = require('./../js/google-maps.js').googleModule;
var gmapsKey = require('./../.env').gmapsKey;
var weatherKey = require('./../.env').weatherKey;
$(document).ready(function() {

  $('#city').submit(function(event) {
    event.preventDefault();
    var location = $("#location").val();
    $('#location').empty();
    // $.get('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + weatherKey).then(function(response) {
    //   $('#temperature').text("The humidity in " + location + " is " + response.main.humidity + "%.");
    // }).fail(function(error) {
    //   $('#temperature').text(error.responseJSON.message);
    // });
    $("#map").html('<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key='+ gmapsKey +
    '&q='+location+ '"></iframe>');
  });

  // var map;

  // function initMap() {
  //   map = new google.maps.Map($("#map"), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 8
  //   });
  // }
  //
  // $.get('https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap')
  // .then(function() {
  //   $('#map').html('<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key='+ apiKey +
  //   '&q="></iframe>');
  // }).fail(function(error) {
  //   $('#map').text(error.responseJSON.message);
  // });

});
