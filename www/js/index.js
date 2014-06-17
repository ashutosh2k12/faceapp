var friendIDs = [];
var fdata;
var geocoder;
function me() {
	FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
		   if (response.error) {
		   alert(JSON.stringify(response.error));
		   } else {
		   var data = document.getElementById('data');
		   fdata=response.data;
		   response.data.forEach(function(item) {
								 var d = document.createElement('div');
								 d.innerHTML = "<img src="+item.picture+"/>"+item.name;
								 data.appendChild(d);
								 });
		   }
		var friends = response.data;
		for (var k = 0; k < friends.length && k < 200; k++) {
			var friend = friends[k];
			var index = 1;

			friendIDs[k] = friend.id;
			//friendsInfo[k] = friend;
		}
		   });
}

var onGetCurrentPositionError = function(error) { 
	  document.getElementById('data').innerHTML = "Couldn't get geo coords from device";
} 

 var onGetCurrentPositionSuccess = function(position) {
	  document.getElementById('data').innerHTML = "lat: "+position.coords.latitude+" and Long: "+position.coords.longitude;
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
                      
                        
      var latlng = new google.maps.LatLng(lat, lng);
                        
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            var arrAddress = results[0].address_components;
            // iterate through address_component array
            $.each(arrAddress, function (i, address_component) {
              if (address_component.types[0] == "locality") {
                console.log(address_component.long_name); // city
             //   alert(address_component.long_name);
				 var de = document.createElement('div');
				 de.innerHTML = "<p>"+address_component.long_name+"</p>";
				document.getElementById('data').appendChild(de);
                return false; // break
              }
            });
          } else {
            alert("No results found");
          }
        } else {
          alert("Geocoder failed due to: " + status);
        }
      });
    }
	
function getLoginStatus() {
                FB.getLoginStatus(function(response) {
                                  if (response.status == 'connected') {
                                  alert('logged in');
                                  } else {
                                  alert('not logged in');
                                  }
                                  });
}


function logout() {
                FB.logout(function(response) {
                          document.getElementById('data').innerHTML = "You are logged out of facebook";
                          });
}
            
function login() {
	FB.login(
			 function(response) {
			 document.getElementById('data').innerHTML = "You are now logged in to facebook";
			 },
			 { scope: "email" }
			 );
}
			
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		document.getElementById('data').innerHTML = "Connecting to facebook....";
		if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
        if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
		FB.Event.subscribe('auth.login', function(response) {
                           //    alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                        //       alert('auth.logout event');
                               });
            
            FB.Event.subscribe('auth.sessionChange', function(response) {
                         //      alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                      //         alert('auth.statusChange event');
                               });
			try{
				FB.init({ appId: "133722136790032", nativeInterface: CDV.FB, useCachedDialogs: false });
				document.getElementById('data').innerHTML = "Connected to facebook!!";
			}catch (e) {
                                      alert(e);
             }
			
	  geocoder = new google.maps.Geocoder();
                      
      $('#button-get-reverse-lookup').click(function(){
        navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
      });
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		//Facebook App
        console.log('Received Event: ' + id);
    }
};
