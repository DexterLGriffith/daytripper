// =========================================================
// ACCEPTANCE CRITERIA (MUST INCLUDE):
// =========================================================
// Use a CSS framework other than Bootstrap. -- (CHECK)
// Be deployed to GitHub Pages. -- (CHECK)
// Be interactive (i.e., accept and respond to user input). -- (CHECK)
// Use at least two server-side APIs. -- (CHECK)
// Does not use alerts, confirms, or prompts (use modals).  -- (CHECK)
// TODO: Use client-side storage to store persistent data.
// Be responsive. -- (CHECK)
// Have a polished UI. -- (CHECK)
// Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.). -- (CHECK)
// Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).
// =========================================================

// THIS IS THE FUNCTION TO MAKE THE SIDEBAR COLLAPSABLE
(function ($) {
  $(function () {
    $('.sidenav').sidenav();
  });
})(jQuery);

// HIDE CLEAR BUTTON UNTIL WE'RE READY TO USE IT
$("#clear-btn").hide();

// HIDE ERROR SECTION UNTIL WE'RE READY TO USE IT
$("#error-section").hide();

// function variables
// DEFINE HTML ELEMENTS AS VARIABLES
var inputValue = document.querySelector('.city-search');
var cityNameEl = document.querySelector('#city-name');
var descriptionEl = document.querySelector('#description');
var temperatureEl = document.querySelector('#temperature');
var temperatureIconEl = document.querySelector('#temp-icon');
var windEl = document.querySelector('#wind-speed');
var humidityEl = document.querySelector('#humidity');
var recommendationEl = document.querySelector('#recommendation-container');
var errorMessageEl = document.querySelector('#error-message');
var errorSectionEl = document.querySelector('#error-section');

// Create the function that grabs the google maps data
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

// Define variable for autocomplete usage
let autoComplete;

// Create a function that populates a auto-complete functionality
function initAutocomplete() {
    autoComplete = new google.maps.places.Autocomplete(document.getElementById('city-search'), {
        types: ['geocode'],
        componentRestrictions: {
            'country': ['us']
        },
        fields: ['place_id', 'geometry', 'name']
    });
    autoComplete.addListener('place_changed', onPlaceChanged);
};

// TODO: The expectation of this function is to move the map to the city the user enters, but so far it doesn't work
function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (!place.geometry) {
      console.log("Checking to see if onplaceChanged() is working.");
      document.getElementById('city-search').placeholder = "Where To?";
  } else {
    console.log("onPlaceChanged not working.")
    return;
  }
};


// function to get openweatherAPI working for select city

function initWeather() {
  console.log("initWeather has been initialized");

  // 1. Define an API Query URL
  // 2. Do a fetch call to retrieve the data
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=imperial&524901&appid=95d25656c865f0b0125b6ad3ef11eab0')

    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&units=imperial&524901&appid=95d25656c865f0b0125b6ad3ef11eab0");
          // DEFINE THE VARIABLES TO EXTRACT FROM API
          var cityName = data['name'];
          var tempValue = data['main']['temp'];
          var humidityValue = data['main']['humidity'];
          var descriptionValue = data['weather'][0]['description'];
          var windSpeedValue = data['wind']['speed'];
          var imgIcon = "<img src='https://openweathermap.org/img/wn/" + data['weather'][0]['icon'] + "@2x.png' />";

          // CONSTRUCT THE RECOMMENDATION LINK

          // CONNECT THE VALUES TO THE HTML
          temperatureEl.innerHTML = Math.floor(tempValue) + "°";
          temperatureIconEl.innerHTML = imgIcon;
          cityNameEl.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + cityName + " | ";
          descriptionEl.innerHTML = descriptionValue + " | ";
          windEl.innerHTML = '<i class="fas fa-wind"></i> ' + Math.floor(windSpeedValue) + "mph | ";
          humidityEl.innerHTML = '<i class="fas fa-tint"></i> ' + humidityValue;
          recommendationEl.innerHTML = '<a id="recommendation" data-target="modal1" class="modal-trigger" href="#">View DayTripper Recommendation <i class="fas fa-arrow-circle-right"></i></a>'

          // HIDE ERROR SECTION UNTIL WE'RE READY TO USE IT
          $("#error-section").hide();
        });
      }
      // ERROR HANDLING IN CASE THERE'S A NUMBERED ERROR LIKE 404
      else {
        // TODO: replace alert and create a modal that displays erros
      // SHOW AN ERROR SECTION INSTEAD OF RESULTS
      $("#error-section").show();
      // TODO: Figure out why this isn't working:
      $('#error-message').innerHTML = "Sorry, " + response.statusText;
      // Hide the child elements of #results-row
  $("#results-row").hide();
  // Hide the Recommendation Container
  $("#recommendation-container").hide();
      }
    })
    // Error handling if the error is anything other than the numbered responses
    .catch(function (error) {      
      // SHOW AN ERROR SECTION INSTEAD OF RESULTS
      $("#error-section").show();
      // TODO: Figure out why this isn't working:
      errorMessageEl.innerHTML = "Unable to locate city.";
      // errorSectionEl.innerHTML = "<p>Unable to locate city</p>";
      // Hide the child elements of #results-row
  $("#results-row").hide();
  // Hide the Recommendation Container
  $("#recommendation-container").hide();
    });
};



// Add eventlistener attached to search bar to make search bar fetch for the city
$("#search-btn").on("click", function () {
  var searchTerm = $("#input").val();
  initMap();
  initWeather();
  initAutocomplete();
  // Make clear button visible
  $("#clear-btn").show();
  // Show the child elements of #results-row
  $("#results-row").show();
  // Show the Recommendation Container
  $("#recommendation-container").show();
});

// Add an eventlistener to the clear button
$("#clear-btn").on("click", function () {
  // Hide the clear button
  $("#clear-btn").hide();
  // Clear the search input value
  $("#city-search").val("");
  // Clear the child elements of #results-row
  $("#results-row").hide();
  // Hide the Recommendation Container
  $("#recommendation-container").hide();
  $("#error-section").hide();
});

// THIS FUNCTION FIRES UP THE MODAL:
$(document).ready(function () {
  $('.modal').modal();
});

// TODO: Remaining logic to consider:

//  start of moment function to get today's current date

// function of what you should pack 

// if loop for different weather conditions (rain, sun, snow, etc.) for select zipcode 

// function of different places to go see using the googlemaps or openstreepmaps apis for given zipcode 

// yelp review api with review stars for places