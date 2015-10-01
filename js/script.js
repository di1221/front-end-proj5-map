 var realtorList = [
        {
            name: "Town and Mountain Realty",
            address: "261 Asheland Ave",
            city: "Asheville, NC 28801",
            lat: "35.585316",
            lng: "-82.556695"

        },
        {
            name: "Mosaic Realty",
            address: "2D Wilson Alley",
            city: "Asheville, NC 28801",
            lat:  "35.593317",
            lng:  "-82.550787"

        },
        {
            name: "Greybeard Realty",
            address: "Gashes Creek",
            city: "",
            lat: "35.551894",
            lng: "-82.473189"

        },
        {
            name: "Green Mountain Realty",
            address: "50-74 Distant View Dr",
            city: "Asheville, NC 28803",
            lat: "35.510683",
            lng: "-82.508379"
        },
        {
           name: "Beverly-Hanks Associates",
           address: "",
           city: "Asheville, NC",
           lat: "35.598361",
           lng: "-82.545726"
        },
        {
            name: "Remax",
            address: "50-74 Distant View Dr",
            city: "Asheville, NC 28801",
            lat: "35.602376",
            lng: "-82.551802"
        },
        {
            name: "ERA Sunburst Realty",
            address: "201 E Chestnut St",
            city: "Asheville, NC 28801",
            lat: "35.602617",
            lng: "-82.549087"
        },
        {
            name: "Appalacian Realty",
            address: "83 Arlington St",
            city: "Asheville, NC 28801",
            lat: "35.601507",
            lng: "-82.543220"
        },
        {
            name: "Asheville Realty & Associates",
            address: "1314 Parkwood Pl",
            city: "Asheville, NC 28806",
            lat: "35.583911",
            lng: "-82.602772"
        }
    ];

	var $body = $('body');
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


    self.logClick = ((function() {

      return function() {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1500);
        marker.setIcon("images/mapmarker_purple.png");
      };
  })());


    google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.open(map,marker);
      });
    google.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close(map,marker);
      });
  }

    var viewModel = {
        query: ko.observable('')
    };

    viewModel.realtorList = ko.dependentObservable(function() {
        var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(realtorList, function(realtor) {
            return realtor.name.toLowerCase().indexOf(search) >= 0;
        });
    }, viewModel);


	    self.logClick = (function() {

	  	});

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
    ko.applyBindings(viewModel);
    ko.applyBindings(vm);
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
