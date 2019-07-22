(function() {
	'use strict';
	kintone.events.on('app.record.create.show', function(event) {
		const params = {
			'app': event.appId
		};
		kintone.api(kintone.api.url('/k/v1/app/form/fields'), 'GET', params).then(function(resp) {
			const setRecords = kintone.app.record.get();
			const actions = [];
			const options = resp.properties.table.fields.action_5.options;
			const num_of_opts = Object.keys(options).length - 1;
			for (let i = 0; i < num_of_opts; i++) {
				for (const key in options) {
					if (Number(options[key].index) === i) {
						actions.push(options[key].label);
					} 
				}
			}
			const rows = [];
			for (let j = 0; j < num_of_opts; j++) {
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