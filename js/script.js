// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches.

    var realtorList = [
        {
            name: "Town and Mountain Realty",
            address: "261 Asheland Ave",
            city: "Asheville, NC 28801",
            lat: 35.585316,
            lng: -82.556695

        },
        {
            name: "Mosaic Realty",
            address: "2D Wilson Alley",
            city: "Asheville, NC 28801",
            lat:  35.593317,
            lng:  -82.550787

        },
        {
            name: "Greybeard Realty",
            address: "Gashes Creek",
            lat: 35.551894,
            lng: -82.473189

        },
        {
            name: "Green Mountain Realty",
            address: "50-74 Distant View Dr",
            city: "Asheville, NC 28803",
            lat: 35.510683,
            lng: -82.508379
        },
        {
           name: "Beverly-Hanks Associates",
           city: "Asheville, NC",
           lat: 35.598361,
           lng: -82.545726
        }
    ];
/*
var Realty = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.city = ko.observable(data.city);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
}
  var infowindow;
  var map;

$(document).ready(function () {

   initMap();
});

//google maps
var viewModel = function() {
    var self = this;
    self.list = ko.observableArray([]);
//console.log("realtor = " + realtor);
    realtorList.forEach(function(realtor) {
    self.list.push( new Realty(realtor) );
  });

  self.currentRealtor = ko.observable( self.list()[0]);

    //location: ko.observable("Asheville, NC"),
    //Locations: ko.observableArray(data.Locations.arrLocations)
};

var map, infowindow, markers=[];
//var gmap = "https://maps.googleapis.com/maps/api/place/nearbysearch";

function initMap(){
    var asheville = {
        lat: 35.598888,
        lng: -82.551392
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: asheville,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoom: 13
    });


var marker=new google.maps.Marker({
  position:asheville,
  });

marker.setMap(map);
}

ko.applyBindings(viewModel);
*/


// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches.


var Realty = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.city = ko.observable(data.city);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
}



//global for map
var map;

$(document).ready(function () {

   createMap();
   ko.applyBindings(viewModel);
});

function MyViewModel() {

    var self = this;
    self.Lat = ko.observable(35.598888);
    self.Lng = ko.observable(-82.551392);

    var self = this;
    self.list = ko.observableArray([]);
    realtorList.forEach(function(realtor) {
    self.list.push( new Realty(realtor) );

  }
)}

    function createMap(){
    var elevator;
    var myOptions = {
        zoom: 13,
        center: new google.maps.LatLng(35.598888, -82.551392),
        mapTypeId: 'terrain'
    };
    map = new google.maps.Map($('#map')[0], myOptions);
}

ko.bindingHandlers.map = {

  init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    var position = new google.maps.LatLng(allBindingsAccessor().latitude(), allBindingsAccessor().longitude());

    var marker = new google.maps.Marker({
      map: allBindingsAccessor().map,
      position: position,
      animation:google.maps.Animation.BOUNCE,
      icon: 'images/mapmarker_green.png',
      title: name
    });

    viewModel._mapMarker = marker;
  },
  update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    var latlng = new google.maps.LatLng(allBindingsAccessor().latitude(), allBindingsAccessor().longitude());
    viewModel._mapMarker.setPosition(latlng);
    }
 };

var viewModel = new MyViewModel();