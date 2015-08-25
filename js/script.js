var googleMap = '<div id="map"></div>';

$("#mapDiv").append(googleMap);

var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

}
  window.addEventListener('load', initializeMap);

  var map = {

        "location" : "Asheville, NC"

  };
