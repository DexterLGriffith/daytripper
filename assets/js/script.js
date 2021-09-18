// THIS IS THE FUNCTION TO MAKE THE SIDEBAR COLLAPSABLE
(function($){
    $(function(){
  
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
  // 1. Define an API Query URL
  // 2. Do a fetch call to retrieve the data
  // 3. Make a promise (then)
  // 4. Error handling 
}

// TODO: Create the function that grabs the openweathermap
function initWeather() {
  console.log("initWeather has been initialized");
  // 1. Define an API Query URL
  // 2. Do a fetch call to retrieve the data
  // 3. Make a promise (then)
  // 4. Error handling 
}

// TODO: Add an eventlistener to the search button that fires both functions
$("#search-btn").on("click", function () {
  initMap();
  initWeather();
});


