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

// HIDE CITY HISTORICAL DATA UNTIL WE'RE READY TO USE IT
$("#city-history-container").hide();

// HIDE THE TODO LIST CONTAINER UNTIL WE'RE READY TO USE IT
$("#todo-container").hide();

// HIDE CLEAR ACTIVITIES BUTTON UNTILE WE'RE READY TO USE IT
$("#clear-btn-2").hide();

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

          // SHOW CITY HISTORICAL DATA CONTAINER
          $("#city-history-container").show();

          // SHOW THE TODO LIST CONTAINER 
          $("#todo-container").show();
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

/* 
  ================================================
  TODO:
  ================================================
  This section is still a work in progress. Currently, it will save the activities to local storage, but it doesn't remain on the page after refresh/page load

*/
// Define variables to associate with our HTML elements
var activity1 = document.querySelector('#activity-1');
var activity2 = document.querySelector('#activity-2');
var activity3 = document.querySelector('#activity-3');
var activity4 = document.querySelector('#activity-4');

// Create an empty array to collect activity data
var $activityKeeper = [];

// Create event listener to store TODO list values
$("#save-btn").on("click", function (event) {
  
  event.preventDefault();
  //TODO: Figure out why the activities aren't remaining on the page after clicking "Save Plans"

  // Make clear button visible
  $("#clear-btn-2").show();

  // =========== ACTIVITY 1
  var $activity1 = $(activity1).val();
  $("#activity-1").val(localStorage.getItem($activity1));
  localStorage.setItem("$activity1", $activity1);
  $activityKeeper.push($activity1);

  // =========== ACTIVITY 2
  var $activity2 = $(activity2).val();
  $("#activity-2").val(localStorage.getItem($activity2));
  localStorage.setItem("$activity2", $activity2);
  $activityKeeper.push($activity2);

  // =========== ACTIVITY 3
  var $activity3 = $(activity3).val();
  $("#activity-3").val(localStorage.getItem($activity3));
  localStorage.setItem("$activity3", $activity3);
  $activityKeeper.push($activity3);

  // =========== ACTIVITY 4
  var $activity4 = $(activity4).val();
  $("#activity-4").val(localStorage.getItem($activity4));
  localStorage.setItem("$activity4", $activity4);
  $activityKeeper.push($activity4);

  // =========== POTENTIALLY SHOW A FUNCTION THAT WILL DISPLAY PREVIOUSLY SAVED ACTIVITIES
  showHistoricalActivities();

});

// Add an eventlistener to the clear activities button
$("#clear-btn-2").on("click", function () {
 // Make clear button disappear
 $("#clear-btn-2").hide();
});


function showHistoricalActivities(){
  // TODO: Maybe this area can fire off on page load, and if there is anythihng stored locally, it will display in the input fields
  console.log("Activities have been stored.");
}


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

// Add an eventlistener to the clear search city button
$("#clear-btn").on("click", function () {
  // Hide the clear button
  $("#clear-btn").hide();
  // Clear the search input value
  $("#city-search").val("");
  // Clear the child elements of #results-row
  $("#results-row").hide();
  // Hide the Recommendation Container
  $("#recommendation-container").hide();
  // Hide the error section
  $("#error-section").hide();
  // HIDE CITY HISTORICAL DATA UNTIL WE'RE READY TO USE IT
  $("#city-history-container").hide();
  // HIDE THE TODO LIST CONTAINER UNTIL WE'RE READY TO USE IT
  $("#todo-container").hide();
});

// THIS FUNCTION FIRES UP THE MODAL:
$(document).ready(function () {
  $('.modal').modal();
});