/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		//Facebook App
		//Config Plugin
		var config = {
			app_id      : '133722136790032',
			secret      : '5f0932cb0ed55803f58c1ce386459b0f',
			scope       : 'publish_stream,email',
			host        : '', //App Domain ( Facebook Developer ).
			onLogin     : _onLogin,
			onLogout    : _onLogout
		};
		
		//Login Facebook
		$(document).FaceGap(config);
		//Logout Facebook
		//$(document).FaceGap('logout');
		
		//Callback Login
		function _onLogin( event ){     
			alert('status > '+event.status); // 1 - success, 0 - error
			alert('data > '+event.data); //Object response (id, name, email, etc);
			alert('token > '+event.token); // token user login
			alert('message > '+event.message);  
		}
		
		//Callback Logout
		function _onLogout( event ){
			alert('status > '+event.status); // 1 - success, 0 - error
			alert('message > '+event.message);
		}  
        console.log('Received Event: ' + id);
    }
};
