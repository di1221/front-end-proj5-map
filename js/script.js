
//data to populate list of Asheville realtors
        realtorList : [
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
    ],

//using knockout.js to bind values
mapMarker = function (name, address, city, lat, lng) {
  this.name = ko.observable(name);
  this.address = ko.observable(address);
  this.city = ko.observable(city);
  this.lat = ko.observable(lat);
  this.lng = ko.observable(lng);

  //defines how markers are displayed locations for each realtor
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      draggable: false,
      //animation:google.maps.Animation.BOUNCE,
      icon: 'images/mapmarker_green.png'
  });

}

//creates map for display for the settings below when page is loaded
function createMap() {
    var myOptions = {
        zoom: 11,
        center: new google.maps.LatLng(35.598888, -82.551392),
        mapTypeId: 'terrain'
    };
    map = new google.maps.Map($('#map')[0], myOptions);
}

//global for map
var map;

    loadMap = function(item){
      var self = this;
      self.list = ko.observableArray([]);
        for (var j = 0; j < item.length; j++)
          self.list.push( new mapMarker( item[j]['name'], item[j]['address'], item[j]['city'], item[j]['lat'], item[j]['lng']));
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

