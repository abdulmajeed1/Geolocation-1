var geolocation = {
	getLocation :function(onSuccess,onError){
		this.onDeviceReady(onSuccess,onError);

/*		document.addEventListener("deviceready", function(){
			self.onDeviceReady();
		}, false);*/
	},
	onDeviceReady:function(onSuccess, onError){
		var self = this;
		navigator.geolocation.getCurrentPosition(function(position){
			onSuccess(self, position);
		}, function(){
			onError(self);
		}, { enableHighAccuracy: true });
	},
	createMap:function(options){
		return new GMaps(options || {});
	}

};



document.addEventListener("deviceready", function(){
			
	geolocation.getLocation(function(obj, position){
		var latitude = 	position.coords.latitude, longitude = position.coords.longitude;

		$('.ui-content', $.mobile.activePage)
		.css({ top: $('.ui-header', $.mobile.activePage).height()})
		.html('<div id="map" class="ui-btn-inner ui-btn-corner-all">');

		var map = obj.createMap({
			div: 'map',
			lat: latitude,
			lng: longitude
		});

		map.addMarker({
			lat: latitude,
			lng: longitude
		});


	},function(obj){
		obj.createMap({
			div: 'map'
		});
	});
}, false);