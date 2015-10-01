
//using knockout.js to bind values
mapMarker = function (name, address, city, lat, lng) {
  this.name = ko.observable(name);
  this.address = ko.observable(address);
  this.city = ko.observable(city);
  this.lat = ko.observable(lat);
  this.lng = ko.observable(lng);


  //defines how markers are displayed locations for each realtor
//function createMarker(){
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      draggable: false,
      animation:google.maps.Animation.DROP,
      icon: 'images/mapmarker_green.png'
  });
  //return marker;
//}
  var infowindowcontent = '<div>' + name + '</div>' + '<div>' + address + '</div>' + '<div>' + city + '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: infowindowcontent
    });

//li.addEventListener('click', function(wrapLi) {
 //   return function() { console.log(wrapLi); }
//}(li));
    self.logClick = ((function(marker) {

      return function(markerCopy) {

     alert(mapMarker.position);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1500);
        marker.setIcon("images/mapmarker_purple.png");
      };
  })(marker));


      //return markerOpen(mapMarker);
      //infowindow.open(map,mapMarker);


    google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.open(map,marker);
      });
    google.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close(map,marker);
      });
  }

//creates map for display for the settings below when page is loaded
function createMap() {
    var myOptions = {
        zoom: 12,
        center: new google.maps.LatLng(35.598888, -82.551392),
        mapTypeId: 'terrain'
    };
    map = new google.maps.Map($('#map')[0], myOptions);
}

//global for map
var map;

    loadMap = function(items){
	    var self = this;
	    self.list = ko.observableArray([]);
		    for (var j = 0; j < items.length; j++) {
		      self.list.push( new mapMarker( items[j]['name'], items[j]['address'], items[j]['city'], items[j]['lat'], items[j]['lng']));
    }
  };

    vm = function (){
	    var self = this;
	    self.list = ko.observableArray([]);

	    realtorList.forEach(function(realtor) {
		    self.list.push( new mapMarker(realtor) );

	        loadMap( realtorList );


    });

  }
$(document).ready(function () {
    createMap();
    ko.applyBindings(vm);
});
