(function() {
	'use strict';
	kintone.events.on('app.record.detail.show', function(event) {
		const locationIQToken = 'Insert Access Token Here';
		const record = event.record;
		const address = record.Address.value;
		const headerSpace = kintone.app.record.getHeaderMenuSpaceElement();
		const kintoneAddress = [37.789808, -122.401767];
		const name = record.Place.value;

		const mapSpace = document.createElement('div');
		mapSpace.style.height = '300px';
		mapSpace.setAttribute('id', 'kintone');
		headerSpace.appendChild(mapSpace);

		const kintoneMap = L.map('kintone').setView(kintoneAddress, 16);
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
	  		maxZoom: 18
		}).addTo(kintoneMap);
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
		 	maxZoom: 18,
		 	zIndex: 10
		}).addTo(kintoneMap);
		
		const reference = L.marker(kintoneAddress).addTo(kintoneMap);
		reference.bindPopup('Kintone USA', {autoClose: false}).openPopup();

		forwardGeocode(name, address, kintoneMap);
	})

	function forwardGeocode(name, address, map) {
		const encodedAddress = encodeURI(address);
		const URL = 'https://us1.locationiq.com/v1/search.php?key=' + locationIQToken + '&q=' + encodedAddress + '&format=json';
		const method = 'GET';
		function setMarker(name, address, map) {
			const restaurant = L.marker(address).addTo(map);
			restaurant.bindPopup(name, {autoClose: false}).openPopup();
		}
		kintone.proxy(URL, method, {}, {}, function(response) {
			const response_array = JSON.parse(response);
			const address = [parseFloat(response_array[0].lat), parseFloat(response_array[0].lon)];
			console.log(address);
			setMarker(name, address, map);
		});
	}
})();