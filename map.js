(function() {
	'use strict';
	kintone.events.on('app.record.detail.show', function(event) {
		const record = event.record;
		const address = record.Address.value;
		const headerSpace = kintone.app.record.getHeaderMenuSpaceElement();
		const cybozuAddress = [35.68704, 139.7861];
		const name = record.Place.value;

		const mapSpace = document.createElement('div');
		mapSpace.style.height = '300px';
		mapSpace.setAttribute('id', 'nihonbashi');
		headerSpace.appendChild(mapSpace);

		const mymap = L.map('nihonbashi').setView(cybozuAddress, 16);
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
	  		maxZoom: 18
		}).addTo(mymap);
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
		 	maxZoom: 18,
		 	zIndex: 10
		}).addTo(mymap);
		
		const reference = L.marker(cybozuAddress).addTo(mymap);
		reference.bindPopup('Nihombashi Tower', {autoClose: false}).openPopup();

		forwardGeocode(name, address, mymap);
	})

	function forwardGeocode(name, address, map) {
		const encodedAddress = encodeURI(address);
		const settings = {
			'crossDomain': true,
			'url': 'https://us1.locationiq.com/v1/search.php?key=pk.7fa009bf60cb8aef22d9f72909124750&q=' + encodedAddress + '&format=json',
			'method': 'GET'
		}
		function setMarker(name, address, map) {
			const restaurant = L.marker(address).addTo(map);
			restaurant.bindPopup(name, {autoClose: false}).openPopup();
		}
		$.ajax(settings).done(function(response) {
			const address = [parseFloat(response[0].lat), parseFloat(response[0].lon)];
			setMarker(name, address, map);
		});
	}
})();