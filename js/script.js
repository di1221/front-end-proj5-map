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

  //creates info window shown on mouse event
  var infowindowcontent = '<div>' + name + '</div>' + '<div>' + address + '</div>' + '<div>' + city + '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: infowindowcontent
    });

    //adds listener for realtor details on mouseover and mouseout
    google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.open(map,marker);
      });
    google.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close(map,marker);
      });

    var markerPostion;
    //for list click event reflected on map
    self.logClick = (function(markerPostion) {
      return function() {
        markerPostion = new google.maps.LatLng(this.lat, this.lng);
        marker.setPosition(markerPostion);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1500);
        marker.setIcon("images/mapmarker_purple.png");
      };
  })(markerPostion);
}
    //for filtering list with search box
    var viewModel = {
        query: ko.observable('')
    };

    //creates list of realtors for list box
    viewModel.realtorList = ko.dependentObservable(function() {
        var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(realtorList, function(realtor) {
            return realtor.name.toLowerCase().indexOf(search) >= 0;
        });
    }, viewModel);


      self.logClick = (function() {

      });


    loadMap = function(items){
        //creates map for initial display using settings below when page is loaded
        var myOptions = {
            zoom: 12,
            center: new google.maps.LatLng(35.598888, -82.551392),
            mapTypeId: 'terrain'
        };
        map = new google.maps.Map($('#map')[0], myOptions);

        var self = this;
        self.list = ko.observableArray([]);

        //iterates through realtor data for displaying map markers
        realtorList.forEach(function(realtor) {
            self.list.push( new mapMarker(realtor) );

            items = realtorList ;
        });
            //populates array of realtors data info for map markers info window on mouse event
            for (var j = 0; j < items.length; j++) {
              self.list.push( new mapMarker( items[j]['name'], items[j]['address'], items[j]['city'], items[j]['lat'], items[j]['lng']));
        }
    };

$(document).ready(function () {
    ko.applyBindings(viewModel);
    loadMap();
});
    //var reviewUrl = "http://www.zillow.com/webservice/ProReviews.htm?zws-id=X1-ZWz1a2tdkm61vv_4kciw&screenname=Lorraine%20Silverman%201&callback=getJSON";

/*
    $.getJSON(reviewUrl, function (data) {
        alert('success = ' + reviewUrl);
        if (data.results.length > 0) {
    alert(data.results.length);
        } else {
            alert('No match found for information specified.');
        }
    });
*/
