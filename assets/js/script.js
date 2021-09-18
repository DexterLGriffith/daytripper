// THIS IS THE FUNCTION TO MAKE THE SIDEBAR COLLAPSABLE
(function ($) {
  $(function () {

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

// get sidenav buttons in header to lead to correct places //



// funcation variables //



//  start of moment function to get today's current date //



// function to get openweatherAPI working for select zipcode //


// add eventlistener attached to search bar to make search bar fetch for the zipcode? //

// function of what you should pack //



// if loop for different weather conditions (rain, sun, snow, etc.) for select zipcode //


// function of different places to go see using the googlemaps or openstreepmaps apis for given zipcode //


// yelp review api with review stars for places //



// TODO: Create the function that grabs the google maps data
function initMap() {
  console.log("Google Maps has been initialized");
  var googleMapkey = "AIzaSyDmtQ1hzQJFdnivcj0RLybUddmhldyarz8";
  var mapqueryURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmtQ1hzQJFdnivcj0RLybUddmhldyarz8&callback=initMap"

  map = new google.maps.Map(document.getElementById('Map'), {
    center: {
      lat: 32.7798,
      lng: -96.7623
    },
    zoom: 10,
  });
  // 1. Define an API Query URL
  // 2. Do a fetch call to retrieve the data
  // 3. Make a promise (then)
  // 4. Error handling 
}

// TODO: Create the function that grabs the openweathermap
var inputValue = document.querySelector('.city-search');
var cityNameEl = document.querySelector('#city-name');
var descriptionEl = document.querySelector('#description');
var temperatureEl = document.querySelector('#temperature');


function initWeather() {
  console.log("initWeather has been initialized");

  // 1. Define an API Query URL
  // 2. Do a fetch call to retrieve the data
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=imperial&524901&appid=95d25656c865f0b0125b6ad3ef11eab0')
    .then(Response => Response.json())
    .then(data => {
      var cityName = data['name'];
      var tempValue = data['main']['temp']
      var descriptionValue = data['weather'][0]['description'];

      cityNameEl.innerHTML = cityName
      temperatureEl.innerHTML = tempValue;
      descriptionEl.innerHTML = descriptionValue;

    })
    // 3. Make a promise (then)
    // 4. Error handling 
    .catch(err => {
      console.error(err);
    })
}

// TODO: Add an eventlistener to the search button that fires both functions
$("#search-btn").on("click", function () {
  var searchTerm = $("#input").val
  initMap();
  initWeather();
});

// THIS FUNCTION FIRES UP THE MODAL:
$(document).ready(function () {
  $('.modal').modal();
});