(function() {
	'use strict';
	kintone.events.on('app.record.create.show', function(event) {
		const appId = 37 //Replace with app id here
		const params = {
			'app': appId
		};
		kintone.api(kintone.api.url('/k/v1/app/form/fields'), 'GET', params).then(function(resp) {
			const setRecords = kintone.app.record.get();
			console.log(setRecords);
			const actions = [];
			const options = resp.properties.table.fields.action_5.options;
			for (let i = 0; i < 6; i++) {
				for (let key in options) {
					if (options[key].index == i) {
						actions.push(options[key].label);
					} 
				}
			}
			let rows = [];
			for (let j = 0; j < 6; j++) {
				rows.push(createRow(actions[j]));
			}
			setRecords.record.table.value = rows;
			kintone.app.record.set(setRecords);
		}).catch(function(error) {
			alert('Request failed');
			return false;
		}); 	
	});
	function createRow(action) {
		return {
			'value': {
				'action_5': {
					'type': 'DROP_DOWN',
					'value': action,
				},
				'status': {
					'type': 'CHECK_BOX',
					'value': ['Not reviewed']
				},
				'task': {
					'type': 'MULTI_LINE_TEXT',
					'value': undefined
				}
			}
		};
	}
})();