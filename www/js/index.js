var friendIDs = [];
var fdata;
function me() {
	FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
		   if (response.error) {
		   alert(JSON.stringify(response.error));
		   } else {
		   var data = document.getElementById('data');
		   fdata=response.data;
		   console.log("fdata: "+fdata);
		   response.data.forEach(function(item) {
								 var d = document.createElement('div');
								 d.innerHTML = "<img src="+item.picture+"/>"+item.name;
								 data.appendChild(d);
								 });
		   }
		var friends = response.data;
		console.log(friends.length); 
		for (var k = 0; k < friends.length && k < 200; k++) {
			var friend = friends[k];
			var index = 1;

			friendIDs[k] = friend.id;
			//friendsInfo[k] = friend;
		}
		console.log("friendId's: "+friendIDs);
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
                          alert('logged out');
                          });
}
            
function login() {
	FB.login(
			 function(response) {
			 if (response.session) {
			 alert('logged in');
			 } else {
			 alert('not logged in');
			 }
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
                               alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                               alert('auth.logout event');
                               });
            
            FB.Event.subscribe('auth.sessionChange', function(response) {
                               alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                               alert('auth.statusChange event');
                               });
			try{
				FB.init({ appId: "133722136790032", nativeInterface: CDV.FB, useCachedDialogs: false });
				document.getElementById('data').innerHTML = "Connected to facebook!!";
			}catch (e) {
                                      alert(e);
             }			
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		//Facebook App
        console.log('Received Event: ' + id);
    }
};
