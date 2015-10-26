var mapMarker;
var markerPosition;

var MapViewModel = function() {
    loadMap = function(items){

        //creates map for initial display using settings below when page is loaded
        var myOptions = {
            zoom: 12,
            center: new google.maps.LatLng(35.559139, -82.567327),
            mapTypeId: 'roadmap'
        };
        map = new google.maps.Map($('#map')[0], myOptions);

        var self = this;
        self.list = ko.observableArray([]);

        //iterates through realtor data for displaying map markers
        results.forEach(function(realtor) {
            self.list.push( new mapMarker(realtor) );
            items = results;

        $("li").hover(function() {
            $("li").css("cursor", "pointer");
            }, function() {
        $("li").css("cursor", "auto");
            });
        });

            //populates array of realtor and data info for map markers info window on mouse event
            for (var j = 0; j < items.length; j++) {
              self.list.push( new mapMarker( items[j]['name'], items[j]['vicinity'], items[j]['geometry']['location']['lat'], items[j]['geometry']['location']['lng']));
            }
      };



//*****************************************
    //using knockout.js to bind values
      //**************************************

    mapMarker = function (name, vicinity, lat, lng) {
      this.name = ko.observable(name);
      this.vicinity = ko.observable(vicinity);
      this.lat = ko.observable(lat);
      this.lng = ko.observable(lng);
      //defines how markers are displayed locations for each realtor
    //function createMarker(){
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
          draggable: false,
          icon: 'images/mapmarker_green.png',
          animation:google.maps.Animation.DROP
      });

                    //console.log(map,marker);
    //creates info window shown on mouse event
    var infowindowcontent = '<div>' + name + '</div>' + '<div>' + vicinity + '</div>';
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

      //google.maps.event.addListener(marker, 'mouseover', function() {
        //marker.setMap(null);
      //});

      //for list click event reflected on map
      self.logClick = (function(markerPosition) {
        return function() {
          marker.setIcon("images/mapmarker_purple.png");
          markerPosition = new google.maps.LatLng(this.geometry.location.lat, this.geometry.location.lng);
          marker.setPosition(markerPosition);
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){ marker.setAnimation(null); }, 1200);
        };
    })(markerPosition);
  }
//creates list of realtors for list box
    viewModel.results = ko.dependentObservable(function() {
        var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(results, function(realtor) {
          if(realtor.name.toLowerCase().indexOf(search) >= 0){
            return realtor.name.toLowerCase().indexOf(search) >= 0;
          }
        });
    },
    viewModel);

}

    //for filtering list with search box
    var viewModel = {
        results: ko.observableArray([]),
        query: ko.observable('')
    };

  self.logClick = (function() {});

$(document).ready(function () {
    MapViewModel();
    var applied = false;
    if (!applied) {
        ko.applyBindings(viewModel);
        applied = true;
    }
    loadMap();
});


