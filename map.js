(function() {
	'use strict';
	let mymap;
	kintone.events.on('app.record.detail.show', function(event) {
		const record = event.record;
		const address = record.Address.value;
		const headerSpace = kintone.app.record.getHeaderMenuSpaceElement();
		const cybozuAddress = [35.68704, 139.7861];
		const name = record.Place.value;

		headerSpace.style.height = '300px';
		headerSpace.setAttribute('id', 'nihonbashi');

		mymap = L.map('nihonbashi').setView(cybozuAddress, 16);
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
	  		maxZoom: 18
		}).addTo(mymap);
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
		 	maxZoom: 18,
		 	zIndex: 10
		}).addTo(mymap);
		
		const reference = L.marker(cybozuAddress).addTo(mymap);
		reference.bindPopup('Nihombashi Tower', {autoClose: false}).openPopup();

		forwardGeocode(name, address);
	})

	function forwardGeocode(name, address) {
		const encodedAddress = encodeURI(address);
		const settings = {
			'crossDomain': true,
			'url': 'https://us1.locationiq.com/v1/search.php?key=pk.7fa009bf60cb8aef22d9f72909124750&q=' + encodedAddress + '&format=json',
			'method': 'GET'
		}
		$.ajax(settings).done(function(response) {
			const address = [parseFloat(response[0].lat), parseFloat(response[0].lon)];
			setMarker(name, address);
		});
	}

	function setMarker(name, address) {
		const restaurant = L.marker(address).addTo(mymap);
		restaurant.bindPopup(name, {autoClose: false}).openPopup();
	}
})();